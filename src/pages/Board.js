import { useSearchParams } from "react-router-dom";

const Board = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("id");

  return (
    <Container component="main" maxWidth="md">
      <Typography component="h1" variant="h5" sx={{ py: 3 }}>
        자유게시판
      </Typography>
      <BoardList category_id={2} />
      <Button
        variant="contained"
        color="primary"
        component={RouterLink}
        to="/board/free/write"
        sx={{ mt: 3, mb: 2 }}
      >
        글쓰기
      </Button>
    </Container>
  );
};

export default Board;
