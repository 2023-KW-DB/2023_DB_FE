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

const mock = [
  {
    "id": 1,
    "username": "aaa",
    "user_type": 1,
    "email": "aaa@gmail.com",
    "phone_number": "01098765430",
    "weight": 100.0,
    "age": 20,
    "total_use_time": 56
  },
  {
    "id": 3,
    "username": "test",
    "user_type": 1,
    "email": "test",
    "phone_number": "01012345678",
    "weight": 23.0,
    "age": 23,
    "total_use_time": 5
  }
];

const UsageDistanceRanking = () => {
  const [rankingData, setRankingData] = useState(mock);
  const [showData, setShowData] = useState([mock[0]]);
  const [page, setPages] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    // TODO: Fetch ticket data
    (async() => {
      try{
        const response = await fetch(process.env.REACT_APP_API_URL + "/get-highest-distance", {
          method: "GET",  
          headers: { "Content-Type": "application/json" },
        });
        if (response.status !== 200) {
        throw new Error("데이터를 가져오는데 실패하였습니다.");
        }
        const jsonData = await response.json();
        setRankingData(jsonData.result)
        setTotalPage(parseInt(jsonData.result.length / 10) + 1)
        setShowData(jsonData.result.slice(0, 10))

      } catch (error) {
        alert("데이터를 가져오는데 실패하였습니다.");
      } 
      })();
    }, []);

  useEffect(() => {
    setShowData(rankingData.slice((page - 1) * 10, page * 10));
  }, [page]);

  return (
    <>
    <TableContainer component={Paper}>
      <Table>
        <TableHead sx={{width: "100%"}}>
          <TableRow>
            <TableCell>
              <Typography variant="span">등수</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="span">이름</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="span">이메일</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="span">거리</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{width: "100%"}}>
          {showData && showData.length > 0 ? (
            <>
              {showData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Typography variant="span">{index + 1}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="span">{row.username}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="span">{row.email}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="span">{row.ticket_price}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="span">{row.total_use_distance}</Typography>
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
  );
}

export default UsageDistanceRanking;