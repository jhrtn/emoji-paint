import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`  
  body {
    background-color: ${(props) => props.theme.colors.bg};
    text-rendering: optimizeSpeed;
    line-height: 1.0;
    /* font-family: 'EB Garamond', serif; */
    font-family: sans-serif;

    span {
      line-height: normal;
    }

    p {
      margin-bottom: 1rem;
    }

    p, input, textarea, label, td, tr {
      font-size: 1.125rem;
      color: ${(props) => props.theme.colors.fg};
    }

    a {
      cursor: pointer;
      color: ${(props) => props.theme.colors.fg};
    }
  }

  /* Box sizing rules */
*,
*::before,
*::after {
  box-sizing: border-box;
}

/* Remove default margin */
body,
h1,
h2,
h3,
h4,
p,
figure,
blockquote,
dl,
dd {
  margin: 0;
}

/* Remove list styles on ul, ol elements with a list role, which suggests default styling will be removed */
ul[role='list'],
ol[role='list'] {
  list-style: none;
}

/* Set core root defaults */
html:focus-within {
  scroll-behavior: smooth;
}

/* Set core body defaults */
html, body, #root {
  height: 100%;
  
}

/* A elements that don't have a class get default styles */
a:not([class]) {
  text-decoration-skip-ink: auto;
}

/* Make images easier to work with */
img,
picture {
  max-width: 100%;
  display: block;
}

/* Inherit fonts for inputs and buttons */
input,
button,
textarea,
select {
  font: inherit;
}

`;

export default GlobalStyle;
