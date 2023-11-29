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
  "lendplace_id": "ST-10",
  "use_status": 0,
  "bike_status": 0,
  "statn_addr1": "서울특별시 마포구 양화로 93",
  "statn_addr2": "427",
  "startn_lat": 37.552746,
  "startn_lnt": 126.918617
}


const AdminBikeEdit = () => {
  const navigate = useNavigate();
  const [bikeId, setBikeId] = useState(mock.id);
  const [lendplaceId, setLendplaceId] = useState(mock.lendplace_id);
  const [useStatus, setUseStatus] = useState(0);
  const [bikeStatus, setBikeStatus] = useState(0);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("id");

  useEffect(() => {
    // TODO: Fetch data
    (async() => {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL + `/bike/get-one?id=${query}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (response.status !== 200) {
          throw new Error("데이터를 가져오는데 실패하였습니다.");
        }
        const jsonData = await response.json();
        setBikeId(jsonData.result.id)
        setLendplaceId(jsonData.result.lendplace_id)
        setUseStatus(jsonData.result.use_status)
        setBikeStatus(jsonData.result.bike_status)
        

      } catch (error) {
        alert("데이터를 가져오는데 실패하였습니다.");
      } 
    })();
  }, []);
  const submitHandler = () => {
    (async() => {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL + "/bike/modify", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: bikeId,
            lendplace_id: lendplaceId,
            use_status: useStatus,
            bike_status: bikeStatus,
          })
        });
        if (response.status !== 200) {
          throw new Error("데이터를 가져오는데 실패하였습니다.");
        }
        const jsonData = await response.json();
        if (jsonData.success) {
          alert("수정에 성공하였습니다.");
          navigate("/admin?type=bike");
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
        자전거 정보 수정
      </Typography>
      <Box sx={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", width: "100%", py: 3}}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="자전거 번호"
              value={bikeId}
              InputProps={{ readOnly: true }}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="자전거 위치"
              value={lendplaceId}
              onChange={(e) => setLendplaceId(e.target.value)}
            />
        </Grid>
        <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="사용중 여부"
              value={useStatus}
              InputProps={{ readOnly: true }}
              disabled
            />
        </Grid>
        <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="자전거 상태"
              value={bikeStatus}
              onChange={(e) => setBikeStatus(e.target.value)}
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
          수정하기
        </Button>
        <Button 
          component={RouterLink}
          to="/admin?type=bike"
          variant="contained"
          color="warning"
        >
          뒤로가기
        </Button>
      </Box>
    </Container>
  );
}

export default AdminBikeEdit;