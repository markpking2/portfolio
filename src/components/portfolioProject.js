import React from "react";
import Loadable from "@loadable/component";
import "react-gif-player/dist/gifplayer.css";

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
            <LoadableGifPlayer
                gif={gif}
                still={still}
                autoplay={false}
                alt="This website's Lighthouse scores"
            />
            <div>
                <StyledSpan>
                    <strong>Tech Stack: </strong>
                </StyledSpan>
                <H4>Gatsby, AWS S3, AWS CloudFront, AWS Lambda</H4>
            </div>
            <P>
                <strong>Description: </strong>
                This website was developed using Gatsby; an awesome framework
                based on React used to build progessive web apps!
            </P>
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
