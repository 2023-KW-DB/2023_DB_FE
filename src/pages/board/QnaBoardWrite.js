import { Container, Typography } from "@mui/material";
import BoardWrite from "../components/BoardWrite";

const QnaBoardWrite = () => {
  return (
    <Container component="main" maxWidth="md">
      <Typography component="h1" variant="h5" sx={{ py: 3 }}>
        1:1 문의 게시판
      </Typography>
      <BoardWrite category_id={3} beforeLink={"/board?id=qna"} />
    </Container>
  );
};

export default QnaBoardWrite;
