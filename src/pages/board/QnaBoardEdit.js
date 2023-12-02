import { Container, Typography } from "@mui/material";
import BoardWrite from "../components/BoardWrite";
import BoardEdit from "../components/BoardEdit";

const QnaBoardEdit = () => {
  return (
    <Container component="main" maxWidth="md">
      <Typography component="h1" variant="h5" sx={{ py: 3 }}>
        1:1 문의 게시판 수정
      </Typography>
      <BoardEdit category_id={3} beforeLink={"/board?id=qna"} />
    </Container>
  );
};

export default QnaBoardEdit;
