import { Container, Typography } from "@mui/material";
import BoardRead from "../components/BoardRead";
import { useSearchParams } from "react-router-dom";

const ReportBoardRead = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("id");
  return (
    <Container component="main" maxWidth="md">
      <Typography component="h1" variant="h5" sx={{ py: 3 }}>
        따릉이 고장 신고 게시판
      </Typography>
      <BoardRead category_id={4} board_id={query} beforeLink="/board?id=report" />
    </Container>
  );
};

export default ReportBoardRead;
