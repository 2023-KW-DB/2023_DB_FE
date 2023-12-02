import { Button, ButtonGroup, Container, CssBaseline, Typography, Box } from "@mui/material";
import { Link as RouterLink, useSearchParams } from "react-router-dom";
import AdminMain from "./admin/AdminMain";
import AdminUser from "./admin/AdminUser";
import AdminRentHistoryfrom from "./admin/AdminRentHistory";
import AdminBikeStation from "./admin/AdminBikeStation";
import AdminTicket from "./admin/AdminTicket";
import { useEffect } from "react";
import AdminBike from "./admin/AdminBike";
import AdminCoupon from "./admin/AdminCoupon";
const Admin = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("type");
  useEffect(() => {
    console.log(query);
  }, []);
  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Typography component="h1" variant="h5" sx={{ py: 3 }}>
          관리자 기능
        </Typography>
        <ButtonGroup variant="contained" aria-label="outlined primary button group">
          <Button variant="contained" component={RouterLink} to="/admin">
            대시보드
          </Button>

          <Button variant="contained" component={RouterLink} to="/admin?type=rent">
            대여 이력
          </Button>
          <Button variant="contained" component={RouterLink} to="/admin?type=ticket">
            이용권 관리
          </Button>
          <Button variant="contained" component={RouterLink} to="/admin?type=user">
            회원 관리
          </Button>
          <Button variant="contained" component={RouterLink} to="/admin?type=bikestation">
            따릉이 보관소 관리
          </Button>
          <Button variant="contained" component={RouterLink} to="/admin?type=bike">
            자전거 관리
          </Button>
          <Button variant="contained" component={RouterLink} to="/admin?type=coupon">
            쿠폰 관리
          </Button>
        </ButtonGroup>
      </Box>
      {!query && <AdminMain />}
      {query === "user" && <AdminUser />}
      {query === "rent" && <AdminRentHistoryfrom />}
      {query === "ticket" && <AdminTicket />}
      {query === "bikestation" && <AdminBikeStation />}
      {query === "bike" && <AdminBike />}
      {query === "coupon" && <AdminCoupon />}
    </Container>
  );
};

export default Admin;
