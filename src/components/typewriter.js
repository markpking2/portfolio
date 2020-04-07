import React, { useEffect, useState } from "react";
import styled from "styled-components";

export default ({ text }) => {
    const [typed, setTyped] = useState("");

    useEffect(() => {
        if (typed.length < text.length) {
            (async () => {
                await typeWriter(text);
            })();
        }
    }, []);

    async function typeWriter(string) {
        if (string.length === 0) {
            return "done";
        }

        setTyped((t) => t.concat(string[0]));

        return await new Promise((resolve) => {
            setTimeout(async () => {
                await typeWriter(string.slice(1));
                return resolve();
            }, 300);
        });
    }

    return (
        <TypewriterContainer length={text.length}>
            <Typewriter length={typed.length}>
                <h2>{typed}</h2>
            </Typewriter>
        </TypewriterContainer>
    );
};

const TypewriterContainer = styled.div`
    width: ${({ length }) => length}rem;
`;

const Typewriter = styled.div`
    display: inline-block;
    overflow: hidden; /* Ensures the content is not revealed until the animation */
    border-right: 0.2em solid rgba(255, 255, 255, 0.9); /* The typewriter cursor */
    white-space: nowrap; /* Keeps the content on a single line */
    margin: 0 auto; /* Gives that scrolling effect as the typing happens */
    animation: blinker 1.25s step-end infinite;

    /* The typewriter cursor effect */
    @keyframes blinker {
        from,
        to {
            border-color: transparent;
        }
        50% {
            border-color: rgba(255, 255, 255, 0.9);
        }
    }
`;
