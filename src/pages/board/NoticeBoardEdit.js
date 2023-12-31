import { Container, Typography } from "@mui/material";
import BoardWrite from "../components/BoardWrite";
import BoardEdit from "../components/BoardEdit";

const NoticeBoardEdit = () => {
  return (
    <Container component="main" maxWidth="md">
      <Typography component="h1" variant="h5" sx={{ py: 3 }}>
        공지사항 수정
      </Typography>
      <BoardEdit category_id={1} beforeLink={"/board?id=notice"} />
    </Container>
  );
};

export default NoticeBoardEdit;
