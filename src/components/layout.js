import React, { useState } from "react";
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

export default ({ children }) => {
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

        tertiary =
            theme.colors[
                theme.colorIndex === 5
                    ? (theme.colorIndex = 0)
                    : ++theme.colorIndex
            ];

        setSelectedTheme({
            ...theme,
            tertiary,
            after:
                theme.colorIndex === 5
                    ? theme.colors[0]
                    : theme.colors[theme.colorIndex + 1],
        });
    }
    return (
        <ThemeProvider theme={selectedTheme}>
            <GlobalStyle backgroundURL={backgroundURL} />
            <Helmet>
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/apple-touch-icon.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/favicon-16x16.png"
                />
                <link rel="manifest" href="/site.webmanifest" />
                <link
                    rel="mask-icon"
                    href="/safari-pinned-tab.svg"
                    color="#5bbad5"
                />
                <meta name="msapplication-TileColor" content="#da532c" />
                <meta name="theme-color" content="#ffffff" />
            </Helmet>
            <LayoutDiv>
                <Hamburger />
                <Content>
                    <Header>
                        <NameWrapper>
                            <StyledLink to="/">
                                <StyledName>Mark King</StyledName>
                                <SubheadingWrapper>
                                    <Subheading>
                                        Highly adaptable full stack engineer
                                        with a passion for developing fast and
                                        scalable web applications.
                                    </Subheading>
                                </SubheadingWrapper>
                            </StyledLink>
                        </NameWrapper>
                        <Icons>
                            <li>
                                <StyledLink
                                    id="resume"
                                    to="/resume"
                                    title="Resume"
                                >
                                    <StyledResume />
                                </StyledLink>
                            </li>
                            <li>
                                <a
                                    href="https://github.com/markpkng"
                                    title="Mark's GitHub"
                                >
                                    <StyledGithub textDecoration="none" />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://linkedin.com/in/markpking"
                                    title="Mark's LinkedIn"
                                >
                                    <StyledLinkedin />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="mailto:mark@mark.codes"
                                    title="Mark's Email"
                                >
                                    <StyledEmail fill={theme.primary} />
                                </a>
                            </li>
                        </Icons>

                        <Links>
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
                            <StyledLink to="/resume" getProps={isActive}>
                                Resume
                            </StyledLink>
                        </Links>
                    </Header>
                    {children}
                </Content>
                <Footer>
                    <span>&copy; Mark King 2020</span>
                    <br />
                    <span>
                        Developed with GatsbyJS in{" "}
                        <span role="img" aria-label="palm tree emoji">
                            🌴
                        </span>{" "}
                        Florida, US. Hosted on AWS S3.
                    </span>
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
        background: linear-gradient( rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.85) ), url(${({
            backgroundURL,
        }) => backgroundURL});
        background-size: cover;
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

const LayoutDiv = styled.div`
    margin: 0 auto 0 auto;
    max-width: 900px;
    padding: 2.5rem 3rem 1rem 3rem;
    border-left: 3px solid ${(props) => props.theme.tertiary};
    border-right: 3px solid ${(props) => props.theme.tertiary};
    background: ${(props) => props.theme.secondary};

    h1,
    h2 {
        display: inline;
        color: ${(props) => props.theme.primary};
    }
    h4 {
        margin: 0.5rem;
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

        @media only screen and (max-width: 651px) {
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
  }
  .active {
      font-size: 1.5rem;
      color: ${(props) => props.theme.primary};
      background: none;
      text-shadow: none;
      font-family: "Work Sans",sans-serif;
      pointer-events: none;

      &:hover {
          opacity: 1
      }
  }
  @media only screen and (max-width: 650px) {
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
    font-family: Serif;
`;

const Subheading = styled.h6`
    display: inline-block;
    color: white;
    margin-top: 0.75rem;
    font-family: "Quattrocento Sans", sans-serif;
    font-style: italic;
    font-weight: 400;
    font-size: 0.9rem;
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
