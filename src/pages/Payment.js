import { Container, Button } from "@mui/material"
import { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
const Payment = () => {
  return (
    <Container>
      <Button variant="contained" color="primary" component={RouterLink} to="/travelrating">
        리뷰하기
      </Button> 
    </Container>     
  )
};

export default Payment;