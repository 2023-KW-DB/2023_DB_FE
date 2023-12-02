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
  Autocomplete,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate, useSearchParams } from "react-router-dom";
import "./style.css";
import moment from "moment";

const mock = [
  {
    value: "쿠폰2",
    is_used: 0,
    ticket_id: 9,
    id: 9,
    ticket_price: 3000,
  },
];

const AdminCouponAdd = () => {
  const navigate = useNavigate();
  const [couponValue, setCouponValue] = useState();
  const [ticketId, setTicketId] = useState();
  const [ticketPrice, setTicketPrice] = useState();

  const [ticketData, setTicketData] = useState([]);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("id");

  useEffect(() => {
    // TODO: Fetch data
    (async () => {
      try {
        const ticketResponse = await fetch(process.env.REACT_APP_API_URL + `/get-all-ticket`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (ticketResponse.status !== 200) {
          throw new Error("데이터를 가져오는데 실패하였습니다.");
        }
        const ticketJsonData = await ticketResponse.json();
        const outData = [];
        for (let i = 0; i < ticketJsonData.result.length; i++) {
          outData.push({
            ...ticketJsonData.result[i],
            label: `[${ticketJsonData.result[i].id}] ${ticketJsonData.result[i].ticket_price}원`,
          });
        }
        setTicketData(outData);
      } catch (error) {
        alert("데이터를 가져오는데 실패하였습니다.");
      }
    })();
  }, []);
  const submitHandler = () => {
    (async () => {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL + `/create-coupon`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            value: couponValue,
            ticket_id: ticketId,
          }),
        });
        if (response.status !== 200) {
          throw new Error("쿠폰 발급에 실패했습니다.");
        }
        if (response.status !== 200) {
          throw new Error("쿠폰 발급에 실패했습니다.");
        }
        const jsonData = await response.json();
        if (jsonData.success) {
          alert("쿠폰을 발급하였습니다.");
          navigate("/admin?type=coupon");
        } else {
          throw new Error("쿠폰 발급에 실패했습니다.");
        }
      } catch (error) {
        console.log(error);
        alert("쿠폰 발급에 실패했습니다.");
      }
    })();
    return;
  };
  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Typography component="h1" variant="h5" sx={{ py: 3 }}>
        쿠폰 발급
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", width: "100%", py: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField fullWidth variant="outlined" label="쿠폰 이름" value={couponValue} onChange={(e) => setCouponValue(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              fullWidth
              disablePortal
              renderInput={(params) => <TextField {...params} label="티켓 정보" />}
              options={ticketData}
              // getOptionLabel={(option) => option.name || ""}
              sx={{ width: "100%" }}
              value={ticketId}
              onChange={(e, value) => {
                setTicketId(value.id);
                setTicketPrice(value.ticket_price);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth variant="outlined" label={ticketPrice} value={ticketPrice} InputProps={{ readOnly: true }} disabled />
          </Grid>
          {/* <Grid item xs={12}>
            <FormGroup>
              <FormControlLabel control={<Checkbox checked={isUsed} onChange={(e) => setIsUsed(e.target.checked)} />} label="사용 여부" />
            </FormGroup>
          </Grid> */}
        </Grid>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "start", alignItems: "center", width: "100%", py: 3 }}>
        <Button onClick={submitHandler} variant="contained" sx={{ mr: 3 }}>
          발급하기
        </Button>
        <Button component={RouterLink} to="/admin?type=ticket" variant="contained" color="warning">
          뒤로가기
        </Button>
      </Box>
    </Container>
  );
};

export default AdminCouponAdd;
