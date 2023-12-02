import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, TextField, Button, Typography, Grid, ButtonGroup } from "@mui/material";
import TicketHistory from "./history/TicketHistory";
import TravelHistory from "./history/TravelHistory";
import { useNavigate, useSearchParams, Link as RouterLink } from "react-router-dom";

const mock = {
  email: "user1@gmail.com",
  username: "user1",
  age: 23,
  password: "1234",
  phone_number: "+82 01012345678",
  weight: 70,
};

const UserPage = () => {
  const [userData, setUserData] = useState(mock);
  const [editMode, setEditMode] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [checkNewPassword, setCheckNewPassword] = useState("");
  const [isPasswordSame, setIsPasswordSame] = useState(true);
  const [newPhone, setNewPhone] = useState("");
  const [newWeight, setNewWeight] = useState("");

  const user = useSelector((state) => state.user);
  const [searchParam] = useSearchParams();
  const query = searchParam.get("type");
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        if (user && user.id) {
          const userResponse = await fetch(process.env.REACT_APP_API_URL + `/users/get-userinfo?user_id=${user.id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          });
          if (userResponse.status !== 200) {
            throw new Error("사용자 정보를 가져오는데 실패하였습니다.");
          }
          const userJsonData = await userResponse.json();
          console.log(userJsonData.result);
          setUserData(userJsonData.result);
        } else {
          throw new Error("로그인 상태가 아닙니다.");
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [user]);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setPassword("");
    setNewPassword("");
    setCheckNewPassword("");
    setIsPasswordSame(true);
    setNewPhone("");
    setNewWeight("");
  };

  const handleSaveChanges = () => {
    if (password === userData.password) {
      if (newPassword === checkNewPassword) {
        setUserData((prevUserData) => ({
          ...prevUserData,
          password: newPassword || prevUserData.password,
          phone: newPhone || prevUserData.phone_number,
          weight: newWeight || prevUserData.weight,
        }));

        setEditMode(false);
        setPassword("");
        setNewPassword("");
        setCheckNewPassword("");
        setIsPasswordSame(true);
      } else {
        setIsPasswordSame(false);
      }
    } else {
      setIsPasswordSame(false);
    }
  };

  const handleUserDelete = () => {
    // Ask
    const isDelete = window.confirm("정말로 회원탈퇴를 하시겠습니까?");
    if (isDelete) {
      (async () => {
        try {
          const response = await fetch(process.env.REACT_APP_API_URL + "/users/delete", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: user.id,
            }),
            credentials: "include",
          });
          if (response.status !== 200) {
            throw new Error("회원탈퇴에 실패하였습니다.");
          }
          const jsonData = await response.json();
          if (jsonData.status === 2008) {
            alert("회원탈퇴에 성공하였습니다.");
            // Remove all cookie
            document.cookie.split(";").forEach(function (c) {
              document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
            });
            window.location.href = "/";
            return;
          } else {
            throw new Error("회원탈퇴에 실패하였습니다.");
          }
        } catch (error) {
          alert("회원탈퇴에 실패하였습니다.");
          return;
        }
      })();
    }
  };

  const getMaskedPassword = (fullPassword) => {
    const visibleLength = 2; // 앞의 두 자리만 표시하고 나머지는 가림
    const visiblePart = fullPassword.slice(0, visibleLength);
    const maskedPart = "*".repeat(fullPassword.length - visibleLength);
    return visiblePart + maskedPart;
  };

  return (
    <Container component="main" maxWidth="md">
      <Typography variant="h4" component="h1" sx={{ py: 2 }}>
        마이 페이지
      </Typography>
      <Container maxWidth="xs">
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField fullWidth variant="outlined" label="이메일" value={userData.email} InputProps={{ readOnly: true }} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth variant="outlined" label="이름" value={userData.username} InputProps={{ readOnly: true }} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth variant="outlined" label="나이" value={userData.age} InputProps={{ readOnly: true }} />
            </Grid>
            
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="전화번호"
                value={editMode ? newPhone || userData.phone_number : userData.phone_number}
                onChange={(e) => setNewPhone(e.target.value)}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="몸무게"
                value={editMode ? newWeight || userData.weight : userData.weight}
                onChange={(e) => setNewWeight(e.target.value)}
                disabled={!editMode}
              />
            </Grid>

            {editMode && (
              <>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="현재 비밀번호"
                  value={editMode ? password : getMaskedPassword(userData.password)}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={!editMode}
                />
              </Grid>
            
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="변경 비밀번호"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    error={!isPasswordSame}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="변경비밀번호 확인"
                    type="password"
                    value={checkNewPassword}
                    onChange={(e) => setCheckNewPassword(e.target.value)}
                    error={!isPasswordSame}
                    helperText={!isPasswordSame && "비밀번호가 일치하지 않습니다"}
                  />
                </Grid>
              </>
            )}

            
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
            <>
              <Button onClick={handleEditClick} variant="contained" sx={{ mt: 2, mr: 1 }}>
                수정
              </Button>
              <Button onClick={handleUserDelete} variant="contained" sx={{ mt: 2, ml: 1 }} color="error">
                회원탈퇴
              </Button>
            </>
          )}
        </form>
      </Container>
      <Typography component="h1" variant="h5" sx={{ py: 3 }}>
        이력 확인
      </Typography>
      <ButtonGroup variant="contained" aria-label="outlined primary button group" sx={{ mb: 3 }}>
        <Button variant="contained" component={RouterLink} to="/userpage?type=travel">
          대여 이력
        </Button>
        <Button variant="contained" component={RouterLink} to="/userpage?type=ticket">
          이용권 이력
        </Button>
      </ButtonGroup>
      {query === "travel" && <TravelHistory />}
      {query === "ticket" && <TicketHistory />}
    </Container>
  );
};

export default UserPage;
