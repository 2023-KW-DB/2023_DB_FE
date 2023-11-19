import React, { useState, useEffect } from "react";
import { Container, TextField, Button, Typography, Grid } from "@mui/material";

const mock= {
  email: "user1@gmail.com",
  name: "user1",
  age: 23,
  password: "1234",
  phone: "+82 01012345678",
  weight: 70,
};

const UserPage = () => {
  const [userData, setUserData] = useState(mock);
  const [editMode, setEditMode] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isPasswordSame, setIsPasswordSame] = useState(true);

  useEffect(() => {
    setUserData(mock);
  }, []);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setIsPasswordSame(true);
  };

  const handleSaveChanges = () => {
    if (password === mock.password) {

      if (newPassword === confirmNewPassword) {
        setUserData((prevUserData) => ({
          ...prevUserData,
          password: newPassword || prevUserData.password, 
        }));
       
        setEditMode(false);
        
        setPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
        setIsPasswordSame(true);
       
      } else {
        setIsPasswordSame(false);
      }
    } else {
      setIsPasswordSame(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography variant="h4" component="h1" sx={{ py: 2 }}>
        userpage
      </Typography>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="이메일"
              value={userData.email}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="이름"
              value={userData.name}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="나이"
              value={userData.age}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="기존 비밀번호"
              value={editMode ? password : "********"}
              onChange={(e) => setPassword(e.target.value)}
              error={!isPasswordSame}
              disabled={!editMode}
            />
          </Grid>
          {editMode && (
            <>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="변경 비밀번호"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="변경비밀번호 확인"
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  error={!isPasswordSame}
                  helperText={!isPasswordSame && "비밀번호가 일치하지 않습니다."}
                />
              </Grid>
            </>
          )}
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="전화번호"
              value={userData.phone}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="몸무게"
              value={userData.weight}
              InputProps={{ readOnly: true }}
            />
          </Grid>
        </Grid>
        {editMode ? (
          <>
            <Button onClick={handleCancelEdit} sx={{ mt: 2, mr: 2 }}>
              취소
            </Button>
            <Button onClick={handleSaveChanges} variant="contained" color="primary" sx={{ mt: 2 }}>
              저장
            </Button>
          </>
        ) : (
          <Button onClick={handleEditClick} variant="contained" sx={{ mt: 2 }}>
            수정
          </Button>
        )}
      </form>
    </Container>
  );
};

export default UserPage;
