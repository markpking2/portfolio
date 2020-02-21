import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"

const ProjectContainer = styled.div`
  width: 100%;

  margin: 1rem 0;
`
const ImageContainer = styled.div``

const StyledImg = styled(Img)`
  width: 100%;
  height: 100%;
`

export default ({ sizes, project }) => (
  <ProjectContainer>
    <ImageContainer>
      <StyledImg
        title={project.name}
        alt="Screenshot of project"
        sizes={sizes}
      />
    </ImageContainer>
    <h3>{project.name}</h3>
    <p>{project.description}</p>
  </ProjectContainer>
)
