import { useEffect } from "react";
import {
  Container,
  CssBaseline,
  Avatar,
  Typography,
  TextField,
  FormControlLabel,
  Grid,
  Checkbox,
  Button,
  Box,
  Link
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";

const Register = () => {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Typography component="h1" variant="h5" sx={{py: 3}}>
        회원 가입
      </Typography>
      <form noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="fname"
              name="firstName"
              variant="outlined"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="lname"
            />
          </Grid>
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
          <Grid item xs={12}>
            {/* <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="I want to receive inspiration, marketing promotions and updates via email."
            /> */}
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          회원 가입
        </Button>
        <Grid container justify="flex-end">
          <Grid item sx={{ py: 1 }}>
            <Link component={RouterLink} to="/login" variant="body2" style={{ textDecoration: 'none' }}>
              계정이 이미 존재하나요? 로그인
            </Link>
          </Grid>
        </Grid>
      </form>
      <Box mt={5}>
        {/* <MadeWithLove /> */}
      </Box>
    </Container>
  )
};

export default Register;
