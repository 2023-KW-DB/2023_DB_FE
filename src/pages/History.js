import { useEffect } from "react";
import {
  Container,
  CssBaseline,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const History = () => {
  const rows = [
    {
      id: 1,
      username: "testuser1",
      start: "서울특별시 종로구 효자로13길 45",
      startedAt: "2023-09-11",
      end: "서울특별시 중구 덕수궁길 61 서울시립미술관",
      endAt: "2023-09-10",
      price: 9000,
    },
  ];

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Typography component="h1" variant="h5" sx={{ py: 3 }}>
        이력 확인
      </Typography>

      <TableContainer component={Paper}>
        <Table aria-label="Usage History">
          <TableHead>
            <TableRow>
              <TableCell sx={{ minWidth: 50 }} align="center">
                {" "}
                username{" "}
              </TableCell>
              <TableCell sx={{ minWidth: 350 }} align="center">
                출발지
              </TableCell>
              <TableCell sx={{ minWidth: 90 }} align="center">
                출발시간
              </TableCell>
              <TableCell sx={{ minWidth: 350 }} align="center">
                도착지
              </TableCell>
              <TableCell sx={{ minWidth: 90 }} align="center">
                도착시간{" "}
              </TableCell>
              <TableCell sx={{ minWidth: 90 }} align="center">
                가격&nbsp;(원)
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{row.username}</TableCell>
                <TableCell align="center">{row.start}</TableCell>
                <TableCell align="center">{row.startedAt}</TableCell>
                <TableCell align="center">{row.end}</TableCell>
                <TableCell align="center">{row.endAt}</TableCell>
                <TableCell align="center">{row.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default History;
