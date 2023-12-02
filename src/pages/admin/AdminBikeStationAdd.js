import { Button, ButtonGroup, Container, CssBaseline, Typography, Box, Grid, TextField, Paper, Autocomplete } from "@mui/material";
import { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate, useSearchParams } from "react-router-dom";
import "./style.css";
import moment from "moment";

const mock = {
  lendplace_id: "ST-10",
  statn_addr1: "서울특별시 마포구 양화로 93",
  statn_addr2: "427",
  startn_lat: 37.552746,
  startn_lnt: 126.918617,
  max_stands: 20.0,
  station_status: 1,
  total_bikes: 4,
  usable_bikes: 1,
  empty_stands: 16,
};

const AdminBikeStationAdd = () => {
  const navigate = useNavigate();
  const [lendplace_id, setLendplaceId] = useState("");
  const [statn_addr1, setStatnAddr1] = useState("");
  const [statn_addr2, setStatnAddr2] = useState("");
  const [startn_lat, setStartnLat] = useState(37);
  const [startn_lnt, setStartnLnt] = useState(126);
  const [max_stands, setMaxStands] = useState(20);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("id");

  useEffect(() => {
    // TODO: Fetch data
  }, []);

  const submitHandler = () => {
    (async () => {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL + "/station/create-lendplace", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            lendplace_id: lendplace_id,
            statn_addr1: statn_addr1,
            statn_addr2: statn_addr2,
            startn_lat: startn_lat,
            startn_lnt: startn_lnt,
            max_stands: max_stands,
          }),
        });
        if (response.status !== 200) {
          throw new Error("데이터를 가져오는데 실패하였습니다.");
        }
        const jsonData = await response.json();
        if (jsonData.success) {
          alert("생성에 성공하였습니다.");
          navigate("/admin?type=bikestation");
        } else {
          throw new Error("수정에 실패했습니다.");
        }
      } catch (error) {
        console.log(error);
        alert("수정에 실패했습니다.");
      }
    })();
    return;
  };
  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Typography component="h1" variant="h5" sx={{ py: 3 }}>
        대여소 정보 수정
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          py: 3,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField fullWidth variant="outlined" label="대여소 ID" value={lendplace_id} onChange={(e) => setLendplaceId(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth variant="outlined" label="대여소 주소" value={statn_addr1} onChange={(e) => setStatnAddr1(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth variant="outlined" label="대여소 이름" value={statn_addr2} onChange={(e) => setStatnAddr2(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth variant="outlined" label="위도" value={startn_lat} onChange={(e) => setStartnLat(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth variant="outlined" label="경도" value={startn_lnt} onChange={(e) => setStartnLnt(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth variant="outlined" label="최대 거치대 수" value={max_stands} onChange={(e) => setMaxStands(e.target.value)} />
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "start",
          alignItems: "center",
          width: "100%",
          py: 3,
        }}
      >
        <Button onClick={submitHandler} variant="contained" sx={{ mr: 3 }}>
          생성하기
        </Button>
        <Button component={RouterLink} to="/admin?type=bike" variant="contained" color="warning">
          뒤로가기
        </Button>
      </Box>
    </Container>
  );
};

export default AdminBikeStationAdd;
