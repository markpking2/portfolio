import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Touch } from "../assets/icons";
import styled from "styled-components";
import "../styles/carousel.css";
export default function Carousel({
    left,
    right,
    top,
    children,
    touched,
    setTouched,
}) {
    const [xAxis, setXAxis] = useState(0);
    const unorderedListEl = useRef(null);

    return (
        <CarouselContainer onTouchStart={() => setTouched(true)}>
            <Button
                lb={true}
                unOrderedListRef={unorderedListEl}
                xAxis={xAxis}
                setXAxis={setXAxis}
                top={top}
                left={left}
                right={right}
                touched={touched}
                setTouched={setTouched}
            />
            <SwipeContainer>
                <StyledTouch
                    className={touched ? "touched" : "untouched"}
                    style={{
                        minWidth: "30%",
                        height: "50%",
                        maxHeight: "200px",
                        zIndex: 0,
                    }}
                />
            </SwipeContainer>

            <StyledUl ref={unorderedListEl} opacity={touched ? 1 : 0.1}>
                {children}
            </StyledUl>

            <Button
                lb={false}
                unOrderedListRef={unorderedListEl}
                xAxis={xAxis}
                setXAxis={setXAxis}
                top={top}
                left={left}
                right={right}
                touched={touched}
                setTouched={setTouched}
            />
        </CarouselContainer>
    );
}

function Button({
    unOrderedListRef,
    xAxis,
    setXAxis,
    top,
    left,
    right,
    lb,
    setTouched,
}) {
    const [show, setShow] = useState(false);
    const buttonEl = useRef(null);

    useEffect(() => {
        function showButtons() {
            if (lb) {
                setShow(xAxis > 0);
            } else {
                const sW = unOrderedListRef.current.scrollWidth;
                const cW = unOrderedListRef.current.clientWidth;
                setShow(xAxis === 0 || xAxis < sW - cW);
            }
        }

        if (!window.matchMedia("(pointer: coarse)").matches) {
            showButtons();
            setTouched(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                aria-label={
                    left ? "Left carousel button" : "Right carousel button"
                }
                ref={buttonEl}
                onClick={scroll}
                onPointerUp={blur}
                style={{
                    ...(lb ? { left: `-${left}px` } : { right: `-${right}px` }),
                    ...{ top: `${top}px` },
                }}
            >
                {lb ? <StyledArrowLeft /> : <StyledArrowRight />}
            </StyledButton>
        )
    );
}

const CarouselContainer = styled.div`
    position: relative;
    margin-bottom: 1rem;
`;

const StyledButton = styled.button`
    background-color: ${(props) => props.theme.tertiary};
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
    z-index: 0;

    &:focus {
        border-color: ${(props) => props.theme.primary};
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

const StyledUl = styled.div`
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    text-align: center;
    margin: 0;
    padding: 0;
    scrollbar-width: none;
    -ms-overflow-style: none;
    -webkit-overflow-scrolling: touch;
    opacity: ${(props) => props.opacity};
    top: 0px;

    &::-webkit-scrollbar {
        display: none;
    }
`;

const SwipeContainer = styled.div`
    pointer-events: none;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    z-index: 1;

    span {
        margin-top: 1rem;
        font-size: 1.5rem;
        color: ${(props) => props.theme.primary};
    }
`;

const StyledTouch = styled(Touch)`
    fill: ${(props) => props.theme.primary};
`;

const StyledArrowLeft = styled(ArrowLeft)`
    fill: ${(props) => props.theme.secondary};
`;

const StyledArrowRight = styled(ArrowRight)`
    fill: ${(props) => props.theme.secondary};
`;
