import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";

export default () => {
    const isActive = ({ isCurrent }) => {
        return isCurrent ? { className: "active" } : {};
    };
    return (
        <MenuWrapper className="menu-wrap">
            <input
                aria-label="Toggle hamburger menu"
                type="checkbox"
                className="toggler"
            />
            <div className="hamburger">
                <div></div>
            </div>
            <div className="menu">
                <div>
                    <div>
                        <ul>
                            <li>
                                <Link to="/" getProps={isActive}>
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link to="/projects/" getProps={isActive}>
                                    Projects
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact/" getProps={isActive}>
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </MenuWrapper>
    );
};

const MenuWrapper = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    z-index: 2;

    .toggler {
        position: absolute;
        top: 0;
        right: 0;
        z-index: 3;
        cursor: pointer;
        width: 60px;
        height: 60px;
        opacity: 0;

        &:checked {
            + .hamburger {
                > div {
                    &:before,
                    &:after {
                        top: 0;
                        transform: rotate(90deg);
                    }
                }
            }

            ~ .menu {
                visibility: visible;
                div {
                    transform: scale(1);
                    transition-duration: 0.75s;
                    div {
                        opacity: 1;
                        transition: opacity 0.4s ease 0.4s;
                    }
                }
            }
        }

        &:checked + .hamburger > div {
            transform: rotate(135deg);
        }

        &:checked:hover + .hamburger {
            div {
                transform: rotate(225deg);
            }
        }
    }

    .hamburger {
        position: absolute;
        top: 0;
        right: 0;
        z-index: 2;
        width: 60px;
        height: 60px;
        padding: 1rem;
        background: ${(props) => props.theme.tertiary};
        border-radius: 0px 0px 0px 5px;
        display: flex;
        align-items: center;
        justify-content: center;

        > div {
            position: relative;
            flex: none;
            width: 100%;
            height: 2px;
            background: rgb(24, 29, 51);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.4s ease;

            &:after,
            &:before {
                content: "";
                position: absolute;
                z-index: 2;
                top: -10px;
                width: 100%;
                height: 2px;
                background: inherit;
            }

            &:after {
                top: 10px;
            }
        }
    }

    .menu {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        visibility: hidden;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;

        > div {
            background: ${(props) => props.theme.hamburgerMenuBackground};
            border-radius: 25%;
            width: 200vw;
            height: 200vw;
            display: flex;
            flex: none;
            align-items: center;
            justify-content: center;
            transform: scale(0);
            transition: all 0.4s ease;

            div {
                text-align: center;
                max-width: 90vw;
                max-height: 100vh;
                opacity: 0;
                transition: opacity 0.4s ease;
                ul {
                    li {
                        list-style: none;
                        color: #fff;
                        font-size: 1.5rem;
                        padding: 1rem;
                        a {
                            color: ${(props) => props.theme.tertiary};
                            font-family: "Work Sans", sans-serif;
                            text-decoration: none;
                            background-image: none;
                            text-shadow: none;
                            transition: color 0.4s ease;
                            font-size: 1.5rem;

                            &:hover {
                                opacity: 0.5;
                                cursor: pointer;
                            }
                        }
                        .active {
                            font-size: 1.8rem;
                            color: ${(props) => props.theme.primary};
                            background: none;
                            text-shadow: none;
                            pointer-events: none;

                            &:hover {
                                opacity: 1;
                            }
                        }
                    }
                }
            }
        }
    }

    @media only screen and (min-width: 451px) {
        display: none;
    }
`;
