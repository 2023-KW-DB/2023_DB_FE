import { Button, Container, Typography, Link } from "@mui/material";
import BoardList from "../components/BoardList";
import { Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";
const NoticeBoardList = () => {
  const user = useSelector((state) => state.user);
  return (
    <Container component="main" maxWidth="md">
      <Typography component="h1" variant="h5" sx={{ py: 3 }}>
        공지사항
      </Typography>
      <BoardList category_id={1} />
      {user && user.type === 0 && (
        <Button variant="contained" color="primary" component={RouterLink} to="/board/notice/write" sx={{ mt: 3, mb: 2 }}>
          글쓰기
        </Button>
      )}
    </Container>
  );
};

export default NoticeBoardList;
