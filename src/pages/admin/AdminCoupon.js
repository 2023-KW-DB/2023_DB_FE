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
    id: "TK-1001",
    ticket_price: 5000,
  },
];

const AdminCoupon = () => {
  const [ticketData, setTicketData] = useState(mock);
  const [showData, setShowData] = useState([mock[0]]);
  const [page, setPages] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    // TODO: Fetch ticket data
    (async () => {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL + "/get-all-coupon", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (response.status !== 200) {
          throw new Error("데이터를 가져오는데 실패하였습니다.");
        }
        const jsonData = await response.json();
        setTicketData(jsonData.result);
        setTotalPage(parseInt(jsonData.result.length / 10) + 1);
        setShowData(jsonData.result.slice(0, 10));
      } catch (error) {
        alert("데이터를 가져오는데 실패하였습니다.");
      }
    })();
  }, []);

  useEffect(() => {
    setShowData(ticketData.slice((page - 1) * 10, page * 10));
  }, [page]);

  const handleRemoveCoupon = (value) => {
    (async () => {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL + "/delete-coupon", {
          method: "DELETE",
          body: JSON.stringify({
            value: value,
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
        <Table>
          <TableHead sx={{ width: "100%" }}>
            <TableRow>
              <TableCell align="center">
                <Typography variant="span">번호</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="span">이름</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="span">가격</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="span">사용 여부</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="span">수정</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="span">취소</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ width: "100%" }}>
            {showData && showData.length > 0 ? (
              <>
                {showData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">
                      <Typography variant="span">{row.id}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="span">{row.value}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="span">{row.ticket_price}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="span">{row.is_used ? "사용됨" : "사용안됨"}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Button variant="contained" component={RouterLink} to={`/admin/coupon/edit?id=${row.id}`}>
                        수정
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        onClick={() => {
                          if (window.confirm("정말로 삭제하시겠습니까?")) {
                            handleRemoveCoupon(row.value);
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
                <TableCell align="center" colSpan={4} align="center">
                  <Typography variant="span">데이터가 없습니다.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%", py: 3 }}>
        <Button variant="contained" color="primary" component={RouterLink} to={`/admin/coupon/add`}>
          발급
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

export default AdminCoupon;
