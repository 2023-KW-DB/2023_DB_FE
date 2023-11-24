import { useEffect } from "react";
import {
  Container,
  CssBaseline,
  Typography,
  ButtonGroup,
  Button
} from "@mui/material";
import { Link as RouterLink, useNavigate, useSearchParams } from "react-router-dom";
import TicketHistory from "./history/TicketHistory";
import TravelHistory from "./history/TravelHistory";
const History = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("type");
  const navigate = useNavigate();

  const rows = [
    {
      id: 1,
      username: "testuser1",
      start: "서울특별시 종로구 효자로13길 45",
      startedAt: "2023-09-11",
      end: "서울특별시 중구 덕수궁길 61 서울시립미술관",
      endAt: "2023-09-10",
      price: 9000,
    },
  ];

  useEffect(() => {
    if (!query) {
      navigate("/history?type=travel");
    }
  }, [])

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Typography component="h1" variant="h5" sx={{ py: 3 }}>
        이력 확인
      </Typography>
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
        sx={{ mb: 3 }}
      >
        <Button
          variant="contained"
          component={RouterLink}
          to="/history?type=travel"
        >
          대여 이력
        </Button>
        <Button
          variant="contained"
          component={RouterLink}
          to="/history?type=ticket"
        >
          이용권 이력
        </Button>
      </ButtonGroup>
      {query === "travel" && <TravelHistory />}
      {query === "ticket" && <TicketHistory />}
    </Container>
  );
};

export default History;
