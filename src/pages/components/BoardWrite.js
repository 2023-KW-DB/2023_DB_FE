import { Box, Container, TextField, Typography, Divider, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { ConfirmationNumber, Redeem } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import moment from "moment";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import "./ckboard.css";
const BoardWrite = ({category_id = 1, beforeLink}) => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  useEffect(() => {
    
  }, [])


  const onSubmit = () => {
    console.log("submit")
    console.log(title)
    console.log(content)
    // TODO: Fetch data into submit
    // TODO: Update image upload
  }
  return (
    <Container>
      <Divider sx={{my: 1}} />
      <TextField id="standard-basic" label=""
        variant="standard"
        placeholder="제목"
        sx={{ width: "100%" }}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Divider sx={{my: 1}} />
      <CKEditor
        editor={ ClassicEditor }
        data={content}
        onReady={ editor => {
            // You can store the "editor" and use when it is needed.
            console.log( 'Editor is ready to use!', editor );
        } }
        onChange={ ( event, editor ) => {
            const data = editor.getData();
            console.log( { event, editor, data } );
            setContent(data)
        } }
        onBlur={ ( event, editor ) => {
            console.log( 'Blur.', editor );
        } }
        onFocus={ ( event, editor ) => {
            console.log( 'Focus.', editor );
        } }
      />
      <Box sx={{ my: 2, display: 'flex', flexDirection: 'row', alignItems: 'center', width: "100%", justifyContent: "space-between" }}>
        <Button variant="contained" color="warning" sx={{ width: "250px" }} component={RouterLink} to={beforeLink}>
          뒤로가기
        </Button>
        <Button variant="contained" color="primary" sx={{ width: "250px" }} onClick={onSubmit}>
          등록
        </Button>
      </Box>
      
      
    </Container>
  )
}

export default BoardWrite;