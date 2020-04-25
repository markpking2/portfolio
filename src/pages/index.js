import React from "react";
import Layout from "../components/layout";
import Typewriter from "../components/typewriter";
import styled from "styled-components";
import Helmet from "react-helmet";
import Img from "gatsby-image/withIEPolyfill";
import { graphql } from "gatsby";

const P = styled.p`
    ${"" /* margin-bottom: 0.2rem; */}
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
                <Typewriter text='Hello :)' />
                <P>
                    I'm Mark; a full stack web developer, fast learner, and avid
                    team player. I have experience working on diverse cross
                    functional teams with web developers, mobile developers, and
                    UX/UI designers.
                </P>
                <P>
                    I{" "}
                    <span role='img' aria-label='heart emoji'>
                        🧡
                    </span>{" "}
                    to work with JavaScript and Python, using technologies such
                    as React, Redux, Node.js, SQL, and GraphQL.
                </P>
                <P>
                    Outside of programming, you might find me reading a book, on
                    my mountain bike, or spending time with my two dogs.
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
