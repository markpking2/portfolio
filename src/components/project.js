import React, { useRef, useState, useLayoutEffect } from "react";
import Carousel from "./carousel";

import {
    H4,
    LinkDiv,
    LinkSpan,
    P,
    ProjectContainer,
    StyledGithub,
    StyledImg,
    StyledLi,
    StyledLinkIcon,
    StyledSpan,
} from "../styles/project";

export default ({
    sizes,
    project,
    touched,
    setTouched,
    setViewedImage,
    staticImages,
}) => {
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
                            <div
                                role="button"
                                onClick={() => {
                                    setViewedImage(
                                        staticImages[i]?.node?.childImageSharp
                                            .fluid
                                    );
                                }}
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    e.preventDefault();
                                    setViewedImage(null);
                                }}
                                key={i}
                            >
                                <StyledImg
                                    title={project.name}
                                    alt="Screenshot of project"
                                    fluid={size}
                                    frequency={project.frequency}
                                    objectFit="contain"
                                    width={dimensions.width}
                                />
                            </div>
                        );
                    })}
                </Carousel>
            </div>
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
            {project.bullets.length && (
                <div>
                    <StyledSpan>
                        <strong>Responsibilities: </strong>
                    </StyledSpan>

                    <ul>
                        {project.bullets.map((bullet) => (
                            <StyledLi>{bullet}</StyledLi>
                        ))}
                    </ul>
                </div>
            )}
        </ProjectContainer>
    );
};
