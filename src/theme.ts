import { extendTheme } from "@chakra-ui/react";
import "@fontsource/akshar";
import "@fontsource/asap";
import "@fontsource/raleway";

const theme = extendTheme({
    colors: {
        primary: "#27d9c4",
        primaryLight: "#53E2D2",
        primaryDark: "#0f7367",
        primarySky: "#DEF5F2",
        skobeloff: "#21665E",
        verdigris: "#61B8AE",
        pine: "#559E96",
        pink: "#f56565",
    },
    fonts: {
        heading: "Open Sans, sans-serif",
        raleway: "Raleway, sans-serif",
        akshar: "Akshar, sans-serif;",
        asap: "Asap, sans-serif",
    },
});

export default theme;
