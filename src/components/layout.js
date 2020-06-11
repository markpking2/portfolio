import React, { useState } from "react";
import { Link } from "gatsby";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import {
    Email,
    Github,
    Linkedin,
    Resume,
    Name,
    ArrowLeft,
    ArrowRight,
} from "../assets/icons";
import Hamburger from "./hamburger";
import { theme } from "../styles/themes";

const isActive = ({ isCurrent }) => {
    return isCurrent ? { className: "active" } : {};
};

export default ({ children }) => {
    const [selectedTheme, setSelectedTheme] = useState({
        ...theme,
        tertiary: theme.colors[theme.colorIndex],
        before: theme.colors[6],
        after: theme.colors[1],
    });

    function colorChange(before) {
        let tertiary;
        if (before) {
            tertiary =
                theme.colors[
                    theme.colorIndex === 0
                        ? (theme.colorIndex = 6)
                        : --theme.colorIndex
                ];
        } else {
            tertiary =
                theme.colors[
                    theme.colorIndex === 6
                        ? (theme.colorIndex = 0)
                        : ++theme.colorIndex
                ];
        }

        setSelectedTheme({
            ...theme,
            tertiary,
            before:
                theme.colorIndex === 0
                    ? theme.colors[6]
                    : theme.colors[theme.colorIndex - 1],
            after:
                theme.colorIndex === 6
                    ? theme.colors[0]
                    : theme.colors[theme.colorIndex + 1],
        });
    }
    return (
        <ThemeProvider theme={selectedTheme}>
            <GlobalStyle />
            <LayoutDiv>
                <Hamburger />
                <Content>
                    <Header>
                        <NameWrapper>
                            <StyledArrowLeft
                                onClick={() => colorChange(true)}
                            />
                            <StyledLink to="/">
                                <StyledName />
                            </StyledLink>
                            <StyledArrowRight
                                onClick={() => colorChange(false)}
                            />
                        </NameWrapper>
                        <Icons>
                            <li>
                                <StyledLink
                                    id="resume"
                                    to={"/resume"}
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
                            <StyledLink to="/contact/" getProps={isActive}>
                                Contact
                            </StyledLink>
                        </Links>
                    </Header>
                    {children}
                </Content>
                <Footer>
                    <span>
                        Developed with{" "}
                        <span role="img" aria-label="heart emoji">
                            🧡
                        </span>{" "}
                        using GatsbyJS in{" "}
                        <span role="img" aria-label="palm tree emoji">
                            🌴
                        </span>{" "}
                        Florida, US. Hosted on AWS.
                    </span>
                    <br />
                    <span>&copy; Mark King 2020</span>
                </Footer>
            </LayoutDiv>
        </ThemeProvider>
    );
};

const GlobalStyle = createGlobalStyle`
    html,
    body,
    #___gatsby {
        height: 100%;
        background-color: ${(props) => props.theme.secondary};
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
    margin: 2.5rem auto 0 auto;
    max-width: 950px;
    padding: 0 3rem;

    h1,
    h2 {
        display: inline;
        color: ${(props) => props.theme.primary};
    }
    h4 {
        margin: 0.5rem;
    }
    @media only screen and (max-width: 500px) {
        padding: 0 1rem;
    }
`;

const Header = styled.header`
    @media only screen and (max-width: 720px) {
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

        @media only screen and (max-width: 420px) {
            width: 2.2rem;
            height: 2.2rem;
        }
    }
`;

const Links = styled.div`
  width: 100%;
  margin: 1rem 0;
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
  @media only screen and (max-width: 450px) {
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

const StyledName = styled(Name)`
    fill: ${(props) => props.theme.tertiary};
    width: 100%;
    max-width: 300px;
    max-height: 80px;

    @media only screen and (max-width: 500px) {
        max-width: 250px;
    }

    @media only screen and (max-width: 380px) {
        max-width: 200px;
    }
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

const StyledArrowLeft = styled(ArrowLeft)`
    min-width: 40px;
    min-height: 40px;
    fill: ${(props) => props.theme.before};

    &:hover {
        opacity: 0.5;
        cursor: pointer;
    }

    @media only screen and (max-width: 380px) {
        min-width: 30px;
        min-height: 30px;
    }
`;

const StyledArrowRight = styled(ArrowRight)`
    min-width: 40px;
    min-height: 40px;
    fill: ${(props) => props.theme.after};

    &:hover {
        opacity: 0.5;
        cursor: pointer;
    }

    @media only screen and (max-width: 380px) {
        min-width: 30px;
        min-height: 30px;
    }
`;

const NameWrapper = styled.span`
    display: inline-block;
    @media only screen and (max-width: 450px) {
        margin-top: 35px;
    }
`;
