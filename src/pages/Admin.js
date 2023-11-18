import {
  Button,
  ButtonGroup,
  Container,
  CssBaseline,
  Typography,
  Box,
} from "@mui/material";
import { Link as RouterLink, useSearchParams } from "react-router-dom";
import AdminUser from "./admin/AdminUser";
import AdminRentHistoryfrom from "./admin/AdminRentHistory";
const Admin = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("type");
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
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Button
            variant="contained"
            component={RouterLink}
            to="/admin?type=user"
          >
            회원 관리
          </Button>
          <Button
            variant="contained"
            component={RouterLink}
            to="/admin?type=rent"
          >
            대여 이력
          </Button>
          <Button
            variant="contained"
            component={RouterLink}
            to="/admin?type=tickethistory"
          >
            이용권 이력
          </Button>
        </ButtonGroup>
      </Box>
      {query === "user" && <AdminUser />}
      {query === "rent" && <AdminRentHistoryfrom />}
    </Container>
  );
};

export default Admin;
