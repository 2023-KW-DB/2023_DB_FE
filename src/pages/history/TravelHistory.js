import { TableContainer, Table, TableHead, TableCell, TableBody, TableRow, Paper, Box, ButtonGroup, Button } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


const TravelHistory = () => {
  const [travelHistory, setTravelHistory] = useState([]);
  const [showData, setShowData] = useState([]);
  const [page, setPages] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const user = useSelector((state) => state.user);
  useEffect(() => {
    (async() => {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL + `/get-userlog?userId=${user.id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (response.status !== 200) {
          throw new Error("데이터를 가져오는데 실패하였습니다.");
        }
        const jsonData = await response.json();
        setTravelHistory(jsonData.result);
        setTotalPage(parseInt(jsonData.result.length / 10) + 1)
        setShowData(jsonData.result.slice(0, 10))
      } catch (e) {
        alert("데이터를 가져오는데 실패하였습니다.");
      }
    })();
  }, [])

  useEffect(() => {
    setShowData(travelHistory.slice((page - 1) * 10, page * 10));
  }, [page]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="Usage History">
          <TableHead>
            <TableRow>
              <TableCell align="center">
                출발지
              </TableCell>
              <TableCell align="center">
                출발시간
              </TableCell>
              <TableCell align="center">
                도착지
              </TableCell>
              <TableCell align="center">
                도착시간
              </TableCell>
              <TableCell sx={{minWidth: 100}} align="center">
                이동 거리
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {showData.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{row.departure_station}</TableCell>
                <TableCell align="center">{moment(row.departure_time).format("YYYY-MM-DD HH:mm:ss")}</TableCell>
                <TableCell align="center">{row.arrival_station}</TableCell>
                <TableCell align="center">{moment(row.arrival_time).format("YYYY-MM-DD HH:mm:ss")}</TableCell>
                <TableCell align="center">{row.use_distance}m</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", width: "100%", py: 3}}>
        <ButtonGroup>
          <Button onClick={() => setPages(page - 1 > 0 ? page - 1 : 1)}>이전</Button>
          <Button>{page}</Button>
          <Button onClick={() => setPages(page + 1 < totalPage ? page + 1 : totalPage)}>다음</Button>
        </ButtonGroup>
      </Box>
    </>
  )
}

export default TravelHistory;