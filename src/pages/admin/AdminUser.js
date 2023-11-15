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
    id: 1,
    userid: "testuser1",
    username: "테스트유저1",
    usertype: "0",
    email: "testuser1@naver.com",
    phone_number: "010-1234-5678",
    weight: "70",
    age: "23",
    last_accessed_at: "2021-10-01T14:46:00.000Z",
    total_money: "100000",
  },
  {
    id: 2,
    userid: "testuser2",
    username: "테스트유저2",
    usertype: "0",
    email: "testuser2@naver.com",
    phone_number: "010-1234-5678",
    weight: "70",
    age: "23",
    last_accessed_at: "2021-10-01T14:46:00.000Z",
    total_money: "100000",
  },
  {
    id: 3,
    userid: "testuser3",
    username: "테스트유저3",
    usertype: "0",
    email: "testuser3@naver.com",
    phone_number: "010-1234-5678",
    weight: "70",
    age: "23",
    last_accessed_at: "2021-10-01T14:46:00.000Z",
    total_money: "100000",
  },
];

const AdminUser = () => {
  const [userData, setUserData] = useState(mock);
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
            <Typography variant="span">아이디</Typography>
          </TableCell>
          <TableCell className="tablecell">
            <Typography variant="span">이메일</Typography>
          </TableCell>
          <TableCell className="tablecell">
            <Typography variant="span">이름</Typography>
          </TableCell>
          <TableCell className="tablecell">
            <Typography variant="span">전화번호</Typography>
          </TableCell>
          <TableCell className="tablecell">
            <Typography variant="span">무게</Typography>
          </TableCell>
          <TableCell className="tablecell">
            <Typography variant="span">나이</Typography>
          </TableCell>
          <TableCell className="tablecell">
            <Typography variant="span">마지막 접속시간</Typography>
          </TableCell>
          <TableCell className="tablecell">
            <Typography variant="span">보유금액</Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {userData && userData.length > 0 ? (
          userData.map((row, index) => (
            <TableRow>
              <TableCell className="tablecell">
                <Typography variant="span">{index + 1}</Typography>
              </TableCell>
              <TableCell className="tablecell">
                <Typography variant="span">{row.userid}</Typography>
              </TableCell>
              <TableCell className="tablecell">
                <Typography variant="span">{row.email}</Typography>
              </TableCell>
              <TableCell className="tablecell">
                <Typography variant="span">{row.username}</Typography>
              </TableCell>
              <TableCell className="tablecell">
                <Typography variant="span">{row.phone_number}</Typography>
              </TableCell>
              <TableCell className="tablecell">
                <Typography variant="span">{row.weight}</Typography>
              </TableCell>
              <TableCell className="tablecell">
                <Typography variant="span">{row.age}</Typography>
              </TableCell>
              <TableCell className="tablecell">
                <Typography variant="span">{moment(row.last_accessed_at).format("YYYY-MM-DD HH:mm:ss")}</Typography>
              </TableCell>
              <TableCell className="tablecell">
                <Typography variant="span">{row.total_money}</Typography>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={9} align="center">
              <Typography variant="span">데이터가 없습니다.</Typography>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </TableContainer>
  );
};

export default AdminUser;
