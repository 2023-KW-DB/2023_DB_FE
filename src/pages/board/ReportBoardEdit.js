import { Container, Typography } from "@mui/material";
import BoardWrite from "../components/BoardWrite";
import BoardEdit from "../components/BoardEdit";

const ReportBoardEdit = () => {
  return (
    <Container component="main" maxWidth="md">
      <Typography component="h1" variant="h5" sx={{ py: 3 }}>
        따릉이 고장 신고 게시판 수정
      </Typography>
      <BoardEdit category_id={4} beforeLink={"/board?id=report"} />
    </Container>
  );
};

export default ReportBoardEdit;
