import { Box, CircularProgress, Container, Typography } from "@mui/material";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const KakaoLoginOAuth = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("code");
  const token = localStorage.getItem("fcm_token");
  console.log(query);
  useEffect(() => {
    if (!query) {
      return;
    }
    if (!token) {
      return;
    }

    (async () => {
      try {
        const url = process.env.REACT_APP_API_URL + "/login/oauth2/code/kakao" + "?code=" + query + "&fcm=" + token;
        const response = await fetch(url, {
          method: "GET",
          // headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        if (response.status !== 200) {
          throw new Error("로그인에 실패하였습니다.");
        }
        const jsonData = await response.json();
        console.log(jsonData);
        document.location.href = "/";
      } catch (error) {
        alert("로그인에 실패하였습니다.");
        console.log(error);
        document.location.href = "/login";
      }
    })();
  }, [token, query]);
  return (
    <Container component="main" maxWidth="md">
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", pt: 20 }}>
        <CircularProgress />
        <Typography component="h1" variant="h5" sx={{ py: 3 }}>
          로그인 중입니다...
        </Typography>
      </Box>
    </Container>
  );
};

export default KakaoLoginOAuth;
