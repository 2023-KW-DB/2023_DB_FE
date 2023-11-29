import {
  Button,
  ButtonGroup,
  Container,
  CssBaseline,
  Typography,
  Box,
  Grid,
  TextField,
  Paper,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate, useSearchParams } from "react-router-dom";
import "./style.css";
import moment from "moment";

const mock = {
    "id": 1,
    "password": "abcd1234",
    "username": "김데베",
    "user_type": 1,
    "email": "kw_db@kw.ac.kr",
    "phone_number": "1.012345678E9",
    "weight": 50.0,
    "age": 20,
    "last_accessed_at": null,
    "total_money": 50000
};

const AdminTicketAdd = () => {
  const navigate = useNavigate();
  const [ticketPrice, setTicketPrice] = useState(mock.username);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("id");

  useEffect(() => {

  }, []);
  const submitHandler = () => {
    (async() => {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL + "/admin/create-ticket", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ticket_price: ticketPrice,
          })
        });
        if (response.status !== 200) {
          throw new Error("데이터를 가져오는데 실패하였습니다.");
        }
        const jsonData = await response.json();
        if (jsonData.success) {
          alert("수정에 성공하였습니다.");
          navigate("/admin?type=ticket");
        } else {
          throw new Error("수정에 실패했습니다.");
        }
      } catch (error) {
        console.log(error);
        alert("수정에 실패했습니다.");
      }
    })();
    return;
  }
  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Typography component="h1" variant="h5" sx={{ py: 3 }}>
        티켓 정보 추가
      </Typography>
      <Box sx={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", width: "100%", py: 3}}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="티켓 가격"
              value={ticketPrice}
              onChange={(e) => setTicketPrice(e.target.value)}
            />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{display: "flex", flexDirection: "row", justifyContent: "start", alignItems: "center", width: "100%", py: 3}}>
        <Button 
          onClick={submitHandler}
          variant="contained"
          sx={{ mr: 3}}
        >
          추가하기
        </Button>
        <Button 
          component={RouterLink}
          to="/admin?type=ticket"
          variant="contained"
          color="warning"
        >
          뒤로가기
        </Button>
      </Box>
    </Container>
  );
};

export default AdminTicketAdd;
