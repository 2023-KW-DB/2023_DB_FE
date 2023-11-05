import { Container, Typography } from "@mui/material";
import BoardWrite from "./components/BoardWrite";

const NoticeBoardWrite = () => {
  return (
    <Container component="main" maxWidth="md">
      <Typography component="h1" variant="h5" sx={{py: 3}}>
        공지사항
      </Typography>
      <BoardWrite category_id={1} beforeLink={"/board/notice"}/>
    </Container>
    
  )
    
}

export default NoticeBoardWrite;