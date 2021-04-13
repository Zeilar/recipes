import { createGlobalStyle } from "styled-components";
import './fonts.css';

export const GlobalStyles = createGlobalStyle`
    *,
    *::before,
    *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        list-style: none;
    }

    body {
        font-family: Roboto;
    }
`;
