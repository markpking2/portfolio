import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "../assets/icons";
import styled from "styled-components";
export default function Carousel({ left, right, top, children }) {
    const [xAxis, setXAxis] = useState(0);
    const unorderedListEl = useRef(null);

    return (
        <CarouselContainer>
            <Button
                lb={true}
                unOrderedListRef={unorderedListEl}
                xAxis={xAxis}
                setXAxis={setXAxis}
                top={top}
                left={left}
                right={right}
            />
            <StyledUl ref={unorderedListEl}>{children}</StyledUl>
            <Button
                lb={false}
                unOrderedListRef={unorderedListEl}
                xAxis={xAxis}
                setXAxis={setXAxis}
                top={top}
                left={left}
                right={right}
            />
        </CarouselContainer>
    );
}

function Button({ unOrderedListRef, xAxis, setXAxis, top, left, right, lb }) {
    const [show, setShow] = useState(false);
    const buttonEl = useRef(null);

    useEffect(() => {
        function showButtons() {
            if (lb) {
                setShow(xAxis > 0);
            } else {
                const sW = unOrderedListRef.current.scrollWidth;
                const cW = unOrderedListRef.current.clientWidth;

                setShow(xAxis < sW - cW);
            }
        }

        if (!window.matchMedia("(pointer: coarse)").matches) {
            showButtons();
        }
    }, [xAxis]);

    function scroll() {
        const sW = unOrderedListRef.current.scrollWidth;
        const cW = unOrderedListRef.current.clientWidth;
        const chW = sW / unOrderedListRef.current.childElementCount;
        const scrollDirection = lb ? -1 : 1;
        const scrollXAxis = Math.ceil(cW / 2 / chW) * chW * scrollDirection;
        const nextXAxis = xAxis + scrollXAxis;

        unOrderedListRef.current.scrollTo({
            top: 0,
            left: nextXAxis,
            behavior: "smooth",
        });

        setXAxis(nextXAxis);
    }

    function blur() {
        buttonEl.current.blur();
    }

    return (
        show && (
            <StyledButton
                ref={buttonEl}
                onClick={scroll}
                onPointerUp={blur}
                style={{
                    ...(lb ? { left: `-${left}px` } : { right: `-${right}px` }),
                    ...{ top: `${top}px` },
                }}
            >
                {lb ? (
                    <ArrowLeft fill='#1f2833' />
                ) : (
                    <ArrowRight fill='#1f2833' />
                )}
            </StyledButton>
        )
    );
}

const CarouselContainer = styled.div`
    position: relative;
    margin-bottom: 1rem;
`;

const StyledButton = styled.button`
    background-color: #66fcf1;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    border-color: transparent;
    border-radius: 50%;
    border-style: solid;
    border-width: 0.2rem;
    box-shadow: rgba(31, 40, 51, 0.15) 0 0.1rem 0.1rem 0.1rem;
    height: 2.2rem;
    width: 2.2rem;
    z-index: 99;

    &:focus {
        border-color: rgba(29, 29, 29);
        box-shadow: rgba(0, 0, 0, 0.5) 0 0 0 0.1rem,
            rgba(29, 29, 29, 0.7) 0 0 0 0.5rem;
        outline: none;
        transition: box-shadow 0.2s ease 0s;
    }

    &:hover {
        opacity: 0.5;
        cursor: pointer;
    }
`;

const StyledUl = styled.ul`
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    text-align: center;
    margin: 0;
    padding: 0;
    scrollbar-width: none;
    -ms-overflow-style: none;
    -webkit-overflow-scrolling: touch;

    &::-webkit-scrollbar {
        display: none;
    }
`;
