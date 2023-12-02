import { Box, Container, TextField, Typography, Divider, Button, Checkbox, FormGroup, FormControlLabel } from "@mui/material";
import { useEffect, useState } from "react";
import { ConfirmationNumber, Redeem } from "@mui/icons-material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import moment from "moment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./ckboard.css";
import { useSelector } from "react-redux";
import BoardEditor from "./BoardEditor";
import UploadFileIcon from "@mui/icons-material/UploadFile";
const BoardWrite = ({ category_id = 1, beforeLink }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [setNotice, setSetNotice] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {}, []);

  const onSubmit = () => {
    // TODO: Fetch data into submit
    // TODO: Update image upload

    (async () => {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL + `/board/create-post`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            category_id: category_id,
            user_id: user.id,
            title: title,
            content: content,
            notice: setNotice,
            file_name: fileName,
            url: fileUrl,
          }),
        });
        if (response.status !== 200) {
          throw new Error("글 작성에 실패했습니다.");
        }
        const jsonData = await response.json();
        console.log(jsonData);
        alert("글 작성에 성공했습니다.");
        navigate(beforeLink);
      } catch (e) {
        alert("글 작성에 실패했습니다.");
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
      {user.user_type === 0 && (
        <FormGroup>
          <FormControlLabel control={<Checkbox checked={setNotice} onChange={(e) => setSetNotice(e.target.checked)} />} label="공지사항으로 지정" />
        </FormGroup>
      )}
      <Divider sx={{ my: 1 }} />

      <BoardEditor setParentContent={setContent} />

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

export default BoardWrite;
