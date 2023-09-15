import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ConfirmationNumber, Redeem } from "@mui/icons-material";

const BuyTicket = () => {

  return (
    <Container>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: "100%", py: 3 }}>
        <Typography variant="h3">이용권 구매</Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: "100%" }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: "100%", justifyContent: "center" }}>
          <Box sx={{ display: 'flex', width: "40%", height: "200px", m: 3, backgroundColor: "#4cab6a", alignItems: 'center', justifyContent: "center" }}>
            <Typography variant="span" sx={{ fontSize: "30px", fontWeight: "bold", color: "white" }}>
              정기권 <ConfirmationNumber />
            </Typography>
            
          </Box>
          <Box sx={{ display: 'flex', width: "40%", height: "200px", m: 3, backgroundColor: "#4cab6a", alignItems: 'center', justifyContent: "center" }}>
            <Typography variant="span" sx={{ fontSize: "30px", fontWeight: "bold", color: "white" }}>
              일일권 <ConfirmationNumber />
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: "100%", justifyContent: "center" }}>
          <Box sx={{ display: 'flex', width: "40%", height: "200px", m: 3, backgroundColor: "#8ac0ff", alignItems: 'center', justifyContent: "center" }}>
            <Typography variant="span" sx={{ fontSize: "30px", fontWeight: "bold", color: "white" }}>
              정기권 선물하기 <Redeem />
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', width: "40%", height: "200px", m: 3, backgroundColor: "#8ac0ff", alignItems: 'center', justifyContent: "center" }}>
            <Typography variant="span" sx={{ fontSize: "30px", fontWeight: "bold", color: "white" }}>
              일일권 선물하기 <Redeem />
            </Typography>
          </Box>
        </Box>
      </Box> 
    </Container>
  )
}

export default BuyTicket;