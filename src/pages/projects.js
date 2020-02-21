import React from "react"
import Layout from "../components/layout"
import Typewriter from "../components/typewriter"
import styled from "styled-components"
import Project from "../components/project"
import projectList from "../data/projects.json"

const arr = [1, 2, 3, 4, 5, 6, 7, 8]

export default ({ data }) => {
  const { edges: projectImages } = data.ProjectImages
  console.log(projectImages)
  return (
    <Layout>
      <Typewriter text="projects" />
      <p>
        I’m good enough, I’m smart enough, and gosh darn it, people like me!
      </p>
      {projectList &&
        projectList.map(project => {
          const image = projectImages.find(n => {
            console.log(n.node.relativePath, project.image)

            return n.node.relativePath === project.image
          })
          return (
            <Project
              key={project.name}
              sizes={image.node.childImageSharp.sizes}
              project={project}
            />
          )
        })}
    </Layout>
  )
}

export const query = graphql`
  query projectImages {
    ProjectImages: allFile(
      sort: { order: ASC, fields: [absolutePath] }
      filter: { relativePath: { regex: "/.*.webp/" } }
    ) {
      edges {
        node {
          relativePath
          name
          childImageSharp {
            sizes(maxWidth: 650) {
              ...GatsbyImageSharpSizes
            }
          }
        }
      }
    }
  }
`
