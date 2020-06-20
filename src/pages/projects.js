import React, { useState } from "react";
import Layout from "../components/layout";
import Typewriter from "../components/typewriter";
import Project from "../components/project";
import projectList from "../data/projects.json";
import Helmet from "react-helmet";
import { graphql } from "gatsby";

export default ({ data }) => {
    const [touched, setTouched] = useState(false);
    const { edges: projectImages } = data.ProjectImages;
    const { edges: projectStaticImages } = data.StaticProjectImages;

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
                    content="https://mark.codes/ogp.png"
                />
                <meta property="og:image" content="http://mark.codes/ogp.png" />
                <meta property="og:title" content="Projects - Mark King" />
                <meta
                    property="og:description"
                    content="I'm Mark King, a full stack web developer. Here are some of the projects I've worked on."
                />
                <meta property="og:url" content="https://mark.codes/projects" />
            </Helmet>
            <Layout>
                <Typewriter text="Things I've worked on..." />
                {projectList &&
                    projectList.map((project, i) => {
                        const images = projectImages.filter((image, i) => {
                            return project.images.includes(
                                image.node.relativePath
                            );
                        });
                        return (
                            <Project
                                key={project.name}
                                sizes={images.map(
                                    (image) => image.node.childImageSharp.sizes
                                )}
                                project={project}
                                touched={touched}
                                setTouched={setTouched}
                                staticImages={projectStaticImages
                                    .filter((node) =>
                                        node.node.name.match(
                                            new RegExp(
                                                `${project.imageQuery}`,
                                                "g"
                                            )
                                        )
                                    )
                                    .map((node) => ({
                                        url: node.node.publicURL,
                                        name: node.node.name,
                                    }))
                                    .sort((a, b) => (a.name > b.name ? 1 : -1))}
                            />
                        );
                    })}
            </Layout>
        </>
    );
};

export const query = graphql`
    query projectImages {
        ProjectImages: allFile(
            sort: { order: ASC, fields: [absolutePath] }
            filter: { relativePath: { regex: "/.*.png/" } }
        ) {
            edges {
                node {
                    relativePath
                    name
                    childImageSharp {
                        sizes(maxWidth: 1200) {
                            ...GatsbyImageSharpSizes
                        }
                    }
                }
            }
        }

        StaticProjectImages: allFile(filter: { extension: { eq: "png" } }) {
            edges {
                node {
                    publicURL
                    name
                }
            }
        }
    }
`;
