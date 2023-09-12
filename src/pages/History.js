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
  Paper
} from "@mui/material"


const History = () => {
  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <Typography component="h1" variant="h5" sx={{py: 3}}>
        이력 확인
      </Typography>
      
      <TableContainer component={Paper}>
        <Table aria-label="Usage History">
          <TableHead>
            <TableRow>
              <TableCell sx = {{minWidth:50}} align="center"> username </TableCell>
              <TableCell sx = {{minWidth:350}} align="center">출발지</TableCell>
              <TableCell sx = {{minWidth:90}} align="center">출발시간</TableCell>
              <TableCell sx = {{minWidth:350}} align="center">도착지</TableCell>
              <TableCell sx = {{minWidth:90}} align="center">도착시간 </TableCell>
              <TableCell sx = {{minWidth:90}} align="center">가격&nbsp;(원)</TableCell>
            </TableRow> 
          </TableHead>

          <TableBody>
            
          </TableBody>
        </Table>
      </TableContainer> 
    </Container>
  )
};

export default History;