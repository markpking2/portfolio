/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
    siteMetadata: {
        siteUrl: "https://www.mark.codes",
    },
    plugins: [
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `Mark King`,
                short_name: `Mark King`,
                start_url: `/`,
                background_color: `#f7f0eb`,
                theme_color: `#a2466c`,
                display: `standalone`,
                icon: `src/assets/images/aussie.png`,
            },
        },
        "gatsby-plugin-offline",
        "gatsby-plugin-react-helmet",
        "gatsby-plugin-styled-components",
        "gatsby-plugin-recaptcha",
        "gatsby-plugin-sharp",
        "gatsby-transformer-sharp",
        {
            resolve: "gatsby-plugin-typography",
            options: {
                pathToConfigModule: "src/utils/typography",
            },
        },
        {
            resolve: "gatsby-plugin-react-svg",
            options: {
                rule: {
                    include: /assets/,
                },
            },
        },
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "data",
                path: `${__dirname}/src/data/`,
            },
        },
        {
            resolve: "gatsby-source-filesystem",
            options: {
                path: `${__dirname}/src/assets/images`,
                name: "images",
            },
        },
        {
            resolve: "gatsby-plugin-s3",
            options: {
                bucketName: "mark.codes",
                protocol: "https",
                hostname: "www.mark.codes",
            },
        },
        {
            resolve: "gatsby-plugin-robots-txt",
            options: {
                host: "https://www.mark.codes",
                policy: [{ userAgent: "*", allow: "/" }],
            },
        },
    ],
};
