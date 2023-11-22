import { Container, Typography } from "@mui/material";
import BoardRead from "./components/BoardRead";
import { useSearchParams } from "react-router-dom";

const NoticeBoardRead = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("id");
  return (
    <Container component="main" maxWidth="md">
      <Typography component="h1" variant="h5" sx={{py: 3}}>
        공지사항
      </Typography>
      <BoardRead category_id={1} board_id={query} />
    </Container>
    
  )
    
}

export default NoticeBoardRead;