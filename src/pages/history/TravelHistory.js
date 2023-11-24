import { TableContainer, Table, TableHead, TableCell, TableBody, TableRow, Paper } from "@mui/material";
import { useState } from "react";


const TravelHistory = () => {
  const [rows, setRows] = useState([]);

  return (
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
  )
}

export default TravelHistory;