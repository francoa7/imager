import { extendTheme } from "@chakra-ui/react";
import "@fontsource/akshar";
import "@fontsource/asap";

const theme = extendTheme({
    colors: {
        primary: "#27d9c4",
        primaryDark: "#0f7367",
        skobeloff: "#21665E",
        verdigris: "#61B8AE",
        pine: "#559E96",
    },
    fonts: {
        heading: "Open Sans, sans-serif",
        body: "Raleway, sans-serif",
        akshar: "Akshar, sans-serif;",
        asap: "Asap, sans-serif",
    },
});

export default theme;
