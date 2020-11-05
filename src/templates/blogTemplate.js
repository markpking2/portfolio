import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Helmet from "react-helmet";

export default function Template({ data }) {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  return (
    <>
      <Helmet>
        <html lang="en" />
        <meta charSet="utf-8" />
        <title>{frontmatter.title} - Mark King</title>
        <meta name="description" content={frontmatter.description} />
        <meta
          property="og:image:secure_url"
          content="https://markpking2.com/ogpImage.jpg"
        />
        <meta
          property="og:image"
          content="http://markpking2.com/ogpImage.jpg"
        />
        <meta
          property="og:title"
          content={`${frontmatter.title} - Mark King`}
        />
        <meta property="og:description" content={frontmatter.description} />
        <meta
          property="og:url"
          content={`https://markpking2.com${frontmatter.slug}`}
        />
      </Helmet>
      <Layout widthoverride="1050px">
        <div className="blog-post-container">
          <div className="blog-post">
            <h1>{frontmatter.title}</h1>
            <h2>{frontmatter.date}</h2>
            <div
              className="blog-post-content"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </div>
      </Layout>
    </>
  );
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
      }
    }
  }
`;
