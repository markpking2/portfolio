import React, { useEffect, useState } from "react";
import styled from "styled-components";

export default ({ text }) => {
    const [typed, setTyped] = useState("");

    useEffect(() => {
        let cancelled = false;

        if (!cancelled) {
            if (typed.length < text.length) {
                (async () => {
                    await typeWriter(text);
                })();
            }
        }

        return () => {
            cancelled = true;
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
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
            }, 250);
        });
    }

    return (
        <div>
            <Typewriter>
                <StyledH3>{typed}</StyledH3>
            </Typewriter>
        </div>
    );
};

const Typewriter = styled.div`
    display: inline-block;
    overflow: hidden; /* Ensures the content is not revealed until the animation */
    border-right: 0.2em solid ${(props) => props.theme.primary}; /* The typewriter cursor */
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
            border-color: ${(props) => props.theme.primary};
        }
    }
`;

const StyledH3 = styled.h3`
    margin-top: 0;
    color: white;
    display: inline;
    color: ${(props) => props.theme.primary};
`;
