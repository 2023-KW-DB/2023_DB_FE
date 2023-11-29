import React, { useEffect, useState } from "react";
import { Container, Typography, Card, CardContent, Box, Button, Rating, CssBaseline } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

const mock = [
  { name: "Station 1", bikes: 5, rating: 4.5, isFavorite: true },
  { name: "Station 2", bikes: 8, rating: 3.2, isFavorite: false },
  { name: "Station 3", bikes: 7, rating: 4, isFavorite: false },
  { name: "Station 4", bikes: 3, rating: 2.7, isFavorite: true },
];

const Favorite = () => {
  const [favoriteStations, setFavoriteStations] = useState(mock);
  const user = useSelector((state) => state.user);

  const toggleFavorite = (index) => {
    const updatedStations = [...favoriteStations];
    (async () => {
      try {
        const isFavorite = updatedStations[index].isFavorite;
        const response = await fetch(process.env.REACT_APP_API_URL + "/favorite/favorite-lendplace", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: user.id,
            lendplace_id: updatedStations[index].lendplace_id,
            is_favorite: !isFavorite,
          }),
          credentials: "include",
        });
        if (response.status !== 200) {
          throw new Error("즐겨찾기 추가에 실패하였습니다.");
        }
        fetchData();
      } catch (error) {
        console.log(error);
      }
    })();
    updatedStations[index].isFavorite = !updatedStations[index].isFavorite;
    setFavoriteStations(updatedStations);
    // TODO: Send request to server to update favorite stations
  };

  useEffect(() => {
    console.log(user);
    (async () => {
      fetchData();
    })();
  }, [user]);

  const fetchData = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_API_URL + `/favorite/get-lendplace?user_id=${user.id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (response.status !== 200) {
        throw new Error("자전거 대여소 정보를 가져오는데 실패하였습니다.");
      }
      const jsonData = await response.json();
      console.log(jsonData.result);
      setFavoriteStations(jsonData.result);
      // setIsLoaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Typography component="h1" variant="h5" sx={{ py: 3 }}>
        대여소 즐겨찾기
      </Typography>
      {favoriteStations.map((station, index) => (
        <Card key={index} style={{ width: "100%", marginBottom: "16px" }}>
          <CardContent>
            <Box display="flex" alignItems="center">
              <div onClick={() => toggleFavorite(index)} style={{ cursor: "pointer", marginRight: "8px" }}>
                {station.isFavorite ? <StarIcon color="warning" /> : <StarOutlineIcon color="warning" />}
              </div>
              <Box>
                <Typography variant="h6">{station.statn_addr2 ? station.statn_addr2 : station.statn_addr1}</Typography>
                <Typography variant="body1">대여가능 자전거: {station.total_bikes}</Typography>
              </Box>
              <Box marginLeft="auto" display="flex" alignItems="center">
                <Rating name={`rating-${index}`} value={station.average_rating} readOnly precision={0.1} />
                <Typography variant="body1" sx={{ marginLeft: 1 }}>
                  {station.average_rating}점
                </Typography>
                <Box marginLeft={3}></Box>
                <Button variant="contained" color="primary" component={RouterLink} to={`/ratingreview?id=${station.lendplace_id}`}>
                  후기 보기
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default Favorite;
