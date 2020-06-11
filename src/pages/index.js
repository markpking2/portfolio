import React from "react";
import Layout from "../components/layout";
import Typewriter from "../components/typewriter";
import styled from "styled-components";
import Helmet from "react-helmet";
import Img from "gatsby-image/withIEPolyfill";
import { graphql } from "gatsby";
import thumbnail from "../../static/thumbnail.png";

export default ({ data }) => {
    const [image] = data.Image.edges;
    const {
        childImageSharp: { sizes },
    } = image.node;

    return (
        <>
            <Helmet>
                <html lang="en" />
                <meta charSet="utf-8" />
                <meta property="og:image" content={thumbnail} />
                <title>My Portfolio - Mark King</title>
                <meta
                    name="description"
                    content="I'm Mark King; a full stack web developer, and this is my portfolio site!"
                />
                <link rel="canonical" href="https://mark.codes" />
                <meta property="og:image" content={thumbnail} />
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
                    focused team player. I'm passionate about developing fast
                    and scalable software products. I have experience working on
                    diverse cross functional teams with web developers, mobile
                    developers, and UX/UI designers.
                </P>
                <P>
                    I{" "}
                    <span role="img" aria-label="heart emoji">
                        🧡
                    </span>{" "}
                    to work with JavaScript and Python; using React, Node.js,
                    AWS, Express, SQL, MongoDB, and GraphQL among other things.
                </P>
                <P>
                    Outside of programming, you might find me reading a book, at
                    the motocross track, or spending time with my two Australian
                    Shepherds; York and Lilo.
                </P>
                <ImgWrapper>
                    <StyledImg
                        title={"Mark and his two dogs"}
                        alt="Mark and his two dogs"
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
                        sizes(maxWidth: 500) {
                            ...GatsbyImageSharpSizes
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
    max-width: 475px;
    margin: 0;
    padding: 0 0.3rem;
    border-radius: 10px;
`;

const ImgWrapper = styled.div`
    margin-top: 30px;
    margin-bottom: 50px;
`;
