---
slug: "/blog/ssl-elastic-beanstalk"
date: "2020-07-16"
title: "Setting Up SSL For A Node.js Server On Elastic Beanstalk"
description: "An easy way to make a Node.js server use HTTPS on AWS Elastic Beanstalk is to use an Elastic Load Balancer and AWS Certificate Manager with a custom domain."
---

An easy way to make a Node.js server use HTTPS on AWS Elastic Beanstalk is to use an Elastic Load Balancer and AWS Certificate Manager with a custom domain.

We'll need an SSL certificate to use with our Elastic Load Balancer. In the AWS console, go to **Services** > **Certificate Manager** > **Get started** (under **Provision certificates**) > **Request a public certificate**. Enter the domain that you wish to use for your server. You'll need to verify you own the domain you are requesting the certificate for. Choose either **DNS** or **Email** validation, whichever you prefer, continue and click **Confirm and request**. Once your domain is verified we can continue to setting up the application load balancer.

When creating a new Elastic Beanstalk application through the AWS console, select **Configure more options** underneath **Platform**. Next you'll need to select **High Availability**, **High availability (using Spot and On-Demand instances)**, or **Custom configuration** to be able to use a **Load balancer**.

Click **Load balancer** > **Edit**. Click **Add listener**, enter **443** for the port, and select **HTTPS** for the protocol.

Select the **SSL certificate** you just created. Select a **SSL policy** option or leave it unselected to use the default **ELBSecurityPolicy-2016-08** policy. Select the **default** process, then click **Add**.

Next click the **Enabled** option for port **80** / **HTTP** to disable it. This will ensure our server only accepts requests using **HTTPS**. Click **Apply**.

Configure the rest of your settings for your Elastic Beanstalk application.

After the environment for your server is done updating, add a **CNAME** record set for the URL you created the SSL certificate for. Use your application's Elastic Beanstalk URL for the value.

Now you can update the Elastic Beanstalk application with your code and it is ready to use **HTTPS**.
