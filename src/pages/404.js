import React from "react";
import Layout from "../components/layout";
import styled from "styled-components";
import Typewriter from "../components/typewriter";
import Helmet from "react-helmet";

export default () => (
    <>
        <Helmet>
            <meta charSet='utf-8' />
            <title>Page Not Found - Mark King</title>
        </Helmet>
        <Layout>
            <Typewriter text='Error: 404' />
            <NotFoundContainer>
                <StyledH1>
                    Uh oh! <span role='img'>😕</span>
                </StyledH1>
                <h2>Looks like that page doesn't exist.</h2>
            </NotFoundContainer>
        </Layout>
    </>
);

const NotFoundContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const StyledH1 = styled.h1`
    font-size: 3rem;
`;
