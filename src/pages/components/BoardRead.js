import { Box, Container, TextField, Typography, Divider, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { ConfirmationNumber, Redeem } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import moment from "moment";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import "./read.css";
const mock = {
    "category_id": 1,
    "id": 1,
    "user_id": 1,
    "views": 13,
    "title": "테스트",
    "content": "lorem ipsum<br>test",
    "is_notice": true,
    "created_at": "2021-10-01T14:46:00.000Z",
    "updated_at": "2021-10-01T14:46:00.000Z",
    "like": 10,
    "is_like": true,
    "comments": [{
      "id": 1,
      "user_id": 2,
      "username": "테스트유저1",
      "content": "테스트 댓글",
      "created_at": "2021-10-01T14:46:00.000Z",
      "updated_at": "2021-10-01T14:46:00.000Z",
      "like": 3,
      "is_like": true,
    }, {
      "id": 2,
      "user_id": 3,
      "username": "테스트유저2",
      "content": "테스트 댓글2",
      "created_at": "2021-10-01T14:46:00.000Z",
      "updated_at": "2021-10-01T14:46:00.000Z",
      "like": 4,
      "is_like": false
    }]
}


const BoardRead = ({data = mock}) => {
  const [like, setLike] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [comments, setComments] = useState([])
  const [useAnimate, setUseAnimate] = useState(true)
  const [myComment, setMyComment] = useState("")
  useEffect(() => {
    setLike(data.is_like)
    setLikeCount(data.like)
    setComments(data.comments)
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
        {data.title}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: "100%", justifyContent: "space-between" }}>
        <Typography>
          작성자: {data.user_id}
        </Typography>
        <Typography>
          작성일: {moment(data.created_at).format("YYYY-MM-DD")}
        </Typography>
      </Box>
      <Divider sx={{my: 3}} />
      <Box sx={{ minHeight: "300px", height: "300px"}}>
        <Typography component="span">
          {/* html insert */}
          <div dangerouslySetInnerHTML={{__html: data.content}} />
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
        {comments.map((comment) => (
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