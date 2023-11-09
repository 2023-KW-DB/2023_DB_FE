import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper, List, ListItem, ListItemText, Divider, Rating } from '@mui/material';

const mock = [
  { averageRating: 3.6,
    reviews: [
      { user_id: 'testuser1', rating: 5, comment: '평점5점'},
      { user_id: 'testuser2', rating: 3, comment: '평점3점'},
      { user_id: 'testuser3', rating: 3, comment: '평점3점'},
    ],
  }
];

const RatingReview = ({lendplace_id}) => {
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
      <Typography variant="h6" component="h2" sx={{ py: 1 }}>
        평균 평점: 
        <Rating value={averageRating} precision={0.1} readOnly />
      </Typography>
      <Paper elevation={2}>
        <List>
          {reviews.map((review, index) => (
            <React.Fragment key={index}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={`${review.user_id}`}
                  secondary={
                    <>
                      <Typography component="span" variant="body2" color="text.primary">
                        평점: <Rating value={review.rating} readOnly />
                      </Typography>
                      {" — "}{review.comment}
                    </>
                  }
                />
              </ListItem>
              {index < reviews.length - 1 && <Divider variant="inset" component="li" />}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default RatingReview;
