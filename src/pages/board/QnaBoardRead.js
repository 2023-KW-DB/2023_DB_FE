import { Container, Typography } from "@mui/material";
import BoardRead from "../components/BoardRead";
import { useSearchParams } from "react-router-dom";

const QnaBoardRead = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("id");
  return (
    <Container component="main" maxWidth="md">
      <Typography component="h1" variant="h5" sx={{ py: 3 }}>
        1:1 문의 게시판
      </Typography>
      <BoardRead category_id={3} board_id={query} beforeLink="/board?id=qna" editLink="/board/qna/edit" />
    </Container>
  );
};

export default QnaBoardRead;
