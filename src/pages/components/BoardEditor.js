import React, { useRef, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import "./ckboard.css";

const BoardEditor = ({ setParentContent }) => {
  const titleRef = useRef();
  const [content, setContent] = useState("");

  const customUploadAdapter = (loader) => {
    return {
      upload() {
        // Convert data to base64...
        return loader.file.then((file) => {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("type", "image");
          return fetch(process.env.REACT_APP_API_URL + "/board/file-upload", {
            method: "POST",
            body: formData,
          })
            .then((res) => res.json())
            .then((res) => {
              console.log(res);
              const imageUrl = process.env.REACT_APP_API_URL + "/board/" + res.result.url;
              loader.uploaded = true;
              return {
                default: imageUrl,
              };
            });
        });
      },
    };
  };

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return customUploadAdapter(loader);
    };
  }

  return (
    <div className="Editor">
      <section>
        <CKEditor
          editor={ClassicEditor}
          data=""
          config={{ extraPlugins: [uploadPlugin] }}
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            setContent(editor.getData());
            setParentContent(editor.getData());
            console.log({ event, editor, content });
          }}
          onBlur={(event, editor) => {
            console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            console.log("Focus.", editor);
          }}
        />
      </section>
    </div>
  );
};

export default BoardEditor;
