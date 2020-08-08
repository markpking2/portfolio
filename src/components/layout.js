import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { Email, Github, Linkedin, Resume, Bucket } from "../assets/icons";
import Hamburger from "./hamburger";
import { theme } from "../styles/themes";
import Helmet from "react-helmet";
import { graphql, useStaticQuery } from "gatsby";

const isActive = ({ isCurrent }) => {
    return isCurrent ? { className: "active" } : {};
};

export default ({ children, widthoverride }) => {
    const [touch, setTouch] = useState(false);
    const [selectedTheme, setSelectedTheme] = useState({
        ...theme,
        tertiary: theme.colors[theme.colorIndex],
        before: theme.colors[5],
        after: theme.colors[1],
    });

    const {
        Background: { publicURL: backgroundURL },
    } = useStaticQuery(graphql`
        query BackgroundImage {
            Background: file(absolutePath: { regex: "/code_background/" }) {
                publicURL
            }
        }
    `);

    function colorChange() {
        let tertiary;

        tertiary = theme.colors[theme.colorIndex === 5 ? (theme.colorIndex = 0) : ++theme.colorIndex];

        setSelectedTheme({
            ...theme,
            tertiary,
            after: theme.colorIndex === 5 ? theme.colors[0] : theme.colors[theme.colorIndex + 1],
        });
    }

    useEffect(() => {
        let cancelled = false;

        if (!cancelled) {
            if (window.matchMedia("(pointer: coarse)").matches) {
                setTouch(true);
            }
        }

        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <>
            <ThemeProvider theme={selectedTheme}>
                <GlobalStyle backgroundURL={backgroundURL} selectedTheme={selectedTheme} />
                <Helmet>
                    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                    <link rel="manifest" href="/site.webmanifest" />
                    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
                    <meta name="msapplication-TileColor" content="#da532c" />
                    <meta name="theme-color" content="#ffffff" />
                </Helmet>
                <LayoutDiv widthoverride={widthoverride} touch={touch}>
                    <Hamburger />
                    <Content>
                        <Header>
                            <NameWrapper>
                                <StyledLink to="/">
                                    <StyledName style={{ display: "inline" }}>Mark King</StyledName>
                                    <SubheadingWrapper>
                                        <Subheading>
                                            Highly adaptable full stack engineer with a passion for developing fast and
                                            scalable web applications.
                                        </Subheading>
                                    </SubheadingWrapper>
                                </StyledLink>
                            </NameWrapper>
                            <Icons>
                                <li>
                                    <StyledLink id="resume" to="/resume" title="Resume">
                                        <StyledResume />
                                    </StyledLink>
                                </li>
                                <li>
                                    <a href="https://github.com/markpkng" title="Mark's GitHub">
                                        <StyledGithub textDecoration="none" />
                                    </a>
                                </li>
                                <li>
                                    <a href="https://linkedin.com/in/markpking" title="Mark's LinkedIn">
                                        <StyledLinkedin />
                                    </a>
                                </li>
                                <li>
                                    <a href="mailto:markpking2@gmail.com" title="Mark's Email">
                                        <StyledEmail fill={theme.primary} />
                                    </a>
                                </li>
                            </Icons>
                            <Links>
                                <StyledHr touch={touch} />
                                <StyledLink to="/" getProps={isActive}>
                                    About
                                </StyledLink>
                                <StyledLink to="/projects/" getProps={isActive}>
                                    Projects
                                </StyledLink>
                                <StyledLink to="/skills/" getProps={isActive}>
                                    Skills
                                </StyledLink>
                                <StyledLink to="/contact/" getProps={isActive}>
                                    Contact
                                </StyledLink>
                                <StyledLink to="/resume">Resume</StyledLink>
                                <StyledLink to="/blog" getProps={isActive}>
                                    Blog
                                </StyledLink>
                                <StyledHr touch={touch} />
                            </Links>
                        </Header>
                        {children}
                    </Content>
                    <Footer>
                        <span>&copy; Mark King 2020</span>
                        <br />
                        <span>Developed using Gatsby in Florida, US. Hosted on AWS.</span>
                        <BucketWrapper
                            onClick={() => {
                                colorChange();
                            }}
                        >
                            <StyledBucket />
                        </BucketWrapper>
                    </Footer>
                </LayoutDiv>
            </ThemeProvider>
        </>
    );
};

const GlobalStyle = createGlobalStyle`
    html {
        @media only screen and (max-width: 651px) {
            font-size: 106.25%;
            line-height: 24.65px;
        }
    }

    html,
    body,
    #___gatsby {
        height: 100%;
        background-color: ${(props) => props.theme.secondary};
        background: linear-gradient( rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.85) ), url(${({ backgroundURL }) =>
            backgroundURL});
        background-size: cover;

        a {
            font-weight: 600;
            text-shadow: none;
        }
    }

    body {
        margin: 0px;
    }

    div[role="group"][tabindex] {
        height: 100%;
    }

    height: 100%;
    display: flex;
    flex-direction: column;
  
`;

const StyledHr = styled.hr`
    display: block;
    border-top: 5px solid ${(props) => props.theme.tertiary};
    margin-left: ${({ touch }) => (touch ? "-1rem" : "-3rem")};
    margin-right: ${({ touch }) => (touch ? "-1rem" : "-3rem")};
    margin-top: 1rem;
`;

const LayoutDiv = styled.div`
    pre {
        overflow: auto;
        background: #f6f8fa;
    }
    code {
        color: black;
        background: #f6f8fa;
    }

    a {
        color: ${(props) => props.theme.tertiary};
        background: none;
        &:hover {
            opacity: 0.6;
        }
    }
    color: white;
    margin: 0 auto 0 auto;
    max-width: ${({ widthoverride }) => (widthoverride ? widthoverride : "900px")};
    padding: ${({ touch }) => (touch ? "2.5rem 1rem 1rem 1rem" : "2.5rem 3rem 1rem 3rem")};
    border-left: 3px solid ${(props) => props.theme.tertiary};
    border-right: 3px solid ${(props) => props.theme.tertiary};
    background: ${(props) => props.theme.secondary};

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        color: ${(props) => props.theme.primary};
    }

    @media only screen and (max-width: 900px) {
        border: none;
    }
`;

const Header = styled.header`
    @media only screen and (max-width: 800px) {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;

const StyledLink = styled(Link)`
    text-shadow: none;
    text-decoration: none;
    font-family: "Work Sans", sans-serif;
    background-image: none;
    margin-top: 1rem;
    padding: 0.5rem;

    ${({ isCurrent }) =>
        isCurrent &&
        `
        color: ${(props) => props.theme.primary};
    `}
`;

const Icons = styled.ul`
    list-style: none;
    float: right;
    margin: 0;

    #resume {
        padding: 0;
        margin-left: 0;
    }

    li {
        display: inline-block;
        margin: 0;
        a {
            margin: 0 0.5rem;
            background-image: none;
        }
    }

    svg {
        width: 1.8rem;
        min-width: 1.8rem;
        min-height: 1.8rem;

        &:hover {
            opacity: 0.5;
        }

        @media only screen and (max-width: 720px) {
            width: 2.2rem;
            height: 2.2rem;
        }
    }
`;

const Links = styled.div`
    width: 100%;
    margin: 0 0 1.5rem 0;
    padding: 0;
    font-size: 1.2rem;
    a {
        color: ${(props) => props.theme.tertiary};
        &:hover {
            opacity: 0.5;
        }
    }
    .active {
        font-size: 1.5rem;
        color: ${(props) => props.theme.primary};
        background: none;
        text-shadow: none;
        font-family: "Work Sans", sans-serif;
        pointer-events: none;

        &:hover {
            opacity: 1;
        }
    }
    @media only screen and (max-width: 720px) {
        display: none;
    }
`;
const Content = styled.div`
    min-height: calc(100vh - 125px);
`;

const Footer = styled.footer`
    width: 100%;
    height: 75px;
    text-align: center;
    color: ${(props) => props.theme.primary};
`;

const StyledName = styled.h1`
    font-family: "DM Serif Display", Serif;
    font-weight: 400;
`;

const Subheading = styled.h6`
    display: inline-block;
    color: white;
    margin-top: 0.75rem;
    font-family: "Quattrocento Sans", sans-serif;
    font-style: italic;
    font-weight: 600;
    font-size: 1rem;
    margin-bottom: 0;
`;

const SubheadingWrapper = styled.div`
    max-width: 450px;
`;

const StyledGithub = styled(Github)`
    fill: ${(props) => props.theme.primary};
`;

const StyledEmail = styled(Email)`
    fill: ${(props) => props.theme.primary};
`;

const StyledLinkedin = styled(Linkedin)`
    fill: ${(props) => props.theme.linkedin};
`;

const StyledResume = styled(Resume)`
    fill: ${(props) => props.theme.resume};
`;

const BucketWrapper = styled.div`
    position: relative;
    &:hover {
        cursor: pointer;
        opacity: 0.8;
    }
`;

const StyledBucket = styled(Bucket)`
    position: absolute;
    width: 50px;
    height: 50px;
    right: 0;
    bottom: 10px;
    fill: ${(props) => props.theme.tertiary};

    @media only screen and (max-width: 800px) {
        bottom: 60px;
    }
`;

const NameWrapper = styled.span`
    display: inline-block;
    @media only screen and (max-width: 450px) {
        margin-top: 35px;
    }
`;
