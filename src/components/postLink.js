import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";

export default ({ post }) => (
    <div>
        <StyledLink to={post.frontmatter.slug}>
            {post.frontmatter.title}{" "}
            <DateSpan>({post.frontmatter.date})</DateSpan>
        </StyledLink>
    </div>
);

const StyledLink = styled(Link)`
    display: block;
    text-shadow: none;
    text-decoration: none;
    font-family: "Work Sans", sans-serif;
    background-image: none;
    margin: 1rem 0;
    color: ${(props) => props.theme.tertiary};
    &:hover {
        opacity: 0.6;
    }
`;

const DateSpan = styled.span`
    display: block;
    color: white;
`;
