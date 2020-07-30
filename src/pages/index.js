import React from "react";
import Layout from "../components/layout";
import Typewriter from "../components/typewriter";
import styled from "styled-components";
import Helmet from "react-helmet";
import Img from "gatsby-image/withIEPolyfill";
import { graphql } from "gatsby";

export default ({ data }) => {
    const [image] = data.Image.edges;
    const {
        childImageSharp: { fluid },
    } = image.node;

    return (
        <>
            <Helmet>
                <html lang="en" />
                <meta charSet="utf-8" />
                <title>My Portfolio - Mark King</title>
                <meta
                    name="description"
                    content="I'm Mark King; a full stack web developer, and this is my portfolio site!"
                />
                <link rel="canonical" href="https://mark.codes" />
                <meta
                    property="og:image:secure_url"
                    content="https://mark.codes/ogpImage.jpg"
                />
                <meta
                    property="og:image"
                    content="http://mark.codes/ogpImage.jpg"
                />
                <meta property="og:title" content="My Portfolio - Mark King" />
                <meta
                    property="og:description"
                    content="I'm Mark King; a full stack web developer, and this is my portfolio site!"
                />
                <meta property="og:url" content="https://mark.codes" />
            </Helmet>
            <Layout>
                <Typewriter text="Hello :)" />
                <P>
                    I'm Mark; a full stack web developer, avid learner, and
                    focused team player. I have experience working on diverse
                    cross functional teams with web developers, mobile
                    developers, and UX/UI designers.
                </P>
                <P>
                    I love working with React, Node.js, and AWS but I'm always
                    excited to learn something new!
                </P>
                <P>
                    Outside of programming, you might find me reading a book, at
                    the motocross track, or spending time with my two Australian
                    Shepherds; York and Lilo.
                </P>
                <ImgWrapper>
                    <StyledImg
                        title={"Mark's computersla"}
                        alt="Mark's computer"
                        fluid={fluid}
                    />
                </ImgWrapper>
            </Layout>
        </>
    );
};

export const query = graphql`
    query image {
        Image: allFile(filter: { relativePath: { regex: "/computer.png/" } }) {
            edges {
                node {
                    relativePath
                    name
                    childImageSharp {
                        fluid(
                            maxWidth: 800
                            quality: 100
                            srcSetBreakpoints: [
                                800
                                700
                                600
                                500
                                400
                                300
                                200
                            ]
                        ) {
                            ...GatsbyImageSharpFluid_withWebp
                        }
                    }
                }
            }
        }
    }
`;

const P = styled.p`
    color: ${(props) => props.theme.primary};
`;

const StyledImg = styled(Img)`
    grid-row: 1 / -1;
    margin: 0;
    padding: 0 0.3rem;
    border-radius: 10px;
    filter: brightness(0.6);
`;

const ImgWrapper = styled.div`
    margin-top: 30px;
    margin-bottom: 50px;
`;
