import { Box, Container, Table, TableBody, TableHead, TableCell, TableRow, TableContainer, Typography, Link } from "@mui/material";
import { useEffect, useState } from "react";
import { ConfirmationNumber, Redeem } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import moment from "moment";
const mock = [{
    "category_id": 1,
    "id": 1,
    "user_id": 1,
    "views": 13,
    "title": "테스트",
    "content": "테스트",
    "is_notice": true,
    "created_at": "2021-10-01T14:46:00.000Z",
    "updated_at": "2021-10-01T14:46:00.000Z",
}, {
    "category_id": 1,
    "id": 2,
    "user_id": 1,
    "views": 13,
    "title": "테스트2",
    "content": "테스트2",
    "is_notice": true,
    "created_at": "2021-10-01T14:46:00.000Z",
    "updated_at": "2021-10-01T14:46:00.000Z",
},{
    "category_id": 1,
    "id": 3,
    "user_id": 1,
    "views": 26,
    "title": "테스트3",
    "content": "테스트3",
    "is_notice": false,
    "created_at": "2021-10-01T14:46:00.000Z",
    "updated_at": "2021-10-01T14:46:00.000Z",
},



]


const BoardList = ({category_id, datas = mock}) => {

  const [boardData, setBoardData] = useState(datas); 

  useEffect(() => {
    (async() => {
      // TODO: get data from server
      console.log(process.env.REACT_APP_API_URL + `/board/get-category-titles?category_id=${category_id}`)
      try {
        const response = await fetch(process.env.REACT_APP_API_URL + `/board/get-category-titles?category_id=${category_id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (response.status !== 200) {
          throw new Error("데이터를 가져오는데 실패하였습니다.");
        }
        const jsonData = await response.json();
        console.log(jsonData.result)
        setBoardData(jsonData.result);
      } catch (error) {
        alert("데이터를 가져오는데 실패하였습니다.");
      }
    })()
  }, [])
  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            { category_id === 1 && ( <>
              <TableCell align="center" sx={{width: "10%"}}>번호</TableCell>
              <TableCell align="center" sx={{width: "50%"}}>제목</TableCell>
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
          </TableRow>
        </TableHead>
        <TableBody>
            {boardData && boardData.length > 0 && boardData.map((data) =>
             (data.category_id === category_id &&
                <TableRow
                  key={data.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center">{data.id}</TableCell>
                  <TableCell align="center">
                    <Link component={RouterLink} to={`/board/notice/read?id=${data.id}`} sx={{width: "100%"}}>
                      {data.title}
                    </Link>
                  </TableCell>
                  <TableCell align="center">{data.user_name}</TableCell>
                  <TableCell align="center">{data.views}</TableCell>
                  <TableCell align="center">{moment(data.created_at).format("YYYY-MM-DD HH:mm")}</TableCell>
                </TableRow>
             )
            )}
            {!boardData && (
              <TableRow>
                <TableCell colSpan={5} align="center">데이터가 없습니다.</TableCell>
              </TableRow>
            )}
            {boardData && boardData.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">데이터가 없습니다.</TableCell>
              </TableRow>
            )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default BoardList;