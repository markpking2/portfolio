const { colorIndex } = JSON.parse(
    window.localStorage.getItem("mark.codes.color")
);

const theme = {
    colorIndex: colorIndex ? colorIndex : 0,
    colors: [
        "rgb(102, 252, 241)", //blue
        "rgb(255, 161, 250)", //pink
        "rgb(104, 255, 58)", //green
        "rgb(255, 137, 34)", //orange
        "rgb(164, 149, 255)", //purple
        "rgb(255, 249, 76)", //yellow
    ],
    primary: "rgb(255, 255, 255)",
    secondary: "rgb(25, 25, 25)",
    tertiary: "rgb(255, 161, 250)",
    hamburgerMenuBackground: "rgba(29, 29, 29, 0.8)",
    error: "red",
    linkedin: "rgb(41, 141, 255)",
    resume: "rgb(247, 8, 0)",
};

export { theme };
