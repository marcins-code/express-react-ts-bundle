import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
*, *::before, *::after {
    box-sizing:border-box;
    margin:0;
    padding:0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;   
}

html {
    font-size:62.5%;
    scrollbar-color: #46495d #282A35;
    scrollbar-width: thin;
}
body{

font-family: "Roboto", sans-serif !important;
font-size: 1.6rem;
font-weight: normal;
}

h1,h2,h3, h4, h5, h6 {
    font-family: "Roboto", sans-serif;
    font-weight: normal;
}

p{font-family: "Roboto", sans-serif; font-size:1.75rem; line-height:2.5rem}

h1 { font-size: 3.5rem }
h2 { font-size: 3rem }
h3 { font-size: 2.5rem }
h4 { font-size: 2rem }
h5 { font-size: 1.5rem }
h6 { font-size: 1.2rem }

h1,h2 {margin-bottom:15px;}
h3,h4 {margin-bottom:10px;}

body::-webkit-scrollbar {
  width: 12px;               /* width of the entire scrollbar */
}

body::-webkit-scrollbar-track {
  background: #46495d;        /* color of the tracking area */
}

body::-webkit-scrollbar-thumb {
  background-color: #282A35;    /* color of the scroll thumb */
  border-radius: 100px;       /* roundness of the scroll thumb */
  border: 3px solid #3A3D4D;  /* creates padding around scroll thumb */
}

.fadeIn{
  animation: fadein 700ms;
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
}
`;

export default GlobalStyle;
