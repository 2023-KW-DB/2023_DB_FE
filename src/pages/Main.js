import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import KakaoMap from "./components/KakaoMap";
import { useSelector, useDispatch } from 'react-redux';
import { setStartPos, setEndPos } from "../store/positionSlice";

const Main = () => {
  const screenHeight = window.innerHeight - 80;
  const dispatch = useDispatch();
  const startPos = useSelector((state) => state.position.startPos, (prev, next) => prev === next);
  const endPos = useSelector((state) => state.position.endPos, (prev, next) => prev === next);

  const onClickMarker = (marker, lendSpaceInfo) => {
    if (!startPos) {
      dispatch(setStartPos(lendSpaceInfo));
    }
    else {
      dispatch(setEndPos(lendSpaceInfo));
    }
    return;
  }

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
        </Box>
        <Box sx={{ width: "100%", height: "100%"}}>
          <KakaoMap onClickMarker={onClickMarker} />
        </Box>
      </Box>
      
    </Container>
  )
};

export default Main;
