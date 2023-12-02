import { Container, Typography } from "@mui/material";
import BoardRead from "../components/BoardRead";
import { useSearchParams } from "react-router-dom";

const FreeBoardRead = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("id");
  return (
    <Container component="main" maxWidth="md">
      <Typography component="h1" variant="h5" sx={{ py: 3 }}>
        자유게시판
      </Typography>
      <BoardRead category_id={2} board_id={query} beforeLink={"/board?id=free"} editLink="/board/free/edit" />
    </Container>
  );
};

export default FreeBoardRead;
