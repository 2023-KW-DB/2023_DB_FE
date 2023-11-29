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
    password: "abcd1234",
    username: "김데베",
    user_type: 1,
    email: "kw_db@kw.ac.kr",
    phone_number: "1.012345678E9",
    weight: 50.0,
    age: 20,
    last_accessed_at: null,
    total_money: 50000,
  },
];

const AdminUser = () => {
  const [userData, setUserData] = useState(mock);
  const [showData, setShowData] = useState([mock[0]]);
  const [page, setPages] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  useEffect(() => {
    // TODO: Fetch data
    (async () => {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL + "/admin/get-all-users", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (response.status !== 200) {
          throw new Error("데이터를 가져오는데 실패하였습니다.");
        }
        const jsonData = await response.json();
        setUserData(jsonData.result);
        setTotalPage(parseInt(jsonData.result.length / 10) + 1);
        setShowData(jsonData.result.slice(0, 10));
      } catch (error) {
        alert("데이터를 가져오는데 실패하였습니다.");
      }
    })();
  }, []);

  useEffect(() => {
    setShowData(userData.slice((page - 1) * 10, page * 10));
  }, [page]);

  const handleRemoveUser = (id) => {
    (async () => {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL + `/admin/delete-user`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: id,
          }),
        });
        if (response.status !== 200) {
          throw new Error("데이터를 삭제하는데 실패하였습니다.");
        }
        const jsonData = await response.json();
        if (jsonData.result === "success") {
          alert("데이터를 삭제하는데 성공하였습니다.");
          window.location.reload();
        } else {
          throw new Error("데이터를 삭제하는데 실패하였습니다.");
        }
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
              <TableCell className="user-table-cell">
                <Typography variant="span">번호</Typography>
              </TableCell>
              <TableCell className="user-table-cell">
                <Typography variant="span">이메일</Typography>
              </TableCell>
              <TableCell className="user-table-cell">
                <Typography variant="span">이름</Typography>
              </TableCell>
              <TableCell className="user-table-cell">
                <Typography variant="span">전화번호</Typography>
              </TableCell>
              <TableCell className="user-table-cell">
                <Typography variant="span">무게</Typography>
              </TableCell>
              <TableCell className="user-table-cell">
                <Typography variant="span">나이</Typography>
              </TableCell>
              <TableCell className="user-table-cell">
                <Typography variant="span">마지막 접속시간</Typography>
              </TableCell>
              <TableCell className="user-table-cell">
                <Typography variant="span">보유금액</Typography>
              </TableCell>
              <TableCell className="user-table-cell">
                <Typography variant="span">수정</Typography>
              </TableCell>
              <TableCell className="user-table-cell">
                <Typography variant="span">삭제</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ width: "100%" }}>
            {showData && showData.length > 0 ? (
              showData.map((row, index) => (
                <TableRow>
                  <TableCell className="user-table-cell">
                    <Typography variant="span">{row.id}</Typography>
                  </TableCell>
                  <TableCell className="user-table-cell">
                    <Typography variant="span">{row.email}</Typography>
                  </TableCell>
                  <TableCell className="user-table-cell">
                    <Typography variant="span">{row.username}</Typography>
                  </TableCell>
                  <TableCell className="user-table-cell">
                    <Typography variant="span">{row.phone_number}</Typography>
                  </TableCell>
                  <TableCell className="user-table-cell">
                    <Typography variant="span">{row.weight}</Typography>
                  </TableCell>
                  <TableCell className="user-table-cell">
                    <Typography variant="span">{row.age}</Typography>
                  </TableCell>
                  <TableCell className="user-table-cell">
                    <Typography variant="span">{moment(row.last_accessed_at).format("YYYY-MM-DD HH:mm:ss")}</Typography>
                  </TableCell>
                  <TableCell className="user-table-cell">
                    <Typography variant="span">{row.total_money}</Typography>
                  </TableCell>
                  <TableCell className="user-table-cell">
                    <Button variant="contained" component={RouterLink} to={`/admin/user/edit?id=${row.id}`}>
                      수정
                    </Button>
                  </TableCell>
                  <TableCell className="user-table-cell">
                    <Button
                      variant="contained"
                      onClick={() => {
                        if (window.confirm("정말로 삭제하시겠습니까?")) {
                          handleRemoveUser(row.id);
                        }
                      }}
                    >
                      삭제
                    </Button>
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

export default AdminUser;
