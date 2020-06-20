import React, { useRef, useState, useLayoutEffect } from "react";
import styled from "styled-components";
import Img from "gatsby-image/withIEPolyfill";
import { LinkIcon, Github } from "../assets/icons";
import Carousel from "./carousel";

export default ({ sizes, project, touched, setTouched, staticImages }) => {
    const ref = useRef();
    const [dimensions, setDimensions] = useState({});
    useLayoutEffect(() => {
        setDimensions(ref.current && ref.current.getBoundingClientRect());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref.current]);

    return (
        <ProjectContainer>
            <h2>{project.name}</h2>
            <div ref={ref}>
                <Carousel
                    top={dimensions.height / 2 - 22}
                    left={55}
                    right={55}
                    touched={touched}
                    setTouched={setTouched}
                >
                    {sizes.map((size, i) => {
                        return (
                            <div key={i}>
                                <a
                                    href={`${staticImages[i].url}`}
                                    target="blank"
                                >
                                    <StyledImg
                                        title={project.name}
                                        alt="Screenshot of project"
                                        sizes={size}
                                        frequency={project.frequency}
                                        objectFit="contain"
                                        width={dimensions.width}
                                    />
                                </a>
                            </div>
                        );
                    })}
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
            {project.demo && (
                <LinkDiv>
                    <a href={project.demo}>
                        <LinkSpan>
                            <strong>Live Demo</strong>
                        </LinkSpan>
                        <LinkSpan>
                            <StyledLinkIcon />
                        </LinkSpan>
                    </a>
                </LinkDiv>
            )}
            {project.frontend && (
                <LinkDiv>
                    <a href={project.frontend}>
                        <LinkSpan>
                            <strong>Frontend repository</strong>
                        </LinkSpan>
                        <LinkSpan style={{ marginLeft: "0.5rem" }}>
                            <StyledGithub />
                        </LinkSpan>
                    </a>
                </LinkDiv>
            )}
            {project.backend && (
                <LinkDiv>
                    <a href={project.backend}>
                        <LinkSpan>
                            <strong>Backend repository</strong>
                        </LinkSpan>
                        <LinkSpan style={{ marginLeft: "0.5rem" }}>
                            <StyledGithub />
                        </LinkSpan>
                    </a>
                </LinkDiv>
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
    width: ${({ width, frequency }) => width / frequency}px;
    min-width: ${({ maxWidth }) => maxWidth}px;
    max-height: 750px;
    padding: 0 0.3rem;
`;

const StyledLinkIcon = styled(LinkIcon)`
    display: inline;
    margin-left: 0.5rem;
    fill: white;
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

const StyledSpan = styled.span`
    color: ${(props) => props.theme.primary};
`;

const LinkSpan = styled.span`
    font-size: 1.2rem;
    color: ${(props) => props.theme.tertiary};
    text-shadow: none;
`;

const LinkDiv = styled.div`
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
