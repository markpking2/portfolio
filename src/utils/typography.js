import Typography from "typography";
import fairyGateTheme from "typography-theme-fairy-gates";

const typography = new Typography({
    ...fairyGateTheme,
    omitGoogleFont: true,
    googleFonts: [],
});
console.log(typography);

export const { scale, rhythm, options } = typography;
export default typography;
