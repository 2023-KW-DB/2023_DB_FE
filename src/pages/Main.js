import {
  Box,
  Container,
  Typography,
  Button,
  Link,
  Autocomplete,
  TextField,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import KakaoMap from "./components/KakaoMap";
import { useSelector, useDispatch } from "react-redux";
import { setStartPos, setEndPos } from "../store/positionSlice";
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { Link as RouterLink } from "react-router-dom";
import moment from "moment";
import Weather from "./components/Weather";

const mock = {
  recent: [
    {
      lendplace_id: "ST-650",
      statn_addr1: "서울특별시 강북구 노해로 50",
      statn_addr2: "수유동 140",
    },
    {
      lendplace_id: "ST-651",
      statn_addr1: "서울특별시 강북구 삼양로 474",
      statn_addr2: "수유동 317-3",
    },
  ],
  popular: [
    {
      lendplace_id: "ST-650",
      statn_addr1: "서울특별시 강북구 노해로 50",
      statn_addr2: "수유동 140",
    },
    {
      lendplace_id: "ST-651",
      statn_addr1: "서울특별시 강북구 삼양로 474",
      statn_addr2: "수유동 317-3",
    },
  ],
};
const Main = () => {
  const screenHeight = window.innerHeight - 80;
  const dispatch = useDispatch();
  const startPos = useSelector((state) => state.position.startPos);
  const endPos = useSelector((state) => state.position.endPos);
  const user = useSelector((state) => state.user);

  const [_recent, _setRecent] = useState(mock.recent);
  const [_popular, _setPopular] = useState(mock.popular);

  const [_startPos, _setStartPos] = useState(null);
  const [_endPos, _setEndPos] = useState(null);

  const [isOnRent, setIsOnRent] = useState(false);

  // 현재 선택한 대여소가 즐겨찾기에 있는지 확인
  const [isFavorite, setIsFavorite] = useState(false);

  // 날씨 정보
  const [weatherInfo, setWeatherInfo] = useState(null);

  useEffect(() => {
    (async() => {
      try {
        const popularResponse = await fetch(process.env.REACT_APP_API_URL + "/station/get-popular-lendplace", {
          method: "GET",
          headers: { "Content-Type": "application/json", },
          credentials: "include",
        });
        if (popularResponse.status !== 200) {
          throw new Error("인기 대여소 정보를 가져오는데 실패하였습니다.");
        }
        const popularJsonData = await popularResponse.json();
        _setPopular(popularJsonData.result);
        if (user && user.id) {
          const recentResponse = await fetch(process.env.REACT_APP_API_URL + `/station/get-recent-lendplace?user_id=${user.id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json", },
            credentials: "include",
          });
          if (recentResponse.status !== 200) {
            throw new Error("최근 대여소 정보를 가져오는데 실패하였습니다.");
          }
          const recentJsonData = await recentResponse.json();
          _setRecent(recentJsonData.result);
        }
        else {
          _setRecent([]);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [])

  const onClickMarker = useCallback(
    (marker, lendplace) => {
      console.log(lendplace);
      setIsOnRent((prevIsOnRent) => {
        if (prevIsOnRent) {
          dispatch(setEndPos(lendplace));
          _setEndPos(lendplace);
          setIsFavorite(lendplace.favorite);
        } else {
          dispatch(setStartPos(lendplace));
          _setStartPos(lendplace);
          setIsFavorite(lendplace.favorite);
        }
        return prevIsOnRent;
      });
      (async() => {
        const API_KEY = "6f96069f9b5896f4eadf1a221d0333ab";
        const lat = lendplace.startn_lat;
        const lon = lendplace.startn_lnt;
        const date = new Date().getTime();
        const datestr = moment(date).format("YYYY-MM-DD");
        try {
          const response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=kr`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json", },
          });
          if (response.status !== 200) {
            throw new Error("날씨 정보를 가져오는데 실패하였습니다.");
          }
          const jsonData = await response.json();
          jsonData.lendplace = lendplace;
          setWeatherInfo(jsonData);
          console.log(jsonData);
        } catch (error) {
          console.log(error);
        }
        })()
    },
    [startPos, endPos, isOnRent]
  );



  const onClickLendplaceClear = () => {
    dispatch(setStartPos(null));
    dispatch(setEndPos(null));
    _setStartPos(null);
    _setEndPos(null);
  };

  const onClickFavorite = () => {
    (async() => {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL + "/favorite/favorite-lendplace", {
          method: "POST",
          headers: { "Content-Type": "application/json", },
          body: JSON.stringify({
            "lendplace_id": isOnRent ? endPos.lendplace_id : startPos.lendplace_id,
            "user_id": user.id
          }),
          credentials: "include",
        });
        if (response.status !== 200) {
          throw new Error("즐겨찾기 설정에 실패하였습니다.");
        }
        const jsonData = await response.json();
        if (jsonData.status !== 2025) {
          alert("즐겨찾기 설정에 성공하였습니다.");
          setIsFavorite(!isFavorite);
          return
        } else {
          alert("즐겨찾기 설정에 실패하였습니다.");
        }
      } catch (error) {
        console.log(error)
        alert("즐겨찾기 설정에 실패하였습니다.");
      }
    })()
  }

  const onRentBike = (lendplace) => {
    (async() => {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL + "/users/bike-rental", {
          method: "POST",
          headers: { "Content-Type": "application/json", },
          body: JSON.stringify({
            "departure_station": lendplace.lendplace_id,
            "user_id": user.id
          }),
          credentials: "include",
        });
        if (response.status !== 200) {
          throw new Error("자전거 대여에 실패하였습니다.");
        }
        const jsonData = await response.json();
        if (jsonData.status === 2026) {
          alert("자전거 대여에 성공하였습니다.");
          dispatch(setStartPos(lendplace));
          _setStartPos(lendplace);
          setIsOnRent(true);
          return
        } else {
          const errorMessage = jsonData.message
          alert("자전거 대여 실패: " + errorMessage);
          // alert("자전거 대여에 실패하였습니다.");
        }
      } catch (error) {
        console.log(error)
        alert("자전거 대여에 실패하였습니다.");
      }
    })();
  }

  const onReturnBike = (lendplace) => {
    (async() => {
      try {
        console.log(startPos, endPos);
        const start_lat = startPos.startn_lat;
        const statr_lnt = startPos.startn_lnt;
        const end_lat = endPos.startn_lat;
        const end_lnt = endPos.startn_lnt;

        // Calculate distance in meter
        const distance = Math.sqrt(Math.pow(start_lat - end_lat, 2) + Math.pow(statr_lnt - end_lnt, 2)) * 100000;
        console.log(distance)

        const response = await fetch(process.env.REACT_APP_API_URL + "/users/bike-return", {
          method: "POST",
          headers: { "Content-Type": "application/json", },
          body: JSON.stringify({
            "arrival_station": endPos.lendplace_id,
            "user_id": user.id,
            "use_distance": distance ? parseInt(distance) : 0
          }),
          credentials: "include",
        });
        if (response.status !== 200) {
          throw new Error("자전거 반납에 실패하였습니다.");
        }
        const jsonData = await response.json();
        if (jsonData.status === 2027) {
          alert("자전거 반납에 성공하였습니다.")
          setIsOnRent(false);
          setStartPos(null);
          setEndPos(null);
          _setStartPos(null);
          _setEndPos(null);
          return
        } else {
          alert("자전거 반납에 실패하였습니다.");
        }
      } catch (error) {
        console.log(error)
        alert("자전거 반납에 실패하였습니다.");
      }
    })();
  }

  return (
    <Container
      sx={{
        height: screenHeight,
        width: "100%",
        maxWidth: "100%",
        minWidth: "100%",
      }}
      className="Main"
      style={{ paddingLeft: 0, paddingRight: 0 }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <Box
          sx={{
            width: "300px",
            borderRight: "1px solid black",
            height: "100%",
            py: 3,
            px: 2,
          }}
        >
          {!isOnRent ? (
           <>
            <Typography variant="h5" sx={{ fontWeight: "bold", my: 2 }}>
              시작 지점
              </Typography>
              <TextField
                variant="standard"
                sx={{ py: 1 }}
                value={startPos 
                  ? startPos.statn_addr2 ? startPos.statn_addr2 : startPos.statn_addr1
                  : ""}
                placeholder={
                  startPos
                    ? startPos.statn_addr2 ? startPos.statn_addr2 : startPos.statn_addr1
                    : "지도에서 도착지점을 선택해주세요"
                }
                InputProps={{ readOnly: true }}
              />
            </>
          
          ) : (
            <>
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%" }}>
                <DirectionsBikeIcon sx={{ fontSize: "3.5rem", width: "100px" }} />
                <Typography variant="span" sx={{ fontWeight: "bold", my: 2 }}>
                  자전거를 대여중입니다.
                </Typography>
              </Box>
              
              <Typography variant="h5" sx={{ fontWeight: "bold", my: 2 }}>
                도착 지점
              </Typography>
              <TextField
                variant="standard"
                sx={{ py: 1 }}
                value={endPos 
                  ? endPos.statn_addr2 ? endPos.statn_addr2 : endPos.statn_addr1
                  : ""}
                placeholder={
                  endPos 
                  ? endPos.statn_addr2 ? endPos.statn_addr2 : endPos.statn_addr1
                  : "지도에서 도착지점을 선택해주세요"
                }
                InputProps={{ readOnly: true }}
              />
            </>
          )}
          
          
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              mt: 2,
            }}
          >
            {
              isFavorite ? (
                <Button
                  type="button"
                  variant="contained"
                  color="warning"
                  onClick={() => {
                    onClickFavorite();
                  }}
                >
                  <StarIcon />
                </Button>
                
              ) : (
                <Button
                  type="button"
                  variant="contained"
                  color="warning"
                  onClick={() => {
                    onClickFavorite();
                  }}
                >
                  <StarOutlineIcon />
                </Button>
              )
            }
            <Button
              type="button"
              variant="contained"
              color="primary"
              onClick={() => {
                if (!isOnRent) {
                  if (startPos) {
                    onRentBike(startPos);
                  } else {
                    alert("대여할 지점을 선택해주세요.")
                  }
                } else {
                  if (endPos) {
                    onReturnBike(endPos);
                  } else {
                    alert("반납할 지점을 선택해주세요.")
                  }
                }
              }}
            >
              { (!isOnRent) ? "자전거 대여" : "자전거 반납" }
            </Button>
          </Box>
          <Divider sx={{ my: 4 }} />
          <Weather data={weatherInfo} />
          <Typography variant="h5" sx={{ fontWeight: "bold", my: 2 }}>
            최근 사용 지점
          </Typography>
          {_recent ? (
            <>
              {_recent.map((lendplace, index) => (
                <ul key={index} style={{ paddingLeft: 20, cursor: "pointer" }}>
                  <li onClick={() => onClickMarker(index, lendplace, isOnRent)}>
                    {lendplace.statn_addr1} {lendplace.statn_addr2}
                  </li>
                </ul>
              ))}
            </>
          ) : (
            <Typography variant="span" sx={{ fontSize: "15px" }}>
              최근 사용 지점이 없습니다.
            </Typography>
          )}
          <Typography variant="h5" sx={{ fontWeight: "bold", my: 2 }}>
            인기 지점
          </Typography>
          {_popular ? (
            <>
              {_popular.map((lendplace, index) => (
                <ul key={index} style={{ paddingLeft: 20, cursor: "pointer" }}>
                  <li onClick={() => onClickMarker(index, lendplace, isOnRent)}>
                    {lendplace.statn_addr1} {lendplace.statn_addr2}
                  </li>
                </ul>
              ))}
            </>
          ) : (
            <Typography variant="span" sx={{ fontSize: "15px" }}>
              인기 지점이 없습니다.
            </Typography>
          )}
        </Box>

        <Box sx={{ width: "100%", height: "100%" }}>
          <KakaoMap onClickMarker={onClickMarker} isOnRent={isOnRent}/>
        </Box>
      </Box>
    </Container>
  );
};

export default Main;