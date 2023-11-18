import { 
  Container,
  CssBaseline,
  Typography,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Link
} from "@mui/material";
import { useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    event.preventDefault();
    // get data
    const data = new FormData(e.target);
    const email = data.get("email");
    const password = data.get("password");
    // Do login
    try {
      const response = await fetch(process.env.REACT_APP_API_URL + "/users/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({
          email, password
        }),
        credentials: "include"
      });
      if (response.status !== 200) {
        throw new Error("로그인에 실패하였습니다.");
      }
      // Get set-cookie header and set cookie
      alert("로그인에 성공하였습니다.");
      document.location.href = "/";
    } catch (error) {
      console.log(error)
      alert("로그인에 실패하였습니다.");
      return;
    }
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Typography component="h1" variant="h5" sx={{py: 3}}>
        로그인
      </Typography>
      <form noValidate method="post" onSubmit={onSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="이메일"
              name="email"
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label="비밀번호"
              type="password"
              id="password"
              autoComplete="current-password"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={<Checkbox value="MaintainLogin" color="primary" />}
              label="로그인 상태 유지"
            />
          </Grid>          
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          로그인하기
        </Button>        

        <Button
          type="button"
          variant="text"
          color="primary"
        >
          <Link component={RouterLink} to="/register" variant="text" style={{ textDecoration: 'none' }}>
              회원가입
          </Link>
        </Button>
        <Button
          type="submit"
          variant="text"
          color="primary"
        >
          비밀번호 찾기
        </Button>
      </form>
    </Container>
  )
};

export default Login;
