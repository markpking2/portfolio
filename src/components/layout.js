import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import { Email, Github, Linkedin, Resume } from "../assets/icons";
import resume from "../assets/Mark_King_Resume.pdf";

const LayoutDiv = styled.div`
    margin: 3rem auto 0 auto;
    max-width: 950px;
    padding: 0 3rem;

    h1,
    h2 {
        display: inline;
        color: rgba(255, 255, 255, 1);
    }
    h4 {
        margin: 0.5rem;
    }
`;

const Header = styled.header`
    @media only screen and (max-width: 420px) {
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
`;

const Icons = styled.ul`
    list-style: none;
    float: right;
    margin: 0;

    li {
        display: inline-block;
        padding: 0 0.5rem;

        a {
            background-image: none;
        }
    }

    svg {
        width: 1.8rem;
        height: 1.8rem;

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
    color: rgba(102, 252, 241, 1);
    &:hover {
      opacity: 0.5;
    }
    }
  }
`;
const Content = styled.div`
    min-height: calc(100vh - 125px);
`;

const Footer = styled.footer`
    width: 100%;
    height: 75px;
    text-align: center;
`;

export default ({ children }) => (
    <LayoutDiv>
        <Content>
            <Header>
                <StyledLink id='name' to='/'>
                    <h1>Mark King</h1>
                </StyledLink>
                <Icons>
                    <li>
                        <a href={resume}>
                            <Resume fill='rgba(102, 252, 241, 1)' />
                        </a>
                    </li>
                    <li>
                        <a href='https://github.com/markpkng'>
                            <Github
                                fill='rgba(102, 252, 241, 1)'
                                textDecoration='none'
                            />
                        </a>
                    </li>
                    <li>
                        <a href='https://linkedin.com/in/markpking'>
                            <Linkedin fill='rgba(102, 252, 241, 1)' />
                        </a>
                    </li>
                    <li>
                        <a href='mailto:markpkng@gmail.com'>
                            <Email fill='rgba(102, 252, 241, 1)' />
                        </a>
                    </li>
                </Icons>
                <Links>
                    <StyledLink
                        to='/'
                        activeStyle={{
                            color: "#ffffff",
                            fontWeight: "bold",
                        }}
                    >
                        About
                    </StyledLink>
                    <StyledLink
                        to='/projects/'
                        activeStyle={{
                            color: "#ffffff",
                            fontWeight: "bold",
                        }}
                    >
                        Projects
                    </StyledLink>
                </Links>
            </Header>
            {children}
        </Content>
        <Footer>
            <span style={{ color: "#ffffff" }}>&copy; Mark King 2020</span>
        </Footer>
    </LayoutDiv>
);
