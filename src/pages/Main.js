import { Box, Container, Typography } from "@mui/material";
import { useEffect } from "react";
import KakaoMap from "./components/KakaoMap";
const Main = () => {

  const screenHeight = window.innerHeight - 80;

  return (
    <Container sx={{ height: screenHeight, width: "100%", maxWidth: "100%", minWidth: "100%" }} className="Main" style={{ paddingLeft: 0, paddingRight: 0 }}>
      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", height: "100%", width: "100%" }}>
        <Box sx={{ width: "300px", borderRight: "1px solid black", height: "100%", py: 3}}>
          <Typography>
            시작 지점
          </Typography>
          
          <Typography>
            도착 지점
          </Typography>
        </Box>
        <Box sx={{ width: "100%", height: "100%"}}>
          <KakaoMap />
        </Box>
      </Box>
      
    </Container>
  )
};

export default Main;
