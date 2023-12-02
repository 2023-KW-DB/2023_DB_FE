import { TableContainer, Table, TableHead, TableCell, TableBody, TableRow, Paper, Box, ButtonGroup, Button } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const TravelHistory = () => {
  const [travelHistory, setTravelHistory] = useState([]);
  const [showData, setShowData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [error, setError] = useState(null);

  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/get-userlog?userId=${user.id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("데이터를 가져오는데 실패하였습니다.");
        }

        const jsonData = await response.json();
        if (jsonData.status == 2029) {
          setShowData([]);
          setTotalPage(1);
          setTravelHistory([]);
        } else {
          setTravelHistory(jsonData.result);
          setTotalPage(Math.ceil(jsonData.result.length / 10));
          setShowData(jsonData.result.slice(0, 10));
        }
      } catch (e) {
        // console.error("데이터를 가져오는데 실패하였습니다.", e);
        setError("데이터를 가져오는데 실패하였습니다.");
      }
    };

    fetchData();
  }, [user.id]);

  useEffect(() => {
    setShowData(travelHistory.slice((page - 1) * 10, page * 10));
  }, [page, travelHistory]);

  return (
    <>
      {error ? (
        <div>{error}</div>
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="Usage History">
            <TableHead>
              <TableRow>
                <TableCell align="center">출발지</TableCell>
                <TableCell align="center">출발시간</TableCell>
                <TableCell align="center">도착지</TableCell>
                <TableCell align="center">도착시간</TableCell>
                <TableCell sx={{ minWidth: 100 }} align="center">
                  이동 거리
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {showData && showData.length > 0 ? (
                showData.map((row) => (
                  <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell align="center">{row.departure_station}</TableCell>
                    <TableCell align="center">{moment(row.departure_time).format("YYYY-MM-DD HH:mm:ss")}</TableCell>
                    <TableCell align="center">{row.arrival_station}</TableCell>
                    <TableCell align="center">{moment(row.arrival_time).format("YYYY-MM-DD HH:mm:ss")}</TableCell>
                    <TableCell align="center">{row.use_distance}m</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell align="center" colSpan={5}>
                    데이터가 존재하지 않습니다.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
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

export default TravelHistory;
