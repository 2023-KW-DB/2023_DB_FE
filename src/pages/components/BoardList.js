import {
  Box,
  Container,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  TableContainer,
  Typography,
  Link,
  ButtonGroup,
  Button,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { ConfirmationNumber, Redeem } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import moment from "moment";
import { useSelector } from "react-redux";
const mock = [
  {
    category_id: 1,
    id: 1,
    user_id: 1,
    views: 13,
    title: "테스트",
    content: "테스트",
    is_notice: true,
    created_at: "2021-10-01T14:46:00.000Z",
    updated_at: "2021-10-01T14:46:00.000Z",
  },
  {
    category_id: 1,
    id: 2,
    user_id: 1,
    views: 13,
    title: "테스트2",
    content: "테스트2",
    is_notice: true,
    created_at: "2021-10-01T14:46:00.000Z",
    updated_at: "2021-10-01T14:46:00.000Z",
  },
  {
    category_id: 1,
    id: 3,
    user_id: 1,
    views: 26,
    title: "테스트3",
    content: "테스트3",
    is_notice: false,
    created_at: "2021-10-01T14:46:00.000Z",
    updated_at: "2021-10-01T14:46:00.000Z",
  },
];

const BoardList = ({ category_id, datas = [] }) => {
  const [boardData, setBoardData] = useState(datas);
  const [noticeData, setNoticeData] = useState([]);
  const [showData, setShowData] = useState([mock[0]]);
  const [page, setPages] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [isLoad, setIsLoad] = useState(false);
  const user = useSelector((state) => state.user);

  const readPage =
    category_id === 1
      ? "/board/notice/read"
      : category_id === 2
      ? "/board/free/read"
      : category_id === 3
      ? "/board/qna/read"
      : category_id === 4
      ? "/board/report/read"
      : "";

  useEffect(() => {
    (async () => {
      // TODO: get data from server

      try {
        let url = "";
        if (category_id === 1) {
          url = `/board/get-notice-titles`;
        } else {
          url = `/board/get-category-titles?category_id=${category_id}`;
        }
        const response = await fetch(process.env.REACT_APP_API_URL + url, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (response.status !== 200) {
          throw new Error("데이터를 가져오는데 실패하였습니다.");
        }
        const jsonData = await response.json();
        let boardData = jsonData.result.filter((data) => data.notice === false);
        let noticeData = jsonData.result.filter((data) => data.notice === true);
        // Sort data by id
        // boardData.sort((a, b) => a.id - b.id);
        // noticeData.sort((a, b) => a.id - b.id);
        for (let i = 0; i < boardData.length; i++) {
          boardData[i].showIndex = boardData.length - i;
        }
        for (let i = 0; i < noticeData.length; i++) {
          noticeData[i].showIndex = noticeData.length - i;
        }
        console.log(boardData, noticeData);
        setNoticeData(noticeData);
        setBoardData(boardData);
        setTotalPage(parseInt(boardData.length / 10) + 1);
        setShowData(boardData.slice(0, 10));
        setIsLoad(true);
      } catch (error) {
        alert("데이터를 가져오는데 실패하였습니다.");
      }
    })();
  }, []);

  useEffect(() => {
    setShowData(boardData.slice((page - 1) * 10, page * 10));
  }, [page]);

  return (
    <>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {category_id === 1 && (
                <>
                  <TableCell align="center" sx={{ width: "10%" }}>
                    번호
                  </TableCell>
                  <TableCell align="center" sx={{ width: "50%" }}>
                    제목
                  </TableCell>
                  <TableCell align="center">작성자</TableCell>
                  <TableCell align="center">조회수</TableCell>
                  <TableCell align="center">작성일</TableCell>
                </>
              )}
              {category_id === 2 && (
                <>
                  <TableCell align="center">번호</TableCell>
                  <TableCell align="center">제목</TableCell>
                  <TableCell align="center">작성자</TableCell>
                  <TableCell align="center">조회수</TableCell>
                  <TableCell align="center">작성일</TableCell>
                </>
              )}
              {category_id === 3 && (
                <>
                  <TableCell align="center">번호</TableCell>
                  <TableCell align="center">제목</TableCell>
                  <TableCell align="center">작성자</TableCell>
                  <TableCell align="center">조회수</TableCell>
                  <TableCell align="center">작성일</TableCell>
                </>
              )}
              {category_id === 4 && (
                <>
                  <TableCell align="center">번호</TableCell>
                  <TableCell align="center">제목</TableCell>
                  <TableCell align="center">작성자</TableCell>
                  <TableCell align="center">조회수</TableCell>
                  <TableCell align="center">작성일</TableCell>
                </>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {noticeData &&
              noticeData.length > 0 &&
              noticeData.map(
                (data) =>
                  (category_id === 1 || data.category_id === category_id) && (
                    <TableRow key={data.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                      <TableCell align="center">[공지]</TableCell>
                      <TableCell align="center">
                        <Link component={RouterLink} to={readPage + "?id=" + data.id} sx={{ width: "100%" }}>
                          {data.title} {data.commentCount > 0 && <span>&nbsp; [{data.commentCount}]</span>}
                        </Link>
                      </TableCell>
                      <TableCell align="center">{data.user_name}</TableCell>
                      <TableCell align="center">{data.views}</TableCell>
                      <TableCell align="center">{moment(data.created_at).format("YYYY-MM-DD HH:mm")}</TableCell>
                    </TableRow>
                  ),
              )}
            {showData &&
              showData.length > 0 &&
              showData.map((data, idx) => {
                if (data.category_id !== category_id) return;
                if (user.user_type === 1 && data.category_id === 3 && user.username !== data.user_name) return;
                return (
                  <TableRow key={data.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell align="center">{data.showIndex}</TableCell>
                    <TableCell align="center">
                      <Link component={RouterLink} to={readPage + "?id=" + data.id} sx={{ width: "100%" }}>
                        {data.title} {data.commentCount > 0 && <span>&nbsp; [{data.commentCount}]</span>}
                      </Link>
                    </TableCell>
                    <TableCell align="center">{data.user_name}</TableCell>
                    <TableCell align="center">{data.views}</TableCell>
                    <TableCell align="center">{moment(data.created_at).format("YYYY-MM-DD HH:mm")}</TableCell>
                  </TableRow>
                );
              })}
            {!isLoad ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              <>
                {!boardData && !noticeData && (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      데이터가 없습니다.
                    </TableCell>
                  </TableRow>
                )}
                {boardData && boardData.length === 0 && noticeData && noticeData.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      데이터가 없습니다.
                    </TableCell>
                  </TableRow>
                )}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          mt: 2,
        }}
      >
        <ButtonGroup>
          <Button onClick={() => setPages(page - 1 > 0 ? page - 1 : 1)}>이전</Button>
          <Button>{page}</Button>
          <Button onClick={() => setPages(page + 1 < totalPage ? page + 1 : totalPage)}>다음</Button>
        </ButtonGroup>
      </Box>
    </>
  );
};

export default BoardList;
