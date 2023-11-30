import { useSearchParams } from "react-router-dom";
import NoticeBoardList from "./board/NoticeBoardList";
import FreeBoardList from "./board/FreeBoardList";
import { Button, ButtonGroup, Container } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import ReportBoardList from "./board/ReportBoardList";
import QnaBoardList from "./board/QnaBoardList";
const Board = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("id");

  return (
    <Container component="main" maxWidth="md">
      <ButtonGroup variant="contained" aria-label="outlined primary button group" sx={{ my: 3 }}>
        <Button variant="contained" component={RouterLink} to="/board?id=notice">
          공지사항
        </Button>
        <Button variant="contained" component={RouterLink} to="/board?id=free">
          자유게시판
        </Button>
        <Button variant="contained" component={RouterLink} to="/board?id=report">
          고장신고게시판
        </Button>
        <Button variant="contained" component={RouterLink} to="/board?id=qna">
          1:1 문의
        </Button>
      </ButtonGroup>
      {query === "notice" && <NoticeBoardList />}
      {query === "free" && <FreeBoardList />}
      {query === "report" && <ReportBoardList />}
      {query === "qna" && <QnaBoardList />}
    </Container>
  );
};

export default Board;
