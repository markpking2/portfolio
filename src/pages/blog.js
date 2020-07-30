import React from "react";
import PostLink from "../components/postLink";
import Helmet from "react-helmet";
import Layout from "../components/layout";
import { graphql } from "gatsby";

export default ({
    data: {
        allMarkdownRemark: { edges },
    },
}) => {
    const Posts = edges
        .filter((edge) => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
        .map((edge) => <PostLink key={edge.node.id} post={edge.node} />);
    return (
        <>
            <Helmet>
                <html lang="en" />
                <meta charSet="utf-8" />
                <title>My Portfolio - Mark King</title>
                <meta
                    name="description"
                    content="I'm Mark King and this is my blog about full stack development."
                />
                <meta
                    property="og:image:secure_url"
                    content="https://mark.codes/ogpImage.jpg"
                />
                <meta
                    property="og:image"
                    content="http://mark.codes/ogpImage.jpg"
                />
                <meta property="og:title" content="Blog - Mark King" />
                <meta
                    property="og:description"
                    content="I'm Mark King and this is my blog about full stack development."
                />
                <meta property="og:url" content="https://mark.codes" />
            </Helmet>
            <Layout>{Posts}</Layout>
        </>
    );
};

export const pageQuery = graphql`
    query {
        allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
            edges {
                node {
                    id
                    excerpt(pruneLength: 250)
                    frontmatter {
                        date(formatString: "MMMM DD, YYYY")
                        slug
                        title
                    }
                }
            }
        }
    }
`;
