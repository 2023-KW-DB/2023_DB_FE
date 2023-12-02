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
    user_id: 1,
    bike_id: 1,
    history_id: 1,
    departure_station: "ST-999",
    arrival_station: "ST-998",
    departure_time: "2021-10-01T14:46:00.000Z",
    arrival_time: "2021-10-01T14:50:00.000Z",
    use_time: 10,
    use_distance: 1000,
    return_status: 1,
  },
  {
    user_id: 1,
    bike_id: 1,
    history_id: 2,
    departure_station: "ST-999",
    arrival_station: "ST-998",
    departure_time: "2021-10-01T14:46:00.000Z",
    arrival_time: "2021-10-01T14:50:00.000Z",
    use_time: 10,
    use_distance: 1000,
    return_status: 1,
  },
  {
    user_id: 1,
    bike_id: 1,
    history_id: 3,
    departure_station: "ST-999",
    arrival_station: "ST-998",
    departure_time: "2021-10-01T14:46:00.000Z",
    arrival_time: "2021-10-01T14:50:00.000Z",
    use_time: 10,
    use_distance: 1000,
    return_status: 1,
  },
];

const AdminRentHistory = () => {
  const [historyData, setHistoryData] = useState([]);
  const [showData, setShowData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL + `/get-all-userlog`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (response.status !== 200) {
          throw new Error("데이터를 가져오는데 실패하였습니다.");
        }
        const jsonData = await response.json();
        // Reverse the array to show the latest data first
        const reversedData = jsonData.result.reverse();

        setHistoryData(reversedData);
        setTotalPage(Math.ceil(reversedData.length / 10));
        setShowData(reversedData.slice(0, 10));
      } catch (error) {
        alert("데이터를 가져오는데 실패하였습니다.");
      }
    })();
    // TODO: Fetch data
  }, []);
  useEffect(() => {
    setShowData(historyData.slice((page - 1) * 10, page * 10));
  }, [page, historyData]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" className="tablecell">
                <Typography variant="span">번호</Typography>
              </TableCell>
              <TableCell align="center" className="tablecell">
                <Typography variant="span">유저명</Typography>
              </TableCell>
              <TableCell align="center" className="tablecell">
                <Typography variant="span">자전거명</Typography>
              </TableCell>
              <TableCell align="center" className="tablecell">
                <Typography variant="span">출발지</Typography>
              </TableCell>
              <TableCell align="center" className="tablecell">
                <Typography variant="span">도착지</Typography>
              </TableCell>
              <TableCell align="center" className="tablecell">
                <Typography variant="span">출발시간</Typography>
              </TableCell>
              <TableCell align="center" className="tablecell">
                <Typography variant="span">도착시간</Typography>
              </TableCell>
              <TableCell align="center" className="tablecell">
                <Typography variant="span">이용 시간</Typography>
              </TableCell>
              <TableCell align="center" className="tablecell">
                <Typography variant="span">이용 거리</Typography>
              </TableCell>
              <TableCell align="center" className="tablecell">
                <Typography variant="span">이용 결과</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {showData && showData.length > 0 ? (
              showData.map((row, index) => (
                <TableRow>
                  <TableCell align="center" className="tablecell">
                    <Typography variant="span">{row.history_id}</Typography>
                  </TableCell>
                  <TableCell align="center" className="tablecell">
                    <Typography variant="span">{row.user_id}</Typography>
                  </TableCell>
                  <TableCell align="center" className="tablecell">
                    <Typography variant="span">{row.bike_id}</Typography>
                  </TableCell>
                  <TableCell align="center" className="tablecell">
                    <Typography variant="span">{row.departure_station}</Typography>
                  </TableCell>
                  <TableCell align="center" className="tablecell">
                    <Typography variant="span">{row.arrival_station}</Typography>
                  </TableCell>
                  <TableCell align="center" className="tablecell">
                    <Typography variant="span">{moment(row.departure_time).format("YYYY-MM-DD HH:mm:ss")}</Typography>
                  </TableCell>
                  <TableCell align="center" className="tablecell">
                    <Typography variant="span">{row.arrival_time == null ? "" : moment(row.arrival_time).format("YYYY-MM-DD HH:mm:ss")}</Typography>
                  </TableCell>
                  <TableCell align="center" className="tablecell">
                    <Typography variant="span">{row.use_time}</Typography>
                  </TableCell>
                  <TableCell align="center" className="tablecell">
                    <Typography variant="span">{row.use_distance}</Typography>
                  </TableCell>
                  <TableCell align="center" className="tablecell">
                    <Typography variant="span">{row.return_status ? "대여완료" : "대여중"}</Typography>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell align="center" colSpan={10} className="tablecell">
                  <Typography variant="span">데이터가 없습니다.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", width: "100%", py: 3 }}>
        <ButtonGroup>
          <Button onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}>이전</Button>
          <Button>{page}</Button>
          <Button onClick={() => setPage((prevPage) => Math.min(prevPage + 1, totalPage))}>다음</Button>
        </ButtonGroup>
      </Box>
    </>
  );
};

export default AdminRentHistory;
