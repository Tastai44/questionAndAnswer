import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { SnackbarProvider } from "notistack";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { themeApp } from "./utils/Theme.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <ThemeProvider theme={themeApp}>
        <React.StrictMode>
            <BrowserRouter>
                <SnackbarProvider>
                    <App />
                </SnackbarProvider>
            </BrowserRouter>
        </React.StrictMode>
    </ThemeProvider>
);
