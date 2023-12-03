import { Box, Container, TextField, Typography, Divider, Button, Checkbox, FormGroup, FormControlLabel } from "@mui/material";
import { useEffect, useState } from "react";
import { ConfirmationNumber, Redeem } from "@mui/icons-material";
import { Link as RouterLink, useNavigate, useSearchParams } from "react-router-dom";
import moment from "moment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./ckboard.css";
import { useSelector } from "react-redux";
import BoardEditor from "./BoardEditor";
import UploadFileIcon from "@mui/icons-material/UploadFile";
const BoardEdit = ({ category_id = 1, beforeLink }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [setNotice, setSetNotice] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [file, setFile] = useState(null);
  const [boardId, setBoardId] = useState(null);
  const [boardCategoryId, setBoardCategoryId] = useState(null);
  const [boardUserId, setBoardUserId] = useState(null);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [useSearchParam] = useSearchParams();
  const query = useSearchParam.get("id");
  useEffect(() => {
    if (!query) return;
    if (!user) return;
    if (!user.id) return;
    (async () => {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL + `/board/get-board?id=${query}&user_id=${user.id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (response.status !== 200) {
          throw new Error("글을 가져오지 못했습니다.");
        }
        console.log("====fetch data");
        const jsonData = await response.json();
        console.log(jsonData);
        setTitle(jsonData.result.title);
        setContent(jsonData.result.content);
        setSetNotice(jsonData.result.is_notice);
        setFileName(jsonData.result.file_name);
        setFileUrl(jsonData.result.url);
        setBoardId(jsonData.result.id);
        setBoardCategoryId(jsonData.result.category_id);
        setBoardUserId(jsonData.result.user_id);
      } catch (e) {
        alert("글을 가져오지 못했습니다.");
      }
    })();
  }, [query, user]);

  const onSubmit = () => {
    // TODO: Fetch data into submit
    // TODO: Update image upload
    
    (async () => {

      console.log(boardUserId);
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/board/modify-board`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: boardId,
            category_id: boardCategoryId,
            user_id: boardUserId,
            title: title,
            content: content,
            notice: setNotice,
            file_name: fileName,
            url: fileUrl,
          }),
        });
        if (response.status !== 200) {
          throw new Error("글 수정에 실패했습니다.");
        }
        const jsonData = await response.json();
        console.log(jsonData);
        alert("글 수정에 성공했습니다.");
        navigate(beforeLink);
      } catch (e) {
        alert("글 수정에 실패했습니다.");
      }
    })();
  };

  const handleFileUpload = (e) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    const { name } = file;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", "octet-stream");
    fetch(process.env.REACT_APP_API_URL + "/board/file-upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        setFileName(res.result.file_name);
        setFileUrl(res.result.url);
      });
  };

  return (
    <Container>
      <Divider sx={{ my: 1 }} />
      <TextField
        id="standard-basic"
        label=""
        variant="standard"
        placeholder="제목"
        sx={{ width: "100%" }}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Divider sx={{ my: 1 }} />

      <BoardEditor setParentContent={setContent} initialContent={content} />

      <Box sx={{ my: 1 }}>
        <Button component="label" variant="contained" startIcon={<UploadFileIcon />} sx={{ marginRight: "1rem" }}>
          파일 첨부
          <input type="file" hidden onChange={handleFileUpload} />
        </Button>
        <Typography variant="span">{fileName}</Typography>
      </Box>
      <Box
        sx={{
          my: 2,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Button variant="contained" color="warning" sx={{ width: "250px" }} component={RouterLink} to={beforeLink}>
          뒤로가기
        </Button>
        <Button variant="contained" color="primary" sx={{ width: "250px" }} onClick={onSubmit}>
          등록
        </Button>
      </Box>
    </Container>
  );
};

export default BoardEdit;
