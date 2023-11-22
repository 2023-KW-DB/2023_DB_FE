import { Box, Container, TextField, Typography, Divider, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { ConfirmationNumber, Redeem } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import moment from "moment";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import "./read.css";
const mock = {
    "id": 1,
    "category_id": 1,
    "user_name": "김데베",
    "views": 2,
    "title": "세 번째 글",
    "content": "세 번째 글 내용",
    "notice": false,
    "file_name": "temp",
    "url": "~~",
    "likeCount": 0,
    "userLiked": false,
    "created_at": "2023-11-23T03:25:02",
    "updated_at": "2023-11-23T03:25:02",
    "commentDtoList": []
}


const BoardRead = ({board_id, data = mock}) => {
  const [boardData, setBoardData] = useState(data);
  const [like, setLike] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [comments, setComments] = useState([])
  const [useAnimate, setUseAnimate] = useState(true)
  const [myComment, setMyComment] = useState("")
  
  useEffect(() => {
    // setLike(data.is_like)
    // setLikeCount(data.like)
    // setComments(data.comments)
    (async() => {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL + `/board/get-board?id=${board_id}&user_id=1`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (response.status !== 200) {
          throw new Error("데이터를 가져오는데 실패하였습니다.");
        }
        const jsonData = await response.json();
        console.log(jsonData.result)
        setBoardData(jsonData.result);
        setLike(jsonData.result.userLiked);
        setLikeCount(jsonData.result.likeCount);
        setComments(jsonData.result.commentDtoList);
      } catch (e) {
        alert("데이터를 가져오는데 실패하였습니다.")
      }
    })()
  }, [])
  const postLikeHandler = () => {
    setLikeCount(like ? likeCount - 1 : likeCount + 1)
    // TODO: Fetch data into submit
    setLike(!like)
  }
  const postCommentLikeHandler = (id) => {
    const newComments = comments.map((comment) => {
      if (comment.id === id) {
        return {
          ...comment,
          is_like: !comment.is_like,
          like: comment.is_like ? comment.like - 1 : comment.like + 1
        }
      }
      return comment
    })
    // TODO: Fetch data into submit
    setComments(newComments);
  }
  const submitCommentHandler = () => {
    console.log(myComment)
    // TODO: Fetch data into submit
  }
  return (
    <Container>
      <Divider sx={{my: 1}} />
      {/* <TextField id="standard-basic" label="" variant="standard"
        defaultValue={data.title}
        InputProps={{ readOnly: true }}
        sx={{ height: "200px"}}
      /> */}
      <Typography component="h3" variant="h5" sx={{py: 1}}>
        {boardData.title}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: "100%", justifyContent: "space-between" }}>
        <Typography>
          작성자: {boardData.user_name}
        </Typography>
        <Typography>
          작성일: {moment(boardData.created_at).format("YYYY-MM-DD")}
        </Typography>
      </Box>
      <Divider sx={{my: 3}} />
      <Box sx={{ minHeight: "300px", height: "300px"}}>
        <Typography component="span">
          {/* html insert */}
          <div dangerouslySetInnerHTML={{__html: boardData.content}} />
        </Typography>
      </Box>
      {/* 버튼 목록 */}
      <Box sx={{ display: 'flex', my: 3, flexDirection: 'row', alignItems: 'center', width: "100%", justifyContent: "space-between" }}>
        <Button variant="contained" sx={{mt: 3}} component={RouterLink} to="/board/notice">목록으로 이동</Button>
        <Box>
          {
            like ? <FavoriteIcon 
                  className={useAnimate && "heart-animate"}
                  sx={{mr: 1, cursor: "pointer", width: "100%", textAlign: "center", color: "#FF3040"}}
                  onClick={postLikeHandler}
                  /> : <FavoriteBorderOutlinedIcon
                  sx={{mr: 1, cursor: "pointer", width: "100%", textAlign: "center"}}
                  onClick={postLikeHandler}
                  />
          }
          <Typography sx={{ width: "100%", textAlign: "center"}}>
            {likeCount}
          </Typography>
        </Box>
      </Box>
      <Box>
        {comments && comments.map((comment) => (
          <Box sx={{ boxShadow: 1, p: 3, m: 1, my: 3}}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: "100%", justifyContent: "space-between" }}>
              <Typography>
                {comment.username}
              </Typography>
              <Typography>
                {moment(comment.created_at).format("YYYY-MM-DD HH:mm")}
              </Typography>
            </Box>
            <Divider sx={{width: "300px"}} />
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: "100%", justifyContent: "space-between" }}>
              <Typography>
                {comment.content}
              </Typography>
              <Box>
                {
                  comment.is_like ?
                    <FavoriteIcon
                      className={useAnimate && "heart-animate"}
                      sx={{mr: 1, width: "100%", textAlign: "center", cursor: "pointer", color: "#FF3040" }}
                      onClick={() => postCommentLikeHandler(comment.id)}
                    /> : <FavoriteBorderOutlinedIcon
                      sx={{mr: 1, width: "100%", textAlign: "center", cursor: "pointer" }}
                      onClick={() => postCommentLikeHandler(comment.id)}
                    />
                }
                <Typography sx={{ width: "100%", textAlign: "center"}}>
                  {comment.like}
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: "100%", justifyContent: "space-between" }}>
        <TextField id="standard-basic" label="댓글" variant="standard"
          sx={{ width: "100%", mx: 2 }}
          onChange={(e) => setMyComment(e.target.value)}
        />
        <Button variant="contained" sx={{mt: 3}} onClick={submitCommentHandler}>등록</Button>
        </Box>


      </Box>
      
    </Container>
  )
}

export default BoardRead;