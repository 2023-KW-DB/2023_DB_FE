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
    lendplace_id: "ST-10",
    use_status: 0,
    bike_status: 0,
  },
  {
    id: 2,
    lendplace_id: "ST-100",
    use_status: 0,
    bike_status: 1,
  },
  {
    id: 3,
    lendplace_id: "ST-100",
    use_status: 0,
    bike_status: 1,
  },
];

const AdminBike = () => {
  const [bikeData, setBikeData] = useState(mock);
  const [showData, setShowData] = useState([mock[0]]);
  const [page, setPages] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  useEffect(() => {
    // TODO: Fetch data
    (async () => {
      try {
        const response = await fetch(
          process.env.REACT_APP_API_URL + "/bike/get-all",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          },
        );
        if (response.status !== 200) {
          throw new Error("데이터를 가져오는데 실패하였습니다.");
        }
        const jsonData = await response.json();
        setBikeData(jsonData.result);
        setTotalPage(parseInt(jsonData.result.length / 10) + 1);
        setShowData(jsonData.result.slice(0, 10));
      } catch (error) {
        alert("데이터를 가져오는데 실패하였습니다.");
      }
    })();
  }, []);

  useEffect(() => {
    setShowData(bikeData.slice((page - 1) * 10, page * 10));
  }, [page]);

  const handleRemoveBikeStation = (id) => {
    (async () => {
      try {
        const response = await fetch(
          process.env.REACT_APP_API_URL + "/bike/delete",
          {
            method: "DELETE",
            body: JSON.stringify({
              id: id,
            }),
            headers: { "Content-Type": "application/json" },
          },
        );
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
          <TableHead>
            <TableRow>
              <TableCell className="user-bike-cell">
                <Typography variant="span">ID</Typography>
              </TableCell>
              <TableCell className="user-bike-cell">
                <Typography variant="span">대여소 위치</Typography>
              </TableCell>
              <TableCell className="user-bike-cell">
                <Typography variant="span">사용 여부</Typography>
              </TableCell>
              <TableCell className="user-bike-cell">
                <Typography variant="span">자전거 상태</Typography>
              </TableCell>
              <TableCell className="user-bike-cell">
                <Typography variant="span">수정</Typography>
              </TableCell>
              <TableCell className="user-bike-cell">
                <Typography variant="span">삭제</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {showData && showData.length > 0 ? (
              <>
                {showData.map((row, index) => (
                  <TableRow>
                    <TableCell className="user-bike-cell">
                      <Typography variant="span">{row.id}</Typography>
                    </TableCell>
                    <TableCell className="user-bike-cell">
                      <Typography variant="span">{row.lendplace_id}</Typography>
                    </TableCell>
                    <TableCell className="user-bike-cell">
                      <Typography variant="span">
                        {row.use_status ? "사용중" : "미사용중"}
                      </Typography>
                    </TableCell>
                    <TableCell className="user-bike-cell">
                      <Typography variant="span">
                        {row.bike_status ? "사용 가능" : "사용 불가능"}
                      </Typography>
                    </TableCell>
                    <TableCell className="user-bike-cell">
                      <Button
                        variant="contained"
                        component={RouterLink}
                        to={`/admin/bike/edit?id=${row.id}`}
                      >
                        수정
                      </Button>
                    </TableCell>
                    <TableCell className="user-bike-cell">
                      <Button
                        variant="contained"
                        onClick={() => {
                          if (window.confirm("정말로 삭제하시겠습니까?")) {
                            handleRemoveBikeStation(row.id);
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
                <TableCell colSpan={6} align="center">
                  <Typography variant="span">데이터가 없습니다.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          py: 3,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          component={RouterLink}
          to={`/admin/bike/add`}
        >
          추가
        </Button>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <ButtonGroup>
            <Button onClick={() => setPages(page - 1 > 0 ? page - 1 : 1)}>
              이전
            </Button>
            <Button>{page}</Button>
            <Button
              onClick={() =>
                setPages(page + 1 < totalPage ? page + 1 : totalPage)
              }
            >
              다음
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
    </>
  );
};

export default AdminBike;
