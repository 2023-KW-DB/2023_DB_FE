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

const mock = [
  {
    "ticket_id": "TK-1001",
    "price": 5000
  }
  // 여기에 더 많은 티켓 데이터를 추가할 수 있습니다.
];

const AdminTicket = () => {
  const [ticketData, setTicketData] = useState(mock);
  const [showData, setShowData] = useState([mock[0]]);
  const [page, setPages] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    // TODO: Fetch ticket data
    (async() => {
      try{
        const response = await fetch(process.env.REACT_APP_API_URL + "/get-all-ticket", {
          method: "GET",  
          headers: { "Content-Type": "application/json" },
        });
        if (response.status !== 200) {
        throw new Error("데이터를 가져오는데 실패하였습니다.");
        }
        const jsonData = await response.json();
        setTicketData(jsonData.result)
        setTotalPage(parseInt(jsonData.result.length / 10) + 1)
        setShowData(jsonData.result.slice(0, 10))
      } catch (error) {
        alert("데이터를 가져오는데 실패하였습니다.");
      } 
      })();
    }, []);

  useEffect(() => {
    setShowData(ticketData.slice((page - 1) * 10, page * 10));
  }, [page]);

  const handleRemoveTicket = (id) => {
    (async() => {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL + "/admin/delete-ticket", {
          method: "DELETE",
          body: JSON.stringify({
            id: id
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
  }

  return (
    <>
    <TableContainer component={Paper}>
      <TableHead sx={{width: "100%"}}>
        <TableRow>
          <TableCell>
            <Typography variant="span">번호</Typography>
          </TableCell>
          <TableCell>
            <Typography variant="span">가격</Typography>
          </TableCell>
          <TableCell>
            <Typography variant="span">수정</Typography>
          </TableCell>
          <TableCell>
            <Typography variant="span">삭제</Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody sx={{width: "100%"}}>
        {showData && showData.length > 0 ? (
          <>
            {showData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Typography variant="span">{row.id}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="span">{row.ticket_price}</Typography>
                </TableCell>
                <TableCell>
                  <Button variant="contained" component={RouterLink} to={`/admin/ticket/edit?id=${row.ticket_id}`}>
                    수정
                  </Button>
                </TableCell>
                <TableCell>
                  <Button variant="contained" onClick={() => {
                    if (window.confirm("정말로 삭제하시겠습니까?")) {
                      handleRemoveTicket(row.ticket_id);
                    }
                  }}>
                    삭제
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </>
        ) : (
          <TableRow>
            <TableCell colSpan={4} align="center">
              <Typography variant="span">데이터가 없습니다.</Typography>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </TableContainer>
    <Box sx={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", width: "100%", py: 3}}>
      <ButtonGroup>
        <Button onClick={() => setPages(page - 1 > 0 ? page - 1 : 1)}>이전</Button>
        <Button>{page}</Button>
        <Button onClick={() => setPages(page + 1 < totalPage ? page + 1 : totalPage)}>다음</Button>
      </ButtonGroup>
    </Box>
    </>
  );
};

export default AdminTicket;
