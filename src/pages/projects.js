import React from "react";
import Layout from "../components/layout";
import Typewriter from "../components/typewriter";
import Project from "../components/project";
import projectList from "../data/projects.json";
import Helmet from "react-helmet";

export default ({ data }) => {
    const { edges: projectImages } = data.ProjectImages;
    return (
        <>
            <Helmet>
                <meta charSet='utf-8' />
                <title>Projects - Mark King</title>
                <link rel='canonical' href='https://mark.codes/projects' />
            </Helmet>
            <Layout>
                <Typewriter text='Projects' />
                {projectList &&
                    projectList.map((project) => {
                        const images = projectImages.filter((image, i) => {
                            return project.images.includes(
                                image.node.relativePath
                            );
                        });
                        return (
                            <Project
                                key={project.name}
                                images={images}
                                sizes={images.map(
                                    (image) => image.node.childImageSharp.sizes
                                )}
                                project={project}
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
                        sizes(maxWidth: 950) {
                            ...GatsbyImageSharpSizes
                        }
                    }
                }
            }
        }
    }
`;
