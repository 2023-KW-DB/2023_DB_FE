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
import { Link as RouterLink } from "react-router-dom";

const Login = () => {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Typography component="h1" variant="h5" sx={{py: 3}}>
        로그인
      </Typography>
      <form noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email Address"
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
              label="Password"
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
          <Link component={RouterLink} to="/register" variant="text">
              회원가입
          </Link>
        </Button>

        <Button
          type="submit"
          variant="text"
          color="primary"
        >
          아이디 찾기
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
