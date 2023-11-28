import {
  Button,
  ButtonGroup,
  Container,
  CssBaseline,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import { Link as RouterLink, useSearchParams } from "react-router-dom";
import UsageDistanceRanking from "./ranking/UsageDistanceRanking";
import UsageTimeRanking from "./ranking/UsageTimeRanking";
import UsageNumberRanking from "./ranking/UsageNumberRanking";
const Ranking = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("type");
  return (
    <Container component="main" maxWidth="md">
      <Typography component="h1" variant="h5" sx={{py: 3}}>
        랭킹
      </Typography>
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
      >
        <Button
          variant="contained"
          component={RouterLink}
          to="/ranking?type=time"
        >
          이용시간 랭킹
        </Button>
        
        <Button
          variant="contained"
          component={RouterLink}
          to="/ranking?type=number"
        >
          이용횟수 랭킹
        </Button>
        <Button
          variant="contained"
          component={RouterLink}
          to="/ranking?type=distance"
        >
          이용거리 랭킹
        </Button>
      </ButtonGroup>
      <Divider sx={{py: 3}}/>
      {query === "time" && <UsageTimeRanking />}
      {query === "number" && <UsageNumberRanking />}
      {query === "distance" && <UsageDistanceRanking />}
    </Container>
  )
}

export default Ranking;