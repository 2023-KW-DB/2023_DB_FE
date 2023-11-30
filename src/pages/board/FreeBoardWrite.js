import { Container, Typography } from "@mui/material";
import BoardWrite from "../components/BoardWrite";

const NoticeBoardWrite = () => {
  return (
    <Container component="main" maxWidth="md">
      <Typography component="h1" variant="h5" sx={{ py: 3 }}>
        자유게시판
      </Typography>
      <BoardWrite category_id={2} beforeLink={"/board/free"} />
    </Container>
  );
};

export default NoticeBoardWrite;
