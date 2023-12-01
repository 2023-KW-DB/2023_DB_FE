import {
  Container,
  CssBaseline,
  Typography,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Link,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const PasswordFind = () => {
  const navigate = useNavigate();
  const [isSendAuthCode, setIsSendAuthCode] = useState(false);
  const [isNowLoading, setIsNowLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [authcode, setAuthcode] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitAuthCode = async (e) => {
    setIsNowLoading(true);
    (async () => {
      // Do login
      try {
        const response = await fetch(
          process.env.REACT_APP_API_URL + "/users/send-authcode",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email,
            }),
            credentials: "include",
          },
        );
        if (response.status !== 200) {
          throw new Error("이메일 전송에 실패하였습니다.");
        }
        const jsonData = await response.json();
        alert("이메일 전송을 성공하였습니다.");
        setIsSendAuthCode(true);
        setIsNowLoading((prev) => !prev);
      } catch (error) {
        console.log(error);
        alert("이메일 전송에 실패하였습니다.");
        setIsNowLoading((prev) => !prev);
        return;
      }
    })();
  };

  const onSubmitPasswordChange = () => {
    (async () => {
      // Do login
      try {
        const response = await fetch(
          process.env.REACT_APP_API_URL + "/users/check-authcode",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email,
              auth_num: authcode,
            }),
            credentials: "include",
          },
        );
        if (response.status !== 200) {
          throw new Error("인증번호 검사에 실패하였습니다.");
        }
        const jsonData = await response.json();

        if (jsonData.status != 2005) {
          throw new Error("인증번호 검사에 실패하였습니다.");
        }

        const response2 = await fetch(
          process.env.REACT_APP_API_URL + "/users/change-password",
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email,
              password,
            }),
            credentials: "include",
          },
        );
        if (response2.status !== 200) {
          throw new Error("비밀번호 변경에 실패하였습니다.");
        }
        const jsonData2 = await response2.json();
        alert("비밀번호 변경을 성공하였습니다.");
        navigate("/login");
      } catch (error) {
        console.log(error);
        alert("비밀번호 변경에 실패하였습니다. - " + error);
        setIsNowLoading(false);
        return;
      }
    })();
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Typography component="h1" variant="h5" sx={{ pt: 3 }}>
        비밀번호 찾기
      </Typography>
      <Grid container spacing={2} sx={{ py: 3 }}>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="email"
            label="이메일"
            name="email"
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
      </Grid>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={onSubmitAuthCode}
      >
        인증번호 보내기
      </Button>

      {isSendAuthCode && (
        <>
          <Grid container spacing={2} sx={{ py: 3 }}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="authcode"
                label="인증번호"
                name="authcode"
                onChange={(e) => setAuthcode(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="password"
                label="변경할 비밀번호"
                name="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={onSubmitPasswordChange}
          >
            비밀번호 변경하기
          </Button>
        </>
      )}

      {isNowLoading && (
        <>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              alignItems: "center",
              zIndex: 9900,
              backgroundColor: "black",
              opacity: 0.7,
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <h1 style={{ color: "white" }}>이메일을 보내는 중입니다.</h1>
            <CircularProgress />
          </div>
        </>
      )}
    </Container>
  );
};

export default PasswordFind;
