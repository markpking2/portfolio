import React from "react";
import Layout from "../components/layout";
import Typewriter from "../components/typewriter";
import styled from "styled-components";
import Helmet from "react-helmet";

const P = styled.p`
    margin-bottom: 0.2rem;
    color: #ffffff;
`;

export default () => (
    <>
        <Helmet>
            <meta charSet='utf-8' />
            <title>My Portfolio - Mark King</title>
            <link rel='canonical' href='https://mark.codes' />
        </Helmet>
        <Layout>
            <Typewriter text='Hello' />
            <P>
                I'm a full stack web developer with experience working on
                diverse cross functional teams primarily with JavaScript and
                Python, using technologies such as React, Redux, Node.js,
                Express, Django, PostgreSQL, Apollo, and GraphQL.
            </P>
            <P>
                Outside of programming you might find me reading a book or
                spending time with my two dogs.
            </P>
        </Layout>
    </>
);
