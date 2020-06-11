import React from "react";
import resume from "../assets/Mark_King_Resume.pdf";

export default () => {
    if (typeof window !== "undefined") {
        window.location.replace(resume);
    }
    return <></>;
};
