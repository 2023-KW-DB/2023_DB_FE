import { Box, Container, Typography, Button, Link, Autocomplete, TextField, Divider, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import KakaoMap from "./components/KakaoMap";
import { useSelector, useDispatch } from 'react-redux';
import { setStartPos, setEndPos } from "../store/positionSlice";
import { Link as RouterLink } from "react-router-dom";
const mock = {
  "recent": [{
    "lendplace_id": "ST-650",
    "statn_addr1": "서울특별시 강북구 노해로 50",
    "statn_addr2": "수유동 140",
  }, {
    "lendplace_id": "ST-651",
    "statn_addr1": "서울특별시 강북구 삼양로 474",
    "statn_addr2": "수유동 317-3",
  }],
  "popular": [{
    "lendplace_id": "ST-650",
    "statn_addr1": "서울특별시 강북구 노해로 50",
    "statn_addr2": "수유동 140",
  }, {
    "lendplace_id": "ST-651",
    "statn_addr1": "서울특별시 강북구 삼양로 474",
    "statn_addr2": "수유동 317-3",
  }],
}
const Main = () => {
  const screenHeight = window.innerHeight - 80;
  const dispatch = useDispatch();
  const startPos = useSelector((state) => state.position.startPos)
  const endPos = useSelector((state) => state.position.endPos)
  
  const [_recent, _setRecent] = useState(mock.recent);
  const [_popular, _setPopular] = useState(mock.popular);

  const [_startPos, _setStartPos] = useState(null);
  const [_endPos, _setEndPos] = useState(null);

  const onClickMarker = useCallback((marker, lendplace) => {
    _setStartPos(prevStartPos => {
      if (!prevStartPos) {
        dispatch(setStartPos(lendplace));
        return lendplace;
      } else {
        dispatch(setEndPos(lendplace));
        _setEndPos(lendplace);
        return prevStartPos; // startPos 상태를 변경하지 않는 경우 이전 값 반환
      }
    });
  }, [startPos, endPos]);

  useEffect(() => {
    console.log(startPos);
    console.log(endPos);
  }, [startPos, endPos])



  const onClickLendplaceClear = () => {
    dispatch(setStartPos(""));
    dispatch(setEndPos(""));
  }

  return (
    <Container sx={{ height: screenHeight, width: "100%", maxWidth: "100%", minWidth: "100%" }} className="Main" style={{ paddingLeft: 0, paddingRight: 0 }}>
      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", height: "100%", width: "100%" }}>
        <Box sx={{ width: "300px", borderRight: "1px solid black", height: "100%", py: 3, px: 2}}>
          <Typography variant="h5" sx={{ fontWeight: "bold", my: 2 }}>
            시작 지점
          </Typography>
          {startPos && (
            <TextField
              variant="standard"
              sx={{ py: 1 }}
              value={ startPos.lendplace_id }
              InputProps={{ readOnly: true }}
            />
          )}
          <Typography variant="h5" sx={{ fontWeight: "bold", my: 2 }}>
            도착 지점
          </Typography>
          {endPos && (
            <TextField
              variant="standard"
              sx={{ py: 1 }}
              value={ endPos.lendplace_id }
              InputProps={{ readOnly: true }}
            />
          )}
          <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%", mt: 2 }}>
            <Box></Box>
            <Button
              type="button"
              variant="contained"
              color="primary"
              component={RouterLink}
              to="/payment"
            >
              출발하기 >
            </Button>  
          </Box>
          <Divider sx={{ my: 4 }} />
          <Typography variant="h5" sx={{ fontWeight: "bold", my: 2 }}>
            최근 사용 지점
          </Typography>
          {_recent ? (
            <>
              {_recent.map((lendplace, index) => (
                <ul key={index} style={{paddingLeft: 20}}>
                  <li onClick={() => onClickMarker(index, lendplace)}>
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
                <ul key={index} style={{paddingLeft: 20}}>
                  <li onClick={() => onClickMarker(index, lendplace)}>
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
        
        <Box sx={{ width: "100%", height: "100%"}}>
          <KakaoMap onClickMarker={onClickMarker}/>
        </Box>
      </Box>   

    </Container>
  )
};

export default Main;