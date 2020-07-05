import React from "react";
import Loadable from "@loadable/component";
import "react-gif-player/dist/gifplayer.css";
import { Lighthouse } from "../assets/icons";
import styled from "styled-components";

import {
    H4,
    LinkDiv,
    LinkSpan,
    P,
    ProjectContainer,
    StyledGithub,
    StyledSpan,
} from "../styles/project";

export default ({ gif, still }) => {
    const LoadableGifPlayer = Loadable(() => import("react-gif-player"));

    return (
        <ProjectContainer>
            <h2>This Website</h2>

            <StyledGifWrapper>
                <LoadableGifPlayer
                    gif={gif}
                    still={still}
                    autoplay={false}
                    style={{ padding: 0 }}
                    alt="This website's Lighthouse scores"
                />
            </StyledGifWrapper>
            <div>
                <StyledSpan>
                    <strong>Tech Stack: </strong>
                </StyledSpan>
                <H4>Gatsby, AWS S3, AWS CloudFront, AWS Lambda</H4>
            </div>
            <P>
                <strong>Description: </strong>
                This website was developed using GatsbyJS; an awesome framework
                based on React used to build progessive web apps!
            </P>

            <LinkDiv>
                <a href="https://www.mark.codes/lighthouse/">
                    <LinkSpan>Audited with Google Lighthouse</LinkSpan>
                    <LinkSpan style={{ marginLeft: "0.5rem" }}>
                        <Lighthouse />
                    </LinkSpan>
                </a>
            </LinkDiv>
            <LinkDiv>
                <a href="https://github.com/markpkng/portfolio">
                    <LinkSpan>
                        <strong>GitHub repository</strong>
                    </LinkSpan>
                    <LinkSpan style={{ marginLeft: "0.5rem" }}>
                        <StyledGithub />
                    </LinkSpan>
                </a>
            </LinkDiv>
        </ProjectContainer>
    );
};

const StyledGifWrapper = styled.div`
    border-radius: 10px;
    box-shadow: 0px 0px 40px 5px ${(props) => props.theme.tertiary};
    padding: 0.25rem;
    margin: 1.75rem 0;

    img {
        margin: 0;
    }
`;
