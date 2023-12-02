import { Box, Container, Typography, Button, Link, Autocomplete, TextField, Divider, List, ListItem, ListItemButton, ListItemText, Card } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import KakaoMap from "./components/KakaoMap";
import { useSelector, useDispatch } from "react-redux";
import { setStartPos, setEndPos } from "../store/positionSlice";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { Link as RouterLink, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
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

  // 즐겨찾기 정보
  const [favorite, setFavorite] = useState([]);

  // 전체 정보
  const [searchedLendplace, setSearchedLendplace] = useState([]);

  const [userId, setUserId] = useState(null);

  const perviousAutocompleteController = useRef();
  const perviousEndAutocompleteController = useRef();

  const [lat, setLat] = useState(37.62019307507592);
  const [long, setLong] = useState(127.0586406171661);

  useEffect(() => {
    (async () => {
      try {
        // 인기 대여소 정보 가져오기
        const popularResponse = await fetch(process.env.REACT_APP_API_URL + "/station/get-popular-lendplace", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
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
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          });
          if (recentResponse.status !== 200) {
            throw new Error("최근 대여소 정보를 가져오는데 실패하였습니다.");
          }
          const recentJsonData = await recentResponse.json();
          _setRecent(recentJsonData.result);

          const favoriteResponse = await fetch(process.env.REACT_APP_API_URL + `/favorite/get-lendplace?user_id=${user.id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          });
          if (favoriteResponse.status !== 200) {
            throw new Error("즐겨찾기 정보를 가져오는데 실패하였습니다.");
          }
          const favoriteJsonData = await favoriteResponse.json();
          setFavorite(favoriteJsonData.result);
          setUserId(user.id);

          const checkRentResponse = await fetch(process.env.REACT_APP_API_URL + `/station/rental-status?user_id=${user.id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          });
          if (checkRentResponse.status !== 200) {
            throw new Error("대여 정보를 가져오는데 실패하였습니다.");
          }
          const checkRentJsonData = await checkRentResponse.json();
          if (checkRentJsonData.result.length === 0) {
            setStartPos(null);
            setEndPos(null);
            _setStartPos(null);
            _setEndPos(null);
            dispatch(setStartPos(null));
            dispatch(setEndPos(null));
            setIsOnRent(false);
          } else {
            const lendplace = checkRentJsonData.result[0];
            console.log(lendplace);
            setStartPos(lendplace);
            _setStartPos(lendplace);
            dispatch(setStartPos(lendplace));
            setIsOnRent(true);
          }
        } else {
          _setRecent([]);
          setFavorite([]);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [user]);

  const onClickMarker = useCallback(
    (marker, lendplace, userid) => {
      setIsOnRent((prevIsOnRent) => {
        if (prevIsOnRent) {
          getLendPlaceData(lendplace.lendplace_id, false, userid);
        } else {
          getLendPlaceData(lendplace.lendplace_id, true, userid);
        }
        return prevIsOnRent;
      });
      (async () => {
        const lat = lendplace.startn_lat;
        const lon = lendplace.startn_lnt;
        const date = new Date().getTime();
        const datestr = moment(date).format("YYYY-MM-DD");
        console.log("==========lendplace");
        console.log(lat, lon, lendplace);
        await fetchWeather(lat, lon, lendplace);
      })();
    },
    [startPos, endPos, isOnRent],
  );

  const fetchWeather = async (lat, lon, lendplace) => {
    const API_KEY = "6f96069f9b5896f4eadf1a221d0333ab";
    try {
      const response = await fetch(
        `https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=kr&units=metric`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        },
      );
      if (response.status !== 200) {
        throw new Error("날씨 정보를 가져오는데 실패하였습니다.");
      }
      const jsonData = await response.json();
      jsonData.lendplace = lendplace;
      setWeatherInfo(jsonData);
    } catch (error) {
      console.log(error);
    }
  };

  const onClickLendplaceClear = () => {
    dispatch(setStartPos(null));
    dispatch(setEndPos(null));
    _setStartPos(null);
    _setEndPos(null);
  };

  const onClickFavorite = () => {
    (async () => {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL + "/favorite/favorite-lendplace", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            lendplace_id: isOnRent ? endPos.lendplace_id : startPos.lendplace_id,
            user_id: user.id,
          }),
          credentials: "include",
        });
        if (response.status !== 200) {
          throw new Error("즐겨찾기 설정에 실패하였습니다.");
        }
        const jsonData = await response.json();
        if (jsonData.status !== 2025) {
          setIsFavorite(!isFavorite);
          if (isFavorite) {
            alert("즐겨찾기 해제에 성공하였습니다.");
          } else {
            alert("즐겨찾기 설정에 성공하였습니다.");
          }

          return;
        } else {
          alert("즐겨찾기 설정에 실패하였습니다.");
        }
      } catch (error) {
        console.log(error);
        alert("즐겨찾기 설정에 실패하였습니다.");
      }
    })();
    localStorage.setItem("isFavorite", !isFavorite);
    setIsFavorite(!isFavorite);
  };

  useEffect(() => {
    const favoriteStatus = localStorage.getItem("isFavorite") === "true";
    setIsFavorite(favoriteStatus);
  }, []);

  const onRentBike = (lendplace) => {
    (async () => {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL + "/users/bike-rental", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            departure_station: lendplace.lendplace_id,
            user_id: user.id,
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
          return;
        } else {
          const errorMessage = jsonData.message;
          alert("자전거 대여 실패: " + errorMessage);
          // alert("자전거 대여에 실패하였습니다.");
        }
      } catch (error) {
        console.log(error);
        alert("자전거 대여에 실패하였습니다.");
      }
    })();
  };

  const onReturnBike = (lendplace) => {
    (async () => {
      try {
        const start_lat = startPos.startn_lat;
        const statr_lnt = startPos.startn_lnt;
        const end_lat = endPos.startn_lat;
        const end_lnt = endPos.startn_lnt;

        // Calculate distance in meter
        const distance = Math.sqrt(Math.pow(start_lat - end_lat, 2) + Math.pow(statr_lnt - end_lnt, 2)) * 100000;

        const response = await fetch(process.env.REACT_APP_API_URL + "/users/bike-return", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            arrival_station: endPos.lendplace_id,
            user_id: user.id,
            use_distance: distance ? parseInt(distance) : 0,
          }),
          credentials: "include",
        });
        if (response.status !== 200) {
          throw new Error("자전거 반납에 실패하였습니다.");
        }
        const jsonData = await response.json();
        if (jsonData.status === 2027) {
          alert("자전거 반납에 성공하였습니다.");
          setIsOnRent(false);
          setStartPos(null);
          setEndPos(null);
          _setStartPos(null);
          _setEndPos(null);
          navigate("/travelrating");
          return;
        } else {
          alert("자전거 반납에 실패하였습니다.");
        }
      } catch (error) {
        console.log(error);
        alert("자전거 반납에 실패하였습니다.");
      }
    })();
  };

  const searchLendPlace = (value) => {
    if (perviousAutocompleteController.current) {
      perviousAutocompleteController.current.abort();
    }
    const controller = new AbortController();
    const signal = controller.signal;
    perviousAutocompleteController.current = controller;
    fetch(process.env.REACT_APP_API_URL + `/station/search-lendplace?name=${value}`, {
      signal,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .catch(function (error) {
        if (error.name === "AbortError") {
          console.log("요청이 중단되었습니다.");
        } else {
          console.log(error);
        }
      })
      .then(function (response) {
        return response.json();
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function (jsonData) {
        if (!jsonData) {
          setSearchedLendplace([]);
          return;
        }
        if (!jsonData.result) {
          setSearchedLendplace([]);
          return;
        }
        const newLendplace = jsonData.result.map((lendplace) => {
          return {
            ...lendplace,
            label: "[" + lendplace.lendplace_id + "] " + lendplace.statn_addr1 + " " + lendplace.statn_addr2,
          };
        });
        setSearchedLendplace(newLendplace);
      });
  };

  const onInputChange = (event, value, reason) => {
    if (event === null) return;
    if (event.type === "change") {
      if (value) {
        searchLendPlace(value);
      } else {
        setSearchedLendplace([]);
      }
    }
  };

  const getLendPlaceData = async (lendplace_id, isStart, userid) => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL + `/station/get-lendplace-status?lendplace_id=${lendplace_id}&user_id=${userid ? userid : 1}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        },
      );
      if (response.status !== 200) {
        throw new Error("대여소 정보를 가져오는데 실패하였습니다.");
      }
      const jsonData = await response.json();
      if (jsonData.status !== 200) {
        throw new Error("대여소 정보를 가져오는데 실패하였습니다.");
      }
      const newData = {
        ...jsonData.result,
        label: "[" + jsonData.result.lendplace_id + "] " + jsonData.result.statn_addr1 + " " + jsonData.result.statn_addr2,
      };
      fetchWeather(newData.startn_lat, newData.startn_lnt, newData);
      if (isStart) {
        dispatch(setStartPos(newData));
        _setStartPos(newData);
        setIsFavorite(newData.favorite);
        // TODO: lat, long 정보 제공 시 수정
        // setLat(newData.startn_lat);
        // setLong(newData.startn_lnt);
      } else {
        dispatch(setEndPos(newData));
        _setEndPos(newData);
        setIsFavorite(newData.favorite);
        // TODO: lat, long 정보 제공 시 수정
        // setLat(newData.startn_lat);
        // setLong(newData.startn_lnt);
      }
    } catch (error) {
      alert("대여소 정보를 가져오는데 실패하였습니다.");
    }
  };
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
            width: "500px",
            borderRight: "1px solid black",
            height: "100%",
            // py: 3,
            // px: 2,
            overflowY: "scroll",
          }}
        >
          {!user || !user.id ? (
            <>
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
                <Typography variant="h5" sx={{ fontWeight: "bold", fontSize: "16px", my: 2, color: "gray" }}>
                  로그인이 필요합니다.
                </Typography>
              </Box>
            </>
          ) : (
            <>
              <Card sx={{ py: 2, px: 1, m: 1 }}>
                {!isOnRent ? (
                  <>
                    <Typography variant="h5" sx={{ fontWeight: "bold", my: 1, pl: 1 }}>
                      시작 대여소
                    </Typography>
                    <Autocomplete
                      noOptionsText={"검색 결과가 없습니다."}
                      fullWidth
                      options={searchedLendplace}
                      disablePortal
                      onInputChange={onInputChange}
                      renderInput={(params) => <TextField {...params} label="자전거 대여소 위치" />}
                      sx={{ width: "100%" }}
                      value={startPos ? startPos : null}
                      onChange={(e, value) => {
                        if (!value) return;
                        if (value.lendplace_id === startPos) return;
                        getLendPlaceData(value.lendplace_id, true, user.id ? user.id : 0);
                      }}
                    />

                    {startPos ? (
                      <Typography variant="span" sx={{ fontWeight: "bold", my: 2 }}>
                        자전거 대수 : {startPos.usable_bikes} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 평점 : {startPos.average_rating}점
                      </Typography>
                    ) : (
                      "지도에서 출발지점을 선택해주세요"
                    )}
                  </>
                ) : (
                  <>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                      }}
                    >
                      <DirectionsBikeIcon sx={{ fontSize: "3.5rem", width: "100px" }} />
                      <Typography variant="span" sx={{ fontWeight: "bold", my: 2 }}>
                        자전거를 대여중입니다.
                      </Typography>
                    </Box>

                    <Typography variant="h5" sx={{ fontWeight: "bold", my: 1, pl: 1 }}>
                      도착 대여소
                    </Typography>
                    <Autocomplete
                      noOptionsText={"검색 결과가 없습니다."}
                      fullWidth
                      options={searchedLendplace}
                      disablePortal
                      onInputChange={onInputChange}
                      renderInput={(params) => <TextField {...params} label="자전거 대여소 위치" />}
                      sx={{ width: "100%" }}
                      value={endPos ? endPos : null}
                      onChange={(e, value) => {
                        if (!value) return;
                        if (value.lendplace_id === endPos) return;
                        getLendPlaceData(value.lendplace_id, false, user.id ? user.id : 0);
                      }}
                    />
                    {endPos ? (
                      <Typography variant="span" sx={{ fontWeight: "bold", my: 2 }}>
                        자전거 대수 : {endPos.usable_bikes} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 평점 : {endPos.average_rating}점
                      </Typography>
                    ) : (
                      "지도에서 도착지점을 선택해주세요"
                    )}
                  </>
                )}
                <>
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
                    {isFavorite ? (
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
                    )}
                    <Button
                      type="button"
                      variant="contained"
                      color="info"
                      component={RouterLink}
                      to={"/ratingreview?id=" + (isOnRent ? (endPos ? endPos.lendplace_id : "") : startPos ? startPos.lendplace_id : "")}
                    >
                      후기 보기
                    </Button>
                  </Box>

                  <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    sx={{ width: "100%", mt: 2 }}
                    onClick={() => {
                      if (!isOnRent) {
                        if (startPos) {
                          onRentBike(startPos);
                        } else {
                          alert("대여할 지점을 선택해주세요.");
                        }
                      } else {
                        if (endPos) {
                          onReturnBike(endPos);
                        } else {
                          alert("반납할 지점을 선택해주세요.");
                        }
                      }
                    }}
                  >
                    {!isOnRent ? "자전거 대여" : "자전거 반납"}
                  </Button>
                </>
              </Card>
              <Card sx={{ py: 2, px: 1, m: 1 }}>
                <Weather data={weatherInfo} />
              </Card>
              <Card sx={{ py: 2, px: 1, m: 1 }}>
                <Typography variant="h5" sx={{ fontWeight: "bold", my: 1, pl: 1 }}>
                  최근 사용 대여소
                </Typography>
                {_recent && _recent.length > 0 ? (
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
                    최근 사용 대여소가 없습니다.
                  </Typography>
                )}
              </Card>
              <Card sx={{ py: 2, px: 1, m: 1 }}>
                <Typography variant="h5" sx={{ fontWeight: "bold", my: 1, pl: 1 }}>
                  인기 대여소
                </Typography>
                {_popular && _popular.length > 0 ? (
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
                    인기 대여소가 없습니다.
                  </Typography>
                )}
              </Card>

              <Card sx={{ py: 2, px: 1, m: 1 }}>
                <Typography variant="h5" sx={{ fontWeight: "bold", my: 1, pl: 1 }}>
                  대여소 즐겨찾기
                </Typography>
                {favorite && favorite.length > 0 ? (
                  <>
                    {favorite.map((lendplace, index) => (
                      <ul key={index} style={{ paddingLeft: 20, cursor: "pointer" }}>
                        <li onClick={() => onClickMarker(index, lendplace, isOnRent)}>
                          {lendplace.statn_addr1} {lendplace.statn_addr2}
                        </li>
                      </ul>
                    ))}
                  </>
                ) : (
                  <Typography variant="span" sx={{ fontSize: "15px" }}>
                    즐겨찾기한 대여소가 없습니다.
                  </Typography>
                )}
              </Card>
            </>
          )}
        </Box>

        <Box sx={{ width: "100%", height: "100%" }}>
          <KakaoMap onClickMarker={onClickMarker} isOnRent={isOnRent} lat={lat} long={long} />
        </Box>
      </Box>
    </Container>
  );
};

export default Main;
