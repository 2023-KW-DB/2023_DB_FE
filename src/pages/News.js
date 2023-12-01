import {
  Box,
  Card,
  CardActionArea,
  CircularProgress,
  Container,
  CssBaseline,
  Grid,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";

const News = () => {
  const [leftData, setLeftData] = useState([]);
  const [rightData, setRightData] = useState([]);
  useEffect(() => {
    window.feednami
      .load("https://health.chosun.com/site/data/rss/rss.xml")
      .then((feed) => {
        const entries = feed.entries;
        // Each entry if idx % 2 === 0, add left side, else add right side
        const leftResult = [];
        const rightResult = [];
        entries.map((entry, idx) => {
          if (idx % 2 === 0) {
            leftResult.push({
              ...entry,
              thumbText:
                entry.description.slice(0, parseInt(Math.random() * 50) + 75) +
                "...",
              side: "left",
            });
          } else {
            rightResult.push({
              ...entry,
              thumbText:
                entry.description.slice(0, parseInt(Math.random() * 50) + 75) +
                "...",
              side: "right",
            });
          }
        });
        setLeftData(leftResult);
        setRightData(rightResult);
      });
  }, []);

  const onClickFeed = (url) => {
    window.open(url, "_blank");
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Typography component="h1" variant="h5" sx={{ py: 3 }}>
        뉴스
      </Typography>
      <Typography>
        건강과 관련된 실시간 뉴스를 확인할 수 있습니다.
        <br />
        출처 : 헬스조선
      </Typography>
      <Grid container>
        {!leftData.length && !rightData.length && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              width: "100%",
              pt: 10,
            }}
          >
            <Typography>로딩중...</Typography>
            <CircularProgress />
          </Box>
        )}
        <Grid item xs={12} md={6}>
          {leftData.map((item, index) => (
            <Card
              sx={{ m: 2, my: 4 }}
              key={index}
              onClick={() => onClickFeed(item.link)}
              onMouse
            >
              <CardActionArea>
                <Box sx={{ p: 3, boxShadow: 2, cursor: "pointer" }}>
                  <Typography variant="h6" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {item.thumbText}
                  </Typography>
                  <Typography variant="caption" gutterBottom>
                    {moment(item.date).format("YYYY-MM-DD")}
                  </Typography>
                </Box>
              </CardActionArea>
            </Card>
          ))}
        </Grid>
        <Grid item xs={12} md={6}>
          {rightData.map((item, index) => (
            <Card
              sx={{ m: 2, my: 4 }}
              key={index}
              onClick={() => onClickFeed(item.link)}
              onMouse
            >
              <CardActionArea>
                <Box sx={{ p: 3, boxShadow: 2, cursor: "pointer" }}>
                  <Typography variant="h6" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {item.thumbText}
                  </Typography>
                  <Typography variant="caption" gutterBottom>
                    {moment(item.date).format("YYYY-MM-DD")}
                  </Typography>
                </Box>
              </CardActionArea>
            </Card>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default News;
