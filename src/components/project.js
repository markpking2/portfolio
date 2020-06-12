import React, { useRef, useState, useLayoutEffect } from "react";
import styled from "styled-components";
import Img from "gatsby-image/withIEPolyfill";
import { LinkIcon, Github } from "../assets/icons";
import Carousel from "./carousel";

export default ({ sizes, project, touched, setTouched }) => {
    const ref = useRef();
    const [dimensions, setDimensions] = useState({});
    useLayoutEffect(() => {
        setDimensions(ref.current && ref.current.getBoundingClientRect());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref.current]);
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
                <Carousel
                    top={dimensions.height / 2 - 22}
                    left={55}
                    right={55}
                    touched={touched}
                    setTouched={setTouched}
                >
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
                <StyledSpan>
                    <strong>Tech Stack: </strong>
                </StyledSpan>
                <H4>{project.tech}</H4>
            </div>
            <P>
                <strong>Description: </strong>
                {project.description}
            </P>
            {project.frontend && (
                <RepoDiv>
                    <a href={project.frontend}>
                        <LinkSpan>
                            <strong>Front end repository</strong>
                        </LinkSpan>
                        <LinkSpan style={{ marginLeft: "0.5rem" }}>
                            <StyledGithub />
                        </LinkSpan>
                    </a>
                </RepoDiv>
            )}
            {project.backend && (
                <RepoDiv>
                    <a href={project.backend}>
                        <LinkSpan>
                            <strong>Back end repository</strong>
                        </LinkSpan>
                        <LinkSpan style={{ marginLeft: "0.5rem" }}>
                            <StyledGithub />
                        </LinkSpan>
                    </a>
                </RepoDiv>
            )}
        </ProjectContainer>
    );
};

const ProjectContainer = styled.div`
    width: 100%;
    margin: 1rem 0;
`;

const StyledImg = styled(Img)`
    margin: 0;
    min-width: ${({ maxWidth }) => maxWidth}%;
    max-height: 750px;
    padding: 0 0.3rem;
`;

const StyledLinkIcon = styled(LinkIcon)`
    display: inline;
    margin-left: 1rem;
    fill: ${(props) => props.theme.tertiary};
`;

const H4 = styled.h4`
    display: inline;
    margin: 0 !important;
    color: ${(props) => props.theme.primary};
`;

const P = styled.p`
    margin-bottom: 0.2rem;
    color: ${(props) => props.theme.primary};
`;

const ProjectLink = styled.a`
    text-decoration: none;
    background-image: none;

    h2 {
        display: inline;
        text-shadow: none;
        color: ${(props) => props.theme.tertiary};
    }

    &:hover {
        opacity: 0.5;
    }
`;

const StyledSpan = styled.span`
    color: ${(props) => props.theme.primary};
`;

const LinkSpan = styled.span`
    color: ${(props) => props.theme.tertiary};
    text-shadow: none;
`;

const RepoDiv = styled.div`
    display: flex;
    align-items: center;

    a {
        text-decoration: none;
        background-image: none;

        &:hover {
            opacity: 0.5;
            cursor: pointer;
        }
    }
`;

const StyledGithub = styled(Github)`
    fill: ${(props) => props.theme.primary};
`;
