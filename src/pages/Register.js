import { useEffect } from "react";
import { Container, CssBaseline, Avatar, Typography, TextField, FormControlLabel, Grid, Checkbox, Button, Box, Link } from "@mui/material";
import MuiPhoneNumber from "material-ui-phone-number-2";
import { LockOutlined } from "@mui/icons-material";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    event.preventDefault();
    // get data
    const data = new FormData(e.target);
    const username = data.get("name");
    const email = data.get("email");
    const password = data.get("password");
    const phone_number = data.get("phone").replace(/^\+82|\s/g, "");
    const age = data.get("age");
    const weight = data.get("weight");
    // Check email duplicated
    try {
      const response = await fetch(process.env.REACT_APP_API_URL + "/users/email/check-duplicate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
        }),
      });
      if (response.status !== 200) {
        throw new Error("회원가입에 실패하였습니다.");
      }
      const jsonData = await response.json();
      if (jsonData.status === 2000) {
        alert("이미 존재하는 이메일입니다.");
        return;
      }
    } catch (error) {
      alert("회원가입에 실패하였습니다.");
      return;
    }

    // Do signup
    try {
      const response = await fetch(process.env.REACT_APP_API_URL + "/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          phone_number,
          age,
          weight,
        }),
      });
      if (response.status !== 200) {
        throw new Error("회원가입에 실패하였습니다.");
      }
      const jsonData = await response.json();
      if (jsonData.status === 2016) {
        alert("회원가입에 성공하였습니다.");
        navigate("/login");
        return;
      }
    } catch (error) {
      alert("회원가입에 실패하였습니다.");
      return;
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Typography component="h1" variant="h5" sx={{ py: 3 }}>
        회원 가입
      </Typography>
      <form noValidate method="post" onSubmit={onSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="span" sx={{ my: 2 }}>
              따릉이 시스템에 오신 것을 환영합니다!
              <br />
              아래 정보를 입력해주세요.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField autoComplete="fname" name="name" variant="outlined" required fullWidth id="firstName" label="이름" autoFocus />
          </Grid>
          <Grid item xs={12}>
            <TextField variant="outlined" required fullWidth id="email" label="이메일" name="email" autoComplete="email" />
          </Grid>
          <Grid item xs={12}>
            <TextField variant="outlined" required fullWidth id="password" label="비밀번호" name="password" type="password" autoComplete="password" />
          </Grid>

          <Grid item xs={12}>
            <MuiPhoneNumber
              defaultCountry={"kr"}
              onlyCountries={["kr"]}
              variant="outlined"
              required
              fullWidth
              id="phone"
              label="전화번호"
              name="phone"
              autoComplete="phone"
              disableAreaCodes={true}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField variant="outlined" required fullWidth id="age" label="나이" name="age" autoComplete="age" />
          </Grid>
          <Grid item xs={6}>
            <TextField variant="outlined" required fullWidth id="weight" label="무게" name="weight" autoComplete="weight" />
          </Grid>
        </Grid>
        <Button type="submit" fullWidth variant="contained" color="primary" onSubmit={onSubmit} sx={{ mt: 3, mb: 2 }}>
          회원 가입
        </Button>
        <Grid container justify="flex-end">
          <Grid item sx={{ py: 1 }}>
            <Link component={RouterLink} to="/login" variant="body2" style={{ textDecoration: "none" }}>
              계정이 이미 존재하나요? 로그인
            </Link>
          </Grid>
        </Grid>
      </form>
      <Box mt={5}>{/* <MadeWithLove /> */}</Box>
    </Container>
  );
};

export default Register;
