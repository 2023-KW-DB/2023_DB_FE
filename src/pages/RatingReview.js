import React, { useEffect, useState } from 'react';
import { Container, Typography, Card, CardContent, Rating, CardHeader, Divider } from '@mui/material';

const mock = [
  {
    averageRating: 3.6,
    reviews: [
      { user_id: 'testuser1', rating: 5, comment: '평점5점', date: '2023-11-07' },
      { user_id: 'testuser2', rating: 3, comment: '평점3점', date: '2023-11-08' },
      { user_id: 'testuser3', rating: 3, comment: '평점3점', date: '2023-11-10' },
    ],
  }
];

const RatingReview = ({ lendplace_id }) => {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const data = mock.find(data => data.lendplace_id === lendplace_id);
    if (data) {
      setReviews(data.reviews);
      setAverageRating(data.averageRating);
    }
  }, [lendplace_id]);

  return (
    <Container component="main" maxWidth="md">
      <Typography variant="h4" component="h1" sx={{ py: 2 }}>
        대여소 리뷰
      </Typography>
      <Typography variant="h6" component="h1" sx={{ py: 2 }}>
        평균 평점: 
        <Rating value={averageRating} precision={0.1} readOnly />
      </Typography>
      {reviews.map((review, index) => (
        <Card key={index} elevation={2} sx={{ mb: 2 }}>
          <CardHeader
            title={review.user_id}
            titleTypographyProps={{ style: { fontSize: '1.2rem' } }}
            subheader={review.date}
            action={
              <Rating value={review.rating} readOnly />
            }
          />
          <CardContent>
            <Typography variant="body2" color="text.primary">
              {review.comment}
            </Typography>
          </CardContent>
          {index < reviews.length - 1 && <Divider />}
        </Card>
      ))}
    </Container>
  );
};

export default RatingReview;
