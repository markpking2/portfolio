import styled from "styled-components";
import Img from "gatsby-image/withIEPolyfill";
import { LinkIcon, Github } from "../assets/icons";

const CarouselWrapper = styled.div`
    border-radius: 10px;
    box-shadow: 0px 0px 20px 2px ${(props) => props.theme.tertiary};
    margin: 1.75rem 0;
    padding: 0 0.2rem;
`;

const H4 = styled.h4`
    display: inline;
    margin: 0 !important;
    color: ${(props) => props.theme.primary};
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

const LinkSpan = styled.span`
    font-size: 1.2rem;
    color: ${(props) => props.theme.tertiary};
    text-shadow: none;
`;

const P = styled.p`
    margin-bottom: 0.2rem;
    color: ${(props) => props.theme.primary};
`;

const ProjectContainer = styled.div`
    width: 100%;
    margin: 1rem 0;
`;

const StyledGithub = styled(Github)`
    fill: ${(props) => props.theme.primary};
`;

const StyledImg = styled(Img)`
    margin: 0;
    width: ${({ width, frequency }) => width / frequency}px;
    min-width: ${({ maxWidth }) => maxWidth}px;
    max-height: 750px;
    padding: 0.3rem 0;
    cursor: zoom-in;
`;

const StyledLi = styled.li`
    color: white;
`;

const StyledLinkIcon = styled(LinkIcon)`
    display: inline;
    margin-left: 0.5rem;
    fill: white;
`;

const StyledSpan = styled.span`
    color: ${(props) => props.theme.primary};
`;

export {
    CarouselWrapper,
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
};
