import { Box, Button, Container, CssBaseline, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import RedeemIcon from "@mui/icons-material/Redeem";

const Coupon = () => {
  const [couponCode, setCouponCode] = useState('');
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const registerCouponHandler = () => {
    (async () => {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL + `/users/registration-coupon?userId=${user.id}&couponCode=${couponCode}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        if (response.status !== 200) {
          throw new Error("쿠폰 등록에 실패하였습니다.");
        }
        const jsonData = await response.json();
        alert("쿠폰이 성공적으로 등록되었습니다.");
        dispatch();
      } catch (e) {
        alert("쿠폰 등록에 실패하였습니다.");
      }
    })();
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Typography component="h1" variant="h5" sx={{ py: 3 }}>
        쿠폰 등록
      </Typography>
      <Box component="form" sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="coupon"
          label="쿠폰 코드"
          name="coupon"
          autoComplete="coupon"
          autoFocus
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />
        <Button
          type="button"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={registerCouponHandler}
        >
          <RedeemIcon /> 등록하기
        </Button>
      </Box>
    </Container>
  );
};

export default Coupon;
