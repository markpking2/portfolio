import React from "react";
import "./src/styles/global.css";

export default ({ element, props }) => {
    return <div className='outerDiv'>{props.children}</div>;
};
