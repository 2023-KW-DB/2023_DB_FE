import { Box, Container, Typography, Button, Link } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import KakaoMap from "./components/KakaoMap";
import { useSelector, useDispatch } from 'react-redux';
import { setStartPos, setEndPos } from "../store/positionSlice";
import { Link as RouterLink } from "react-router-dom";

const Main = () => {
  const screenHeight = window.innerHeight - 80;
  const dispatch = useDispatch();
  const startPos = useSelector((state) => state.position.startPos)
  const endPos = useSelector((state) => state.position.endPos)
    
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
        <Box sx={{ width: "300px", borderRight: "1px solid black", height: "100%", py: 3}}>
          <Typography>
            시작 지점
          </Typography>
          {startPos && (
            <Typography>
              {startPos.lendplace_id}
            </Typography>  
          )}
          <Typography>
            도착 지점
          </Typography>
          {endPos && (
            <Typography>
              {endPos.lendplace_id}
            </Typography>  
          )}
          
         <Button
          type="button"
          variant="text"
          color="primary"
          >
           <Link component={RouterLink} to="/payment" variant="text" style={{ textDecoration: 'none' }}>
              결제창으로이동
            </Link>
          </Button>           
        </Box>
        
        <Box sx={{ width: "100%", height: "100%"}}>
          <KakaoMap onClickMarker={onClickMarker}/>
        </Box>
      </Box>   

    </Container>
  )
};

export default Main;