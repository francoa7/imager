import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { Provider } from "react-redux";
import { store } from "./redux/store";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <BrowserRouter>
                <Auth0Provider
                    domain="dev-uu7cywer.us.auth0.com"
                    clientId="SxXh3D1tHfubPufJ3y8n8hCUku9lGPhM"
                    redirectUri={`${window.location.origin}/home`}
                >
                    <Provider store={store}>
                        <App />
                    </Provider>
                </Auth0Provider>
            </BrowserRouter>
        </ChakraProvider>
    </React.StrictMode>
);
