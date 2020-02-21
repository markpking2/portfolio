import React from "react"
import styled from "styled-components"

export default ({ text }) => (
  <Typewriter length={text.length}>
    <h1>{text}</h1>
  </Typewriter>
)

const Typewriter = styled.div`
  width: ${({ length }) => length}.5rem;
  max-width: ${({ length }) => length}.5rem;
  display: inline-block;
  overflow: hidden; /* Ensures the content is not revealed until the animation */
  border-right: 0.2em solid hsla(0, 0%, 0%, 0.9); /* The typwriter cursor */
  white-space: nowrap; /* Keeps the content on a single line */
  margin: 0 auto; /* Gives that scrolling effect as the typing happens */
  animation: typing 3s steps(35, start), blinker 1.25s step-end infinite;

  @keyframes typing {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }

  /* The typewriter cursor effect */
  @keyframes blinker {
    from,
    to {
      border-color: transparent;
    }
    50% {
      border-color: hsla(0, 0%, 0%, 0.9);
    }
  }
`
