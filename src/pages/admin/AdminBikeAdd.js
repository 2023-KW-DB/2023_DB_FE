import { Button, ButtonGroup, Container, CssBaseline, Typography, Box, Grid, TextField, Paper, Autocomplete, Select, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate, useSearchParams } from "react-router-dom";
import "./style.css";
import moment from "moment";

const mock = {
  id: 1,
  lendplace_id: "ST-10",
  use_status: 0,
  bike_status: 0,
  statn_addr1: "서울특별시 마포구 양화로 93",
  statn_addr2: "427",
  startn_lat: 37.552746,
  startn_lnt: 126.918617,
};

const AdminBikeAdd = () => {
  const navigate = useNavigate();
  const [bikeId, setBikeId] = useState(mock.id);
  const [lendplaceId, setLendplaceId] = useState(mock.lendplace_id);
  const [lendplaceData, setLendplaceData] = useState([]);
  const [useStatus, setUseStatus] = useState(0);
  const [bikeStatus, setBikeStatus] = useState(0);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("id");

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL + "/station/get-all-lendplace?user_id=1", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (response.status !== 200) {
          throw new Error("데이터를 가져오는데 실패하였습니다.");
        }
        const jsonData = await response.json();
        const newData = jsonData.result.map((data) => {
          return {
            lendplace_id: data.lendplace_id,
            label: `${data.lendplace_id} ${data.statn_addr1} ${data.statn_addr2}`,
          };
        });

        setLendplaceData(newData);
      } catch (error) {
        alert("데이터를 가져오는데 실패하였습니다.");
      }
    })();
  }, []);
  const submitHandler = () => {
    (async () => {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL + "/bike/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            lendplace_id: lendplaceId,
            use_status: 0,
            bike_status: 1,
          }),
        });
        if (response.status !== 200) {
          throw new Error("데이터를 가져오는데 실패하였습니다.");
        }
        const jsonData = await response.json();
        if (jsonData.success) {
          alert("생성에 성공하였습니다.");
          navigate("/admin?type=bike");
        } else {
          throw new Error("생성에 실패했습니다.");
        }
      } catch (error) {
        console.log(error);
        alert("생성에 실패했습니다.");
      }
    })();
    return;
  };
  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Typography component="h1" variant="h5" sx={{ py: 3 }}>
        자전거 정보 추가
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
            <Autocomplete
              fullWidth
              disablePortal
              renderInput={(params) => <TextField {...params} label="자전거 대여소 위치" />}
              options={lendplaceData}
              sx={{ width: "100%" }}
              value={lendplaceId}
              onChange={(e, value) => setLendplaceId(value.lendplace_id)}
            />
            {/* <TextField fullWidth variant="outlined" label="자전거 위치" value={lendplaceId} onChange={(e) => setLendplaceId(e.target.value)} /> */}
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

export default AdminBikeAdd;
