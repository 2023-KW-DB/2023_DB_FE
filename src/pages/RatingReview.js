import React, { useEffect, useState } from "react";
import { Container, Typography, Card, CardContent, Rating, CardHeader, Divider, Box, Autocomplete, TextField } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

const mock = [
  {
    averageRating: 3.6,
    reviews: [
      { user_id: "testuser1", rating: 5, comment: "평점5점", date: "2023-11-07" },
      { user_id: "testuser2", rating: 3, comment: "평점3점", date: "2023-11-08" },
      { user_id: "testuser3", rating: 3, comment: "평점3점", date: "2023-11-10" },
    ],
  },
];

const RatingReview = () => {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [searchParams] = useSearchParams();
  const [lendplaceData, setLendplaceData] = useState([]);
  const query = searchParams.get("id");
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!query || !user.id) return;
    (async () => {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL + `/station/get-lendplace-status?lendplace_id=${query}&user_id=${user.id ? user.id : 1}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (response.status !== 200) {
          throw new Error("데이터를 가져오는데 실패하였습니다.");
        }
        const jsonData = await response.json();
        setReviews(jsonData.result.bikeStationReviews);
        setAverageRating(jsonData.result.average_rating);
      } catch (error) {
        alert("데이터를 가져오는데 실패하였습니다.");
      }
      const response2 = await fetch(process.env.REACT_APP_API_URL + "/station/get-all-lendplace?user_id=1", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (response2.status !== 200) {
        throw new Error("데이터를 가져오는데 실패하였습니다.");
      }
      const jsonData2 = await response2.json();
      const newData = jsonData2.result.map((data) => {
        return {
          lendplace_id: data.lendplace_id,
          label: `${data.lendplace_id} ${data.statn_addr1} ${data.statn_addr2}`,
        };
      });

      setLendplaceData(newData);
    })();
  }, [query, user]);

  return (
    <Container component="main" maxWidth="md">
      <Typography variant="h4" component="h1" sx={{ py: 2 }}>
        대여소 리뷰
      </Typography>
      <Autocomplete
        fullWidth
        disablePortal
        renderInput={(params) => <TextField {...params} label="자전거 대여소 위치" />}
        options={lendplaceData}
        sx={{ width: "100%" }}
        value={query}
        onChange={(e, value) => {
          if (!value) return;
          if (value.lendplace_id === query) return;
          navigate(`/ratingreview?id=${value.lendplace_id}`);
        }}
      />
      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", width: "100%", py: 3 }}>
        <Typography variant="h6" component="h1" sx={{ py: 2 }}>
          평균 평점:
        </Typography>
        <Rating value={averageRating} precision={0.1} readOnly sx={{ px: 1 }} />
        <Typography variant="h6" component="h1" sx={{ py: 2 }}>
          {averageRating} 점
        </Typography>
      </Box>
      <Divider flexItem sx={{ width: "100%", height: "30px", py: 3, alignItems: "center" }} />
      {reviews &&
        reviews.map((review, index) => (
          <Card key={index} elevation={2} sx={{ mb: 2 }}>
            <CardHeader
              title={review.username}
              titleTypographyProps={{ style: { fontSize: "1.2rem" } }}
              // subheader={review.date}
              action={<Rating value={review.rating} readOnly />}
            />
            <CardContent>
              <Typography variant="body" color="text.primary">
                {review.review}
              </Typography>
            </CardContent>
            {index < reviews.length - 1 && <Divider />}
          </Card>
        ))}
      {reviews.length === 0 && (
        <Typography variant="h6" component="h1" sx={{ py: 2 }}>
          리뷰가 없습니다.
        </Typography>
      )}
    </Container>
  );
};

export default RatingReview;
