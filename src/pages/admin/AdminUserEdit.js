import {
  Button,
  ButtonGroup,
  Container,
  CssBaseline,
  Typography,
  Box,
  Grid,
  TextField,
  Paper,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate, useSearchParams } from "react-router-dom";
import "./style.css";
import moment from "moment";

const mock = {
    "id": 1,
    "password": "abcd1234",
    "username": "김데베",
    "user_type": 1,
    "email": "kw_db@kw.ac.kr",
    "phone_number": "1.012345678E9",
    "weight": 50.0,
    "age": 20,
    "last_accessed_at": null,
    "total_money": 50000
};

const AdminUserEdit = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(mock);
  const [userId, setUserId] = useState(mock.id);
  const [username, setUsername] = useState(mock.username);
  const [userEmail, setUserEmail] = useState(mock.email);
  const [userPhone, setUserPhone] = useState(mock.phone_number);
  const [userWeight, setUserWeight] = useState(mock.weight);
  const [userAge, setUserAge] = useState(mock.age);
  const [userPassword, setUserPassword] = useState(mock.password);
  const [userMoney, setUserMoney] = useState(mock.total_money);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("id");

  useEffect(() => {
    // TODO: Fetch data
    (async() => {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL + `/users/get-userinfo?user_id=${query}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (response.status !== 200) {
          throw new Error("데이터를 가져오는데 실패하였습니다.");
        }
        const jsonData = await response.json();
        setUserData(jsonData.result)
        setUserId(jsonData.result.id)
        setUsername(jsonData.result.username)
        setUserEmail(jsonData.result.email)
        setUserPhone(jsonData.result.phone_number)
        setUserWeight(jsonData.result.weight)
        setUserAge(jsonData.result.age)
        setUserPassword(jsonData.result.password)
        setUserMoney(jsonData.result.total_money)

      } catch (error) {
        alert("데이터를 가져오는데 실패하였습니다.");
      } 
    })();
  }, []);
  const submitHandler = () => {
    (async() => {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL + "/admin/modify-user", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: userId,
            username,
            password: userPassword,
            email: userEmail,
            phone_number: userPhone,
            weight: userWeight,
            age: userAge,
            total_money: userMoney
          })
        });
        if (response.status !== 200) {
          throw new Error("데이터를 가져오는데 실패하였습니다.");
        }
        const jsonData = await response.json();
        if (jsonData.success) {
          alert("수정에 성공하였습니다.");
          navigate("/admin?type=user");
        } else {
          throw new Error("수정에 실패했습니다.");
        }
      } catch (error) {
        console.log(error);
        alert("수정에 실패했습니다.");
      }
    })();
    return;
  }
  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Typography component="h1" variant="h5" sx={{ py: 3 }}>
        회원 정보 수정
      </Typography>
      <Box sx={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", width: "100%", py: 3}}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="유저ID"
              value={userId}
              InputProps={{ readOnly: true }}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="이메일"
              value={userEmail}
              InputProps={{ readOnly: true }}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="이름"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="변경 비밀번호"
              type="password"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="전화번호"
              value={userPhone}
              onChange={(e) => setUserPhone(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="나이"
              value={userAge}
              onChange={(e) => setUserAge(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="몸무게"
              value={userWeight}
              onChange={(e) => setUserWeight(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="보유 금액"
              value={userMoney}
              onChange={(e) => setUserMoney(e.target.value)}
            />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{display: "flex", flexDirection: "row", justifyContent: "start", alignItems: "center", width: "100%", py: 3}}>
        <Button 
          onClick={submitHandler}
          variant="contained"
          sx={{ mr: 3}}
        >
          수정하기
        </Button>
        <Button 
          component={RouterLink}
          to="/admin?type=user"
          variant="contained"
          color="warning"
        >
          뒤로가기
        </Button>
      </Box>
    </Container>
  );
};

export default AdminUserEdit;
