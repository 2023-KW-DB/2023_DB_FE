import { Box, Container, TextField, Typography, Divider, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { ConfirmationNumber, Redeem } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import moment from "moment";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import "./read.css";
import { useSelector } from "react-redux";
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
  "commentDtoList": [{
    "id": 1,
    "username": "수정된테",
    "write_id": 1,
    "category_id": 1,
    "content": "댓글입니다..",
    "likeCount": 0,
    "userLiked": false,
    "created_at": "2023-11-24T15:14:59",
    "updated_at": "2023-11-24T15:14:59"
  }]
}


const BoardRead = ({board_id, data = mock}) => {
  const [boardData, setBoardData] = useState(data);
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [useAnimate, setUseAnimate] = useState(true);
  const [myComment, setMyComment] = useState("");
  const user = useSelector((state) => state.user);
  
  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async() => {
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
  }

  const postLikeHandler = () => {
    (async() => {
        try {
          if (!like) {
          const response = await fetch(process.env.REACT_APP_API_URL + `/board/like`, {
            method: "POST",
            body: JSON.stringify({
              user_id: user.id,
              liked_id: boardData.id,
              category_id: boardData.category_id
            }),
            headers: { "Content-Type": "application/json" },
          });
          setLikeCount(like ? likeCount - 1 : likeCount + 1)
          setLike(!like)
        } else {
          const response = await fetch(process.env.REACT_APP_API_URL + `/board/like-cancel`, {
            method: "DELETE",
            body: JSON.stringify({
              user_id: user.id,
              liked_id: boardData.id,
              category_id: boardData.category_id
            }),
            headers: { "Content-Type": "application/json" },
          });
          setLikeCount(like ? likeCount - 1 : likeCount + 1)
          setLike(!like)
        }
      } catch (e) {
        alert("데이터를 처리하는데 실패하였습니다.")
      }
      
    })();
  }

  const postCommentLikeHandler = (id) => {
    const newComments = comments.map((comment) => {
      if (comment.id === id) {
        (async() => {
          try {
            if (!comment.userLiked) {
              const response = await fetch(process.env.REACT_APP_API_URL + `/board/comment/like`, {
                method: "POST",
                body: JSON.stringify({
                  user_id: user.id,
                  liked_id: comment.id,
                }),
                headers: { "Content-Type": "application/json" },
              });
            } else {
              const response = await fetch(process.env.REACT_APP_API_URL + `/board/comment/like-cancel`, {
                method: "DELETE",
                body: JSON.stringify({
                  user_id: user.id,
                  liked_id: comment.id,
                }),
                headers: { "Content-Type": "application/json" },
              });
            }
          } catch (e) {
            alert("데이터를 처리하는데 실패하였습니다.")
          }
        })();
        console.log("Good");
        return {
          ...comment,
          is_like: !comment.is_like,
          like: comment.is_like ? comment.like - 1 : comment.like + 1
        }
      }
      return comment
    })
    fetchData();
  }
  
  const submitCommentHandler = () => {
    (async() => {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL + `/board/comment-write`, {
          method: "POST",
          body: JSON.stringify({
            user_id: user.id,
            write_id: boardData.id,
            category_id: boardData.category_id,
            content: myComment
          }),
          headers: { "Content-Type": "application/json" },
        });
        if (response.status !== 200) {
          throw new Error("데이터를 가져오는데 실패하였습니다.");
        }
        const jsonData = await response.json();
        alert("댓글이 등록되었습니다.")
        fetchData();

      } catch (e) {
        alert("데이터를 처리하는데 실패하였습니다.")
      }
    })()
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
      <Box sx={{ minHeight: "300px", height: "300px", boxShadow: 1, p: 3}}>
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
                  comment.userLiked ?
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
                  {comment.likeCount}
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: "100%", justifyContent: "space-between", py: 2, pb: 10 }}>
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