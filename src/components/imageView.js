import React from "react";
import Img from "gatsby-image/withIEPolyfill";
import styled from "styled-components";

export default function ImageView({ image, setViewedImage }) {
    return (
        <OuterContainer onClick={() => setViewedImage(null)}>
            <ImageWrapper role="figure">
                <StyledImg objectFit="contain" fluid={image} />
            </ImageWrapper>
        </OuterContainer>
    );
}

const OuterContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 5;
    background: rgba(0, 0, 0, 0.7);
`;

const ImageWrapper = styled.div`
    position: relative;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    padding-top: 1rem;
    margin: 0 auto 0 auto;
    width: 90%;

    cursor: zoom-out;
`;

const StyledImg = styled(Img)`
    max-height: 90vh;
`;
