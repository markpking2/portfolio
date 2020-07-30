---
slug: "/blog/change-email-aws-cognito-ses"
date: "2020-07-18"
title: "Changing A User's Email Username in Cognito with Verification Using SES"
description: "I'm going to explain how I used AWS's Cognito and SES SDKs to allow users to change their account's email address by first verifying that they are the owner of both their current email address and the new one they wish to change to."
---

I'm going to explain how I used AWS's **Cognito** and **SES** SDKs to allow users to change their account's email address by first verifying that they are the owner of both their current email address and the new one they wish to change to.

In a web application I've been working on recently which uses **React**, **Node.js/Express**, AWS's **Amplify** and **Cognito** for authorization and authentication. The application is also hosted on **Elastic Beanstalk**. The **Cognito** user pools of the application are set up so users can log in with their email as their username. Upon registering, users receive a verification link email. They must verify their email before they can log in to the application. **Amplify's** open source authentication library has been great so far; except for one feature which is allowing a user to change their email.

**Amplify's** Auth class has tons of useful methods for authenticating with **Cognito** user pools. [Click here to see them](https://aws-amplify.github.io/amplify-js/api/classes/authclass.html). To update a user's email, you can make use of the method [updateUserAttributes](https://aws-amplify.github.io/amplify-js/api/classes/authclass.html#updateuserattributes). The problem is that this method will change a user's email address without verifying they own it beforehand. It will also change their account's email verified status to false. If a user logs out, they will not be able to log back in until the new email is verified. If the user cannot access the new email, or if they made a typo, they are out of luck.

At the time of writing this post, this has been an issue for quite some time now. [This issue on GitHub has been open since Jun 5, 2018.](https://github.com/aws-amplify/amplify-js/issues/987) Some solutions have been proposed, but not without security loopholes or tricky workarounds. Because of this, I decided to write my own endpoints to solve this issue.

My application uses [Knex.js](http://knexjs.org/) to connect to a **PostgreSQL** database. It makes use of Node.js's built in [crypto](https://nodejs.org/api/crypto.html) module to generate a cryptographically safe random number for the verification codes (a much safer alternative than [Math.random()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random)). Finally, [SES](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SES.html) and [CognitoIdentityServiceProvider](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CognitoIdentityServiceProvider.html) are used from AWS's JavaScript SDK.

### I ended up writing three helper functions and five endpoints:

[Helper function one: generateVerificationCode()](#generate-verification-code)

[Helper function two: sendCurrentEmailVerification()](#send-current-email-verification)

[Helper function three: sendPendingEmailVerification()](#send-pending-email-verification)

[POST /request\_email\_change](#request-email-change)

[POST /verify_code](#verify-code)

[DELETE /cancel\_email\_change](#cancel-email-change)

[POST /resend\_email\_verification](#resend-email-verification)

[GET /email\_change\_status](#email-change-status)

### I needed to add two IAM roles to my Elastic Beanstalk instance to allow the SES and Cognito SDK

You can see your Elastic Beanstalk instance's IAM role by going to **Elastic Beanstalk** > **Environments** > _Your application's environment_ > **Configuration** > **Security**.

You'll need to go to **Services** > **IAM** > **Roles** > Your Elastic Beanstalk instances' role > **Attach policies**. Then add **AmazonSESFullAccess** and **AmazonCognitoPowerUser** to the instances' role.

### I added three fields to the users table in the PostgreSQL database:

```javascript
tbl.boolean("allowed_email_change")
    .notNullable()
    .defaultTo(false);
tbl.varchar("pending_email"); //defaults to NULL
tbl.varchar("verification_code"); //defaults to NULL
```

### Importing required dependencies:

```javascript
const router = require("express").Router();
const crypto = require("crypto");
const db = require("../../data/dbConfig"); //knex database
const cognitoConfig = require("../../config/cognito-config.json"); //aws region
const AWS = require("aws-sdk");
AWS.config.update({ region: cognitoConfig.region });
const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();
```

<a id="generate-verification-code"></a>

### generateVerificationCode()

This function generates a cryptographically safe random 6 digit number.

```javascript
function generateVerificationCode() {
    let code = 0;
    while (code < 100000 || code > 999999) {
        const buffer = crypto.randomBytes(3);
        code = buffer.readUIntBE(0, 3);
    }
    return code;
}
```

<a id="send-current-email-verification"></a>

### sendCurrentEmailVerification()

This function is used to send a verification code to a user's current email, which must be verified before a verification code is sent to the new email.

```javascript
async function sendCurrentEmailVerification(email, code) {
    const emailParams = {
        Destination: {
            ToAddresses: [email],
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: `<h1>Email Verification</h1><p>It looks like your account requested an email change. First we must verify that this was you. Your verification code is ${code}.</p>`,
                },
            },
            Subject: {
                Charset: "UTF-8",
                Data: "Email Change Requested",
            },
        },
        Source: "email@email.com",
        ReplyToAddresses: ["email@email.com"],
    };
    try {
        return await new AWS.SES().sendEmail(emailParams).promise();
    } catch (err) {
        throw err;
    }
}
```

<a id="send-pending-email-verification"></a>

### sendPendingEmailVerification()

This function sends a verification code to the new email.

```javascript
async function sendPendingEmailVerification(pendingEmail, code) {
    const emailParams = {
        Destination: {
            ToAddresses: [pendingEmail],
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: `<h1>Email Verification</h1>
                    <p>A user requested to change their email to this one. Please verify that this was you. Your verification code is ${code}.</p>`,
                },
            },
            Subject: {
                Charset: "UTF-8",
                Data: "Email Change Verification",
            },
        },
        Source: "email@email.com",
        ReplyToAddresses: ["email@email.com"],
    };
    try {
        return await new AWS.SES().sendEmail(emailParams).promise();
    } catch (err) {
        console.log(err);
        throw err;
    }
}
```

<a id="request-email-change"></a>

### POST /request\_email\_change

This is the endpoint to initiate an email change request. If a user has a pending email change, they must cancel it first using the **cancel_email_change** endpoint. It will cause a verification email to be sent to the user's current verified email address. It will also reject a request if the new email is the same as the current email.

```javascript
router.post("/request_email_change", async (req, res) => {
    if (req.user.oauth) {
        res.status(400).json({ message: "OAuth users cannot change emails." });
        return;
    }
    const { newEmail } = req.body;
    if (newEmail === req.user.email) {
        res.send(400).json({ message: `Email is already ${newEmail}.` });
    }

    try {
        const { allowed_email_change, pending_email } = await db("users")
            .where({ id: req.user.id })
            .first()
            .select("allowed_email_change", "pending_email");

        if (allowed_email_change || pending_email) {
            res.status(400).json({
                message:
                    "Current pending email request must be cancelled before requesting a new email change.",
            });
            return;
        }

        var verificationCode = generateVerificationCode();
        await db("users")
            .where({ id: req.user.id })
            .first()
            .update({
                pending_email: newEmail,
                verification_code: verificationCode,
            });

        const result = await sendCurrentEmailVerification(
            req.user.email,
            verificationCode
        );
        console.log(result);
        res.status(200).json({
            message: "Verification code sent to user's current email.",
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Could not send verification code to user.",
        });
    }
});
```

<a id="verify-code"></a>

### POST /verify_code

This function is used to verify codes for both a user's current and pending emails. If the user's **allowed_email_change** field in the database is false, it will verify the user's current email. If the code is correct, it will send a new verification code to the user's pending email value in the database. If **allowed_email_change** is true, it will change the user's email to the new email if the verification code is correct. It will reset the fields in the database which are used for keeping track of the stages of a pending email change. It will reject a request if the user does not have a pending email change.

```javascript
router.post("/verify_code", async (req, res) => {
    const { code } = req.body;

    try {
        const {
            pending_email,
            verification_code,
            allowed_email_change,
            cognito_username,
        } = await db("users")
            .where({ id: req.user.id })
            .first()
            .select(
                "pending_email",
                "verification_code",
                "allowed_email_change",
                "cognito_username"
            );

        if (!verification_code) {
            res.status(400).json({
                message: "No current email change pending for this user.",
            });
            return;
        } else if (code !== verification_code) {
            res.status(400).json({
                message:
                    "Incorrect verification code. Please try again or request a new code.",
            });
            return;
        }

        if (allowed_email_change) {
            const params = {
                UserAttributes: [
                    {
                        Name: "email_verified",
                        Value: "true",
                    },
                    {
                        Name: "email",
                        Value: pending_email,
                    },
                ],
                UserPoolId: cognitoConfig.userPool,
                Username: cognito_username,
            };
            try {
                const result = await cognitoIdentityServiceProvider
                    .adminUpdateUserAttributes(params)
                    .promise();

                await db("users")
                    .where({ id: req.user.id })
                    .first()
                    .update({
                        pending_email: null,
                        verification_code: null,
                        email: pending_email,
                        allowed_email_change: false,
                    });
                res.status(200).json({
                    message: "User email was successfully updated.",
                });
            } catch (err) {
                console.log(err);
                res.status(500).json({
                    message: "Error encountered updating new user email.",
                });
            }
        } else {
            const verificationCode = generateVerificationCode();
            try {
                await db("users")
                    .where({ id: req.user.id })
                    .first()
                    .update({
                        allowed_email_change: true,
                        verification_code: verificationCode,
                    });
            } catch (err) {
                console.log(err);
                res.status(500).json({
                    message:
                        "Error updating user status and new verification code.",
                });
                return;
            }
            try {
                const result = await sendPendingEmailVerification(
                    pending_email,
                    verificationCode
                );
                console.log(result);
                res.status(200).json({
                    message:
                        "Current email verification succeeded. Verification code sent to new email.",
                });
            } catch (err) {
                console.log(err);
                res.status(500).json({
                    message: "Error sending verification code to new email.",
                });
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error getting user information." });
    }
});
```

<a id="cancel-email-change"></a>

### DELETE /cancel\_email\_change

This endpoint resets the fields in the database which are used for keeping track of the stages of a pending email change.

```javascript
router.delete("/cancel_email_change", async (req, res) => {
    try {
        await db("users")
            .where({ id: req.user.id })
            .first()
            .update({
                verification_code: null,
                pending_email: null,
                allowed_email_change: false,
            });
        res.status(200).json({
            message: "Email change request successfully cancelled.",
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Error cancelling email change request.",
        });
    }
});
```

<a id="resend-email-verification"></a>

### POST /resend\_email\_verification

This endpoint will send to a new verification code depending on which stage of the verification process the user is in.

```javascript
router.post("/resend_email_verification", async (req, res) => {
    try {
        const { pending_email, allowed_email_change } = await db("users")
            .where({ id: req.user.id })
            .first()
            .select("pending_email", "allowed_email_change");
        if (!pending_email) {
            res.status(400).json({
                message: "No current email change pending for this user.",
            });
            return;
        }

        const verificationCode = generateVerificationCode();

        if (allowed_email_change) {
            await sendPendingEmailVerification(pending_email, verificationCode);
        } else {
            await sendCurrentEmailVerification(
                req.user.email,
                verificationCode
            );
        }

        await db("users")
            .where({ id: req.user.id })
            .first()
            .update({
                verification_code: verificationCode,
            });

        res.status(200).json({
            message: "A new verification code has been sent.",
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error resending verification code." });
    }
});
```

<a id="email-change-status"></a>

### GET /email\_change\_status

This endpoint returns a user's requested **pending_email** and **allowed_email_change** status, which can be used on the frontend to show the user what their next step is in the changing process is.

```javascript
router.get("/email_change_status", async (req, res) => {
    try {
        const { allowed_email_change, pending_email } = await db("users")
            .where({ id: req.user.id })
            .first()
            .select("pending_email", "allowed_email_change");

        res.status(200).json({
            allowed_email_change: !!allowed_email_change,
            pending_email,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Error retreiving email change status information.",
        });
    }
});
```
