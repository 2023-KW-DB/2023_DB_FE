import {
  Button,
  ButtonGroup,
  Container,
  CssBaseline,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link as RouterLink, useSearchParams } from "react-router-dom";
import "./style.css";
import moment from "moment";

const mock = [
  {
    lendplace_id: "ST-1029",
    statn_addr1: "서울특별시 녹번동 84",
    statn_addr2: "은평구청 보건소",
    startn_lat: 37.602402,
    startn_lnt: 126.92865,
    max_stands: 20.0,
    station_status: 1,
    total_bikes: 0,
  },
];

const AdminBikeStation = () => {
  const [bikeStationData, setBikeStationData] = useState(mock);
  const [showData, setShowData] = useState([mock[0]]);
  const [page, setPages] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  useEffect(() => {
    // TODO: Fetch data
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
        setBikeStationData(jsonData.result);
        setTotalPage(parseInt(jsonData.result.length / 10) + 1);
        setShowData(jsonData.result.slice(0, 10));
      } catch (error) {
        alert("데이터를 가져오는데 실패하였습니다.");
      }
    })();
  }, []);

  useEffect(() => {
    setShowData(bikeStationData.slice((page - 1) * 10, page * 10));
  }, [page]);

  const handleRemoveBikeStation = (lendplace_id) => {
    (async () => {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL + "/station/delete-lendplace", {
          method: "DELETE",
          body: JSON.stringify({
            lendplace_id: lendplace_id,
          }),
          headers: { "Content-Type": "application/json" },
        });
        if (response.status !== 200) {
          throw new Error("데이터를 삭제하는데 실패하였습니다.");
        }
        const jsonData = await response.json();
        alert("데이터를 삭제하는데 성공하였습니다.");
        window.location.reload();
      } catch (error) {
        alert("데이터를 삭제하는데 실패하였습니다.");
      }
    })();
  };
  return (
    <>
      <TableContainer component={Paper}>
        <TableHead sx={{ width: "100%" }}>
          <TableRow>
            <TableCell className="user-bike-station-cell">
              <Typography variant="span">ID</Typography>
            </TableCell>
            <TableCell className="user-bike-station-cell">
              <Typography variant="span">전체 주소</Typography>
            </TableCell>
            <TableCell className="user-bike-station-cell">
              <Typography variant="span">이름</Typography>
            </TableCell>
            <TableCell className="user-bike-station-cell">
              <Typography variant="span">위도</Typography>
            </TableCell>
            <TableCell className="user-bike-station-cell">
              <Typography variant="span">경도</Typography>
            </TableCell>
            <TableCell className="user-bike-station-cell">
              <Typography variant="span">최대 자전거 개수</Typography>
            </TableCell>
            <TableCell className="user-bike-station-cell">
              <Typography variant="span">현재 자전거 개수</Typography>
            </TableCell>
            <TableCell className="user-bike-station-cell">
              <Typography variant="span">사용 여부</Typography>
            </TableCell>
            <TableCell className="user-bike-station-cell">
              <Typography variant="span">수정</Typography>
            </TableCell>
            <TableCell className="user-bike-station-cell">
              <Typography variant="span">삭제</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{ width: "100%" }}>
          {showData && showData.length > 0 ? (
            <>
              {showData.map((row, index) => (
                <TableRow>
                  <TableCell className="user-bike-station-cell">
                    <Typography variant="span">{row.lendplace_id}</Typography>
                  </TableCell>
                  <TableCell className="user-bike-station-cell">
                    <Typography variant="span">{row.statn_addr1}</Typography>
                  </TableCell>
                  <TableCell className="user-bike-station-cell">
                    <Typography variant="span">{row.statn_addr2}</Typography>
                  </TableCell>
                  <TableCell className="user-bike-station-cell">
                    <Typography variant="span">{row.startn_lat}</Typography>
                  </TableCell>
                  <TableCell className="user-bike-station-cell">
                    <Typography variant="span">{row.startn_lnt}</Typography>
                  </TableCell>
                  <TableCell className="user-bike-station-cell">
                    <Typography variant="span">{row.max_stands}</Typography>
                  </TableCell>
                  <TableCell className="user-bike-station-cell">
                    <Typography variant="span">{row.total_bikes}</Typography>
                  </TableCell>
                  <TableCell className="user-bike-station-cell">
                    <Typography variant="span">{row.station_status}</Typography>
                  </TableCell>
                  <TableCell className="user-bike-station-cell">
                    <Button variant="contained" component={RouterLink} to={`/admin/bikestation/edit?id=${row.lendplace_id}`}>
                      수정
                    </Button>
                  </TableCell>
                  <TableCell className="user-bike-station-cell">
                    <Button
                      variant="contained"
                      onClick={() => {
                        if (window.confirm("정말로 삭제하시겠습니까?")) {
                          handleRemoveBikeStation(row.lendplace_id);
                        }
                      }}
                    >
                      삭제
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </>
          ) : (
            <TableRow>
              <TableCell colSpan={9} align="center">
                <Typography variant="span">데이터가 없습니다.</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </TableContainer>
      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%", py: 3 }}>
        <Button variant="contained" color="primary" component={RouterLink} to={`/admin/bikestation/add`}>
          추가
        </Button>
        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", width: "100%" }}>
          <ButtonGroup>
            <Button onClick={() => setPages(page - 1 > 0 ? page - 1 : 1)}>이전</Button>
            <Button>{page}</Button>
            <Button onClick={() => setPages(page + 1 < totalPage ? page + 1 : totalPage)}>다음</Button>
          </ButtonGroup>
        </Box>
      </Box>
    </>
  );
};

export default AdminBikeStation;
