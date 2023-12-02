import { TableContainer, Table, TableHead, TableCell, TableBody, TableRow, Paper, Box, ButtonGroup, Button } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const TicketHistory = () => {
  const [ticketHistory, setTicketHistory] = useState([]);
  const [showData, setShowData] = useState([]);
  const [page, setPages] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const user = useSelector((state) => state.user);
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL + `/users/get-ticket/payment-history?userId=${user.id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (response.status !== 200) {
          throw new Error("데이터를 가져오는데 실패하였습니다.");
        }
        const jsonData = await response.json();
        if (jsonData.status == 2025) {
          setShowData([]);
          setTotalPage(1);
          setTicketHistory([]);
        } else {
          setTicketHistory(jsonData.result);
          setTotalPage(Math.ceil(jsonData.result.length / 10));
          setShowData(jsonData.result.slice(0, 10));
        }
      } catch (e) {
        alert("데이터를 가져오는데 실패하였습니다.");
      }
    })();
  }, []);

  useEffect(() => {
    setShowData(ticketHistory.slice((page - 1) * 10, page * 10));
  }, [page]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="Usage History">
          <TableHead>
            <TableRow>
              <TableCell align="center">티켓 번호</TableCell>
              <TableCell align="center">구매 시간</TableCell>
              <TableCell align="center">사용 여부</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {ticketHistory && ticketHistory.length > 0 ? (
              ticketHistory.map((row) => (
                <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell align="center">{row.ticket_id}</TableCell>
                  <TableCell align="center">{moment(row.purchased_at).format("YYYY-MM-DD HH:mm:ss")}</TableCell>
                  <TableCell align="center">{row.is_used ? "사용 완료" : "사용 전"}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell align="center" colSpan={3}>
                  데이터가 존재하지 않습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", width: "100%", py: 3 }}>
        <ButtonGroup>
          <Button onClick={() => setPages(page - 1 > 0 ? page - 1 : 1)}>이전</Button>
          <Button>{page}</Button>
          <Button onClick={() => setPages(page + 1 < totalPage ? page + 1 : totalPage)}>다음</Button>
        </ButtonGroup>
      </Box>
    </>
  );
};

export default TicketHistory;
