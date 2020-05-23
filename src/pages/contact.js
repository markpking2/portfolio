import React, { useState, useRef } from "react";
import Layout from "../components/layout";
import Typewriter from "../components/typewriter";
import styled from "styled-components";
import Helmet from "react-helmet";
import { useForm } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";

export default ({ data }) => {
  const recaptchaRef = useRef(null);
  const [recaptchaCode, setRecaptchaCode] = useState(null);
  const [recaptchaError, setRecaptchError] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data, e) => {
    const recaptchaValue = recaptchaRef.current.getValue();

    console.log(recaptchaValue);
    console.log(data);

    if (!recaptchaCode) {
      setRecaptchError(true);
    } else {
      const {
        Name: name,
        Email: email,
        Subject: subject,
        Message: message,
      } = data;

      console.log(name, email, subject, message);

      axios
        .post(
          "https://d3sft3ow35.execute-api.us-east-1.amazonaws.com/default/portfolio_contact_form",
          {
            body: JSON.stringify({
              name,
              email,
              subject,
              message,
              captchaResponse: recaptchaCode,
            }),
          },
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res);
          e.target.reset();
          recaptchaRef.current.reset();
          setRecaptchaCode(null);
          setResponseMessage("success");
        })
        .catch((err) => {
          setResponseMessage("fail");
          console.log(err);
        });
    }
  };

  console.log(errors);

  function onChange(value) {
    if (value) {
      console.log(value);
      setRecaptchaCode(value);
      setRecaptchError(false);
    }
  }

  return (
    <>
      <Helmet>
        <html lang="en" />
        <meta charSet="utf-8" />
        <title>My Portfolio - Mark King</title>
        <meta
          name="description"
          content="I'm Mark King, a full stack web developer, and this is my portfolio site!"
        />
        <link rel="canonical" href="https://mark.codes" />
      </Helmet>
      <Layout>
        <Typewriter text="Contact" />
        {/* <ImgWrapper>
          <StyledImg
            title={"Mark and his two dogs"}
            alt="Mark and his two dogs"
            sizes={sizes}
          />
        </ImgWrapper> */}
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <h3>Feel free to send me a message!</h3>
          {responseMessage === "success" && (
            <StyledH3>
              Message sent successfully!{" "}
              <span role="img" aria-label="Sad emoji">
                ✔️
              </span>
            </StyledH3>
          )}
          {responseMessage === "fail" && (
            <StyledH3>
              Message unsuccessful. Please try again!{" "}
              <span role="img" aria-label="Sad emoji">
                😕
              </span>
            </StyledH3>
          )}
          <InputWrapper>
            <input
              className={errors.Name ? "error" : ""}
              type="text"
              placeholder="Name *"
              name="Name"
              ref={register({ required: true })}
            />
            {errors.Name && <span>This field is required.</span>}
          </InputWrapper>
          <InputWrapper>
            <input
              className={errors.Email ? "error" : ""}
              type="text"
              placeholder="Email *"
              name="Email"
              ref={register({ required: true, pattern: /^\S+@\S+$/i })}
            />
            {errors.Email && (
              <span>
                {errors.Email.type === "required"
                  ? "This field is required."
                  : "Invalid email format."}
              </span>
            )}
          </InputWrapper>
          <InputWrapper>
            <input
              className={errors.Subject ? "error" : ""}
              type="text"
              placeholder="Subject *"
              name="Subject"
              ref={register({ required: true, maxLength: 255 })}
            />
            {errors.Subject && (
              <span>
                {errors.Subject.type === "required"
                  ? "This field is required."
                  : "Max length of 255 characters exceeded."}
              </span>
            )}
          </InputWrapper>
          <InputWrapper>
            <textarea
              className={errors.Message ? "error" : ""}
              name="Message"
              placeholder="Message *"
              ref={register({ required: true })}
            />
            {errors.Message && <span>This field is required.</span>}
          </InputWrapper>
          <ReCaptchaWrapper>
            <div className={recaptchaError ? "border" : ""}>
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey="6LfzEfsUAAAAABu6cWyTBRYEDwNQLZtqvLVW9SN9"
                onChange={onChange}
              />
            </div>
            {recaptchaError && (
              <span>Please verify that you are not a robot.</span>
            )}
          </ReCaptchaWrapper>
          <button>Submit</button>
        </StyledForm>
      </Layout>
    </>
  );
};

const StyledForm = styled.form`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;

  h3 {
    color: white;
  }

  button {
    margin: 1rem 0;
    width: 100%;
    max-width: 200px;
    border-radius: 5px;
    color: white;
    border-width: 5px;
    border-style-solid;
    border-color: rgba(102, 252, 241, 1);
    background: transparent;
    text-decoration: none;
  }
`;

const InputWrapper = styled.div`
  width: 100%;
  margin: 0.5rem 0;

  input,
  textarea {
    background: transparent;
    padding: 0.5rem;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    border-width: 2px;
    border-style: solid;
    border-color: rgba(102, 252, 241, 1);
    color: white;
  }

  span {
    color: red;
  }

  textarea {
    min-height: 300px;
  }

  .error {
    border-color: red;
    color: red;

    &:focus {
      outline: none;
    }
  }
`;

const ReCaptchaWrapper = styled.div`
  .border {
    padding: 0.5rem;
    border: 2px solid red;
    border-radius: 5px;
  }

  span {
    color: red;
  }
`;

const StyledH3 = styled.h3`
  font-size: 1.7rem;
`;
