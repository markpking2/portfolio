import React from "react";
import Layout from "../components/layout";
import Typewriter from "../components/typewriter";
import styled from "styled-components";
import Helmet from "react-helmet";
import Img from "gatsby-image/withIEPolyfill";

const P = styled.p`
    margin-bottom: 0.2rem;
    color: #ffffff;
`;

const StyledImg = styled(Img)`
    grid-row: 1 / -1;
    max-width: 475px;
    margin: 0;
    padding: 0 0.3rem;
    border-radius: 10px;
`;

const ImgWrapper = styled.div`
    margin-top: 30px;
    margin-bottom: 50px;
`;

export default ({ data }) => {
    const [image] = data.Image.edges;
    const {
        childImageSharp: { sizes },
    } = image.node;
    return (
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
                <ImgWrapper>
                    <StyledImg
                        title={"Mark and his two dogs"}
                        alt='Mark and his two dogs'
                        sizes={sizes}
                    />
                </ImgWrapper>
            </Layout>
        </>
    );
};

export const query = graphql`
    query image {
        Image: allFile(filter: { relativePath: { regex: "/boat_dogs.png/" } }) {
            edges {
                node {
                    childImageSharp {
                        sizes(maxWidth: 950) {
                            ...GatsbyImageSharpSizes
                        }
                    }
                }
            }
        }
    }
`;
