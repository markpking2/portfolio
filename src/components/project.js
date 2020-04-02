import React, { useRef, useState, useLayoutEffect } from "react"
import styled from "styled-components"
import Img from "gatsby-image/withIEPolyfill"
import { LinkIcon, Github } from "../assets/icons"
import Carousel from "./carousel"

const ProjectContainer = styled.div`
  width: 100%;
  margin: 1rem 0;
`

const StyledImg = styled(Img)`
  margin: 0;
  min-width: ${({ maxWidth }) => maxWidth}%;
  max-height: 750px;
`

const StyledLinkIcon = styled(LinkIcon)`
  display: inline;
  margin-left: 1rem;
`

const H4 = styled.h4`
  display: inline;
  margin: 0 !important;
`

const P = styled.p`
  margin-bottom: 0.2rem;
`

const ProjectLink = styled.a`
  text-decoration: none;
  background-image: none;

  h2 {
    display: inline;
  }

  &:hover {
    opacity: 0.5;
  }
`

const RepoDiv = styled.div`
  display: flex;
  align-items: center;

  a {
    text-decoration: none;
    color: hsla(0, 0%, 0%, 0.8);
    background-image: none;

    &:hover {
      opacity: 0.5;
      cursor: pointer;
    }
  }
`

export default ({ sizes, project, images }) => {
  const ref = useRef()
  const [dimensions, setDimensions] = useState({})
  useLayoutEffect(() => {
    setDimensions(ref.current && ref.current.getBoundingClientRect())
  }, [ref.current])
  return (
    <ProjectContainer>
      {project.demo ? (
        <ProjectLink href={project.demo}>
          <h2>{project.name}</h2>
          <StyledLinkIcon />
        </ProjectLink>
      ) : (
        <h2>{project.name}</h2>
      )}
      <div ref={ref}>
        <Carousel top={dimensions.height / 2 - 22} left={55} right={55}>
          {sizes.map((size, i) => (
            <StyledImg
              title={project.name}
              key={i}
              alt="Screenshot of project"
              sizes={size}
              maxWidth={project.maxWidth}
              objectFit="contain"
            />
          ))}
        </Carousel>
      </div>
      <div>
        <span>
          <strong>Tech Stack: </strong>
        </span>
        <H4>{project.tech}</H4>
      </div>
      <P>
        <strong>Description: </strong>
        {project.description}
      </P>
      {project.frontend && (
        <RepoDiv>
          <a href={project.frontend}>
            <span>
              <strong>Front End Code</strong>
            </span>
            <span style={{ marginLeft: "0.5rem" }}>
              <Github />
            </span>
          </a>
        </RepoDiv>
      )}
      {project.backend && (
        <RepoDiv>
          <a href={project.backend}>
            <span>
              <strong>Back End Code</strong>
            </span>
            <span style={{ marginLeft: "0.5rem" }}>
              <Github />
            </span>
          </a>
        </RepoDiv>
      )}
    </ProjectContainer>
  )
}
