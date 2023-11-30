import { Container, Typography } from "@mui/material";
import BoardWrite from "../components/BoardWrite";

const FreeBoardWrite = () => {
  return (
    <Container component="main" maxWidth="md">
      <Typography component="h1" variant="h5" sx={{ py: 3 }}>
        자유게시판
      </Typography>
      <BoardWrite category_id={2} beforeLink={"/board?id=free"} />
    </Container>
  );
};

export default FreeBoardWrite;
