import { TableContainer, Table, TableHead, TableCell, TableBody, TableRow, Paper } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const TicketHistory = () => {
  const [ticketHistory, setTicketHIstory] = useState([]);
  const user = useSelector((state) => state.user);
  useEffect(() => {
    (async() => {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL + `/users/get-ticket/payment-history?userId=${user.id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (response.status !== 200) {
          throw new Error("데이터를 가져오는데 실패하였습니다.");
        }
        const jsonData = await response.json();
        setTicketHIstory(jsonData.result);
      } catch (e) {
        alert("데이터를 가져오는데 실패하였습니다.");
      }
    })();
  }, [])
  
  return (
    <TableContainer component={Paper}>
      <Table aria-label="Usage History">
        <TableHead>
          <TableRow>
            <TableCell align="center">
              티켓 번호
            </TableCell>
            <TableCell align="center">
              구매 시간
            </TableCell>
            <TableCell align="center">
              사용 여부
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {ticketHistory.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{row.ticket_id}</TableCell>
              <TableCell align="center">{moment(row.purchased_at).format("YYYY-MM-DD HH:mm:ss")}</TableCell>
              <TableCell align="center">{row.is_used ? "사용 완료" : "사용 전"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TicketHistory