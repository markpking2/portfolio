import React, { useState } from "react";
import Layout from "../components/layout";
import Typewriter from "../components/typewriter";
import Project from "../components/project";
import projectList from "../data/projects.json";
import PortfolioProject from "../components/portfolioProject";
import ImageView from "../components/imageView";
import Helmet from "react-helmet";
import { graphql } from "gatsby";

export default ({ data }) => {
    const [touched, setTouched] = useState(false);
    const [viewedImage, setViewedImage] = useState(null);
    const { edges: projectImages } = data.ProjectImages;
    const { edges: mobileProjectImages } = data.MobileProjectImages;
    const { edges: projectStaticImages } = data.StaticProjectImages;
    const { publicURL: lighthouseGif } = data.Lighthouse;
    const { publicURL: lighthouseStill } = data.LighthouseStill;
    console.log(projectImages.map((p) => p.node.name));
    console.log(mobileProjectImages.map((p) => p.node.name));

    return (
        <>
            <Helmet>
                <html lang="en" />
                <meta charSet="utf-8" />
                <title>Projects - Mark King</title>
                <meta
                    name="description"
                    content="I'm Mark King, a full stack web developer. Here are some of the projects I've worked on."
                />
                <link rel="canonical" href="https://mark.codes/projects" />
                <meta
                    property="og:image:secure_url"
                    content="https://mark.codes/ogpImage.jpg"
                />
                <meta
                    property="og:image"
                    content="http://mark.codes/ogpImage.jpg"
                />
                <meta property="og:title" content="Projects - Mark King" />
                <meta
                    property="og:description"
                    content="I'm Mark King, a full stack web developer. Here are some of the projects I've worked on."
                />
                <meta property="og:url" content="https://mark.codes/projects" />
            </Helmet>
            <Layout>
                {viewedImage && (
                    <ImageView
                        setViewedImage={setViewedImage}
                        image={viewedImage}
                    />
                )}
                <Typewriter text="Things I've worked on..." />
                <PortfolioProject gif={lighthouseGif} still={lighthouseStill} />
                {projectList &&
                    projectList.map((project, i) => {
                        const images = projectImages
                            .concat(mobileProjectImages)
                            .filter((image, i) => {
                                return project.images.includes(
                                    image.node.relativePath
                                );
                            });
                        return (
                            <Project
                                key={project.name}
                                sizes={images.map(
                                    (image) => image.node.childImageSharp.fluid
                                )}
                                project={project}
                                touched={touched}
                                setTouched={setTouched}
                                setViewedImage={setViewedImage}
                                staticImages={projectStaticImages
                                    .filter((node) =>
                                        node.node.name.match(
                                            new RegExp(
                                                `${project.imageQuery}`,
                                                "g"
                                            )
                                        )
                                    )
                                    .sort((a, b) =>
                                        a.node.name > b.node.name ? 1 : -1
                                    )}
                            />
                        );
                    })}
                <br />
            </Layout>
        </>
    );
};

export const query = graphql`
    query projectImages {
        ProjectImages: allFile(
            sort: { order: ASC, fields: [absolutePath] }
            filter: { relativePath: { regex: "/^((?!.*mobile.*).)*.png$/" } }
        ) {
            edges {
                node {
                    relativePath
                    name
                    childImageSharp {
                        fluid(
                            maxWidth: 800
                            srcSetBreakpoints: [
                                200
                                300
                                400
                                500
                                600
                                700
                                800
                            ]
                        ) {
                            ...GatsbyImageSharpFluid_withWebp
                        }
                    }
                }
            }
        }
        MobileProjectImages: allFile(
            sort: { order: ASC, fields: [absolutePath] }
            filter: { relativePath: { regex: "/^(mobile.*).png$/" } }
        ) {
            edges {
                node {
                    relativePath
                    name
                    childImageSharp {
                        fluid(
                            maxWidth: 400
                            srcSetBreakpoints: [100, 200, 300, 400]
                        ) {
                            ...GatsbyImageSharpFluid_withWebp
                        }
                    }
                }
            }
        }
        StaticProjectImages: allFile(filter: { extension: { eq: "png" } }) {
            edges {
                node {
                    name
                    childImageSharp {
                        fluid {
                            ...GatsbyImageSharpFluid_withWebp
                        }
                    }
                }
            }
        }
        Lighthouse: file(relativePath: { regex: "/lighthouse.gif/" }) {
            publicURL
        }
        LighthouseStill: file(
            relativePath: { regex: "/lighthouseStill.png/" }
        ) {
            publicURL
        }
    }
`;
