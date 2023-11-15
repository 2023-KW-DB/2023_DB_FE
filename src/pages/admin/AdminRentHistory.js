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
import moment from "moment";

const mock = [
  {
    "user_id": 1,
    "bike_id": 1,
    "history_id": 1,
    "departure_station": "ST-999",
    "arrival_station": "ST-998",
    "departure_time": "2021-10-01T14:46:00.000Z",
    "arrival_time": "2021-10-01T14:50:00.000Z",
    "use_time": 10,
    "use_distance": 1000,
    "return_status": 1
  },{
    "user_id": 1,
    "bike_id": 1,
    "history_id": 2,
    "departure_station": "ST-999",
    "arrival_station": "ST-998",
    "departure_time": "2021-10-01T14:46:00.000Z",
    "arrival_time": "2021-10-01T14:50:00.000Z",
    "use_time": 10,
    "use_distance": 1000,
    "return_status": 1
  },{
    "user_id": 1,
    "bike_id": 1,
    "history_id": 3,
    "departure_station": "ST-999",
    "arrival_station": "ST-998",
    "departure_time": "2021-10-01T14:46:00.000Z",
    "arrival_time": "2021-10-01T14:50:00.000Z",
    "use_time": 10,
    "use_distance": 1000,
    "return_status": 1
  },
];

const AdminRentHistory = () => {
  const [historyData, setHistoryData] = useState(mock);
  useEffect(() => {
    // TODO: Fetch data
  }, []);
  return (
    <TableContainer component={Paper}>
      <TableHead>
        <TableRow>
          <TableCell className="tablecell">
            <Typography variant="span">번호</Typography>
          </TableCell>
          <TableCell className="tablecell">
            <Typography variant="span">유저명</Typography>
          </TableCell>
          <TableCell className="tablecell">
            <Typography variant="span">자전거명</Typography>
          </TableCell>
          <TableCell className="tablecell">
            <Typography variant="span">출발지</Typography>
          </TableCell>
          <TableCell className="tablecell">
            <Typography variant="span">도착지</Typography>
          </TableCell>
          <TableCell className="tablecell">
            <Typography variant="span">출발시간</Typography>
          </TableCell>
          <TableCell className="tablecell">
            <Typography variant="span">도착시간</Typography>
          </TableCell>
          <TableCell className="tablecell">
            <Typography variant="span">이용 시간</Typography>
          </TableCell>
          <TableCell className="tablecell">
            <Typography variant="span">이용 거리</Typography>
          </TableCell>
          <TableCell className="tablecell">
            <Typography variant="span">이용 결과</Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {historyData && historyData.length > 0 ? (
          historyData.map((row, index) => (
            <TableRow>
              <TableCell className="tablecell">
                <Typography variant="span">{row.history_id}</Typography>
              </TableCell>
              <TableCell className="tablecell">
                <Typography variant="span">{row.user_id}</Typography>
              </TableCell>
              <TableCell className="tablecell">
                <Typography variant="span">{row.bike_id}</Typography>
              </TableCell>
              <TableCell className="tablecell">
                <Typography variant="span">{row.departure_station}</Typography>
              </TableCell>
              <TableCell className="tablecell">
                <Typography variant="span">{row.arrival_station}</Typography>
              </TableCell>
              <TableCell className="tablecell">
                <Typography variant="span">{moment(row.departure_time).format("YYYY-MM-DD HH:mm:ss")}</Typography>
              </TableCell>
              <TableCell className="tablecell">
                <Typography variant="span">{moment(row.arrival_time).format("YYYY-MM-DD HH:mm:ss")}</Typography>
              </TableCell>
              <TableCell className="tablecell">
                <Typography variant="span">{row.use_time}</Typography>
              </TableCell>
              <TableCell className="tablecell">
                <Typography variant="span">{row.use_distance}</Typography>
              </TableCell>
              <TableCell className="tablecell">
                <Typography variant="span">{row.return_status}</Typography>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={10} className="tablecell">
              <Typography variant="span">데이터가 없습니다.</Typography>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </TableContainer>
  );
};

export default AdminRentHistory;
