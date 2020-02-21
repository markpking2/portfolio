import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const Links = styled.div`
  width: 100%;
  margin: 1rem 0;
  padding: 0;
  font-size: 1.2rem;
  a {
    color: hsla(0, 0%, 0%, 0.5);
  }
`

const StyledLink = styled(Link)`
  text-shadow: none;
  text-decoration: none;
  background-image: none;
  margin-top: 1rem;
  padding: 0.5rem;
`

export default () => (
  <Links>
    <StyledLink to="/" activeStyle={{ color: "hsla(0,0%,0%,0.9)" }}>
      About
    </StyledLink>
    <StyledLink to="/projects" activeStyle={{ color: "hsla(0,0%,0%,0.9)" }}>
      Projects
    </StyledLink>
  </Links>
)
