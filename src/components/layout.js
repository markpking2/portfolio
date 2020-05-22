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
  @media only screen and (max-width: 570px) {
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
        color: white
    `}
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
    color: rgba(102, 252, 241, 1);
    &:hover {
      opacity: 0.5;
    }
    }
  }
  .active {
      font-size: 1.5rem;
      color: white;
      background: none;
      text-shadow: none;
      font-family: "Work Sans",sans-serif;
      pointer-events: none;

      &:hover {
          opacity: 1
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

const isActive = ({ isCurrent }) => {
  return isCurrent ? { className: "active" } : {};
};

export default ({ children }) => {
  return (
    <LayoutDiv>
      <Content>
        <Header>
          <StyledLink id="name" to="/">
            <h1>Mark King</h1>
          </StyledLink>
          <Icons>
            <li>
              <StyledLink to={"/resume"} title="Resume">
                <Resume fill="red" />
              </StyledLink>
            </li>
            <li>
              <a href="https://github.com/markpkng" title="Mark's GitHub">
                <Github fill="white" textDecoration="none" />
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com/in/markpking"
                title="Mark's LinkedIn"
              >
                <Linkedin
                  style={{
                    background: "white",
                    borderRadius: "7px",
                  }}
                />
              </a>
            </li>
            <li>
              <a href="mailto:mark@mark.codes" title="Mark's Email">
                <Email fill="white" />
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
          </Links>
        </Header>
        {children}
      </Content>
      <Footer>
        <span style={{ color: "#ffffff" }}>&copy; Mark King 2020</span>
      </Footer>
    </LayoutDiv>
  );
};
