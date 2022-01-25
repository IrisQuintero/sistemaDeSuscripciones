// Declaramos los estilos globales

import { createGlobalStyle } from 'styled-components';
// Reseteamos los estilos que vienen por default
import { reset } from 'styled-reset';

const GlobalStyle = createGlobalStyle`
    ${reset}// Reseteamos los estilos que vienen por default

    body {
        background-color: black;
        color: white;
        font-family: 'Roboto', sans-serif;
    }

`


export default function App({ Component, pageProps }) {
    return (
        <>
            <GlobalStyle />
            <Component {...pageProps} />
        </>
    )
}
