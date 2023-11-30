import { Button, Container, Typography, Link } from "@mui/material";
import BoardList from "../components/BoardList";
import { Link as RouterLink } from "react-router-dom";
const ReportBoardList = () => {
  return (
    <Container component="main" maxWidth="md">
      <Typography component="h1" variant="h5" sx={{ py: 3 }}>
        따릉이 고장 신고 게시판
      </Typography>
      <BoardList category_id={4} />
      <Button variant="contained" color="primary" component={RouterLink} to="/board/report/write" sx={{ mt: 3, mb: 2 }}>
        글쓰기
      </Button>
    </Container>
  );
};

export default ReportBoardList;
