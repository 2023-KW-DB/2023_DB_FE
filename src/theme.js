import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
    // background: {
    //   default: "#303030",
    //   paper: "#424240",
    // },
  },
  typography: {
    fontFamily: "'Noto Sans KR', sans-serif;",
    h3: {
      fontSize: "2rem",
    },
    h1: {
      fontSize: "3rem",
    },
    h2: {
      fontSize: "2.7rem",
    },
    h4: {
      fontSize: "1.7rem",
    },
  },
});

export default theme;
