import { Container, Typography, Rating, Divider, TextField, Button, Box } from "@mui/material"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

const startMock = {"statn_lat":37.534390,"statn_addr1":"서울특별시 양천구 목동중앙로 49","lendplace_id":"ST-997","statn_addr2":"목동3단지 시내버스정류장","statn_lnt":126.869598}
const endMock = {"statn_lat":37.549061,"statn_addr1":"서울특별시 마포구 마포대로 163","lendplace_id":"ST-992","statn_addr2":"서울신용보증재단","statn_lnt":126.954178}


const RatingInfo = ({type, isSubmitted, posInfo, submitHandler}) => {
   
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  return (
    <>
    <Typography component="h5" variant="h6" sx={{py: 3}}>
      {type}
    </Typography>
    <TextField
      variant="standard"
      sx={{ py: 1 }}
      value={
        posInfo
          ? posInfo.statn_addr2 ? posInfo.statn_addr2 : posInfo.statn_addr1
          : ""
      }
      InputProps={{ readOnly: true }}
    />
    { isSubmitted
      ? (
        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", width: "100%", height: "200px" }}>
          <Typography component="h5" variant="h6" sx={{py: 3, alignItems: "center", justifyContent: "center"}}>
            리뷰 작성이 완료되었습니다. 😄
          </Typography>
          <Button variant="text" color="primary" component={RouterLink} to="/ratingreview">
            리뷰확인하기
          </Button>  
        </Box>
          
      )
      : (
        <Box sx={{ display: "flex", flexDirection: "column", "height": "200px" }}>
          <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
            <Box></Box>
            <Rating
              name="simple-controlled"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
              sx={{ "py": 2, "fontSize": "4rem" }}
            />
            <Box></Box>
          </Box>
          <Box
            sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%", mt: 2 }}
          >
            <TextField
              variant="outlined"
              sx={{ width: "70%", mx: 5, py: 0 }}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="후기를 입력해주세요"
            />
            <Button
              type="button"
              variant="contained"
              color="primary"
              onClick={() => submitHandler(rating, comment)}
              sx={{ width: "20%", py: 1 }}
            >
              작성하기
            </Button>
          </Box>
        </Box>
      )}
    </>
  )
}

const TravelRating = () => {
  const dispatch = useDispatch();
  const startPosInfo = useSelector((state) => state.position.startPos);
  const endPosInfo = useSelector((state) => state.position.endPos);
  const [isStartSubmitted, setIsStartSubmitted] = useState(false);
  const [isEndSubmitted, setIsEndSubmitted] = useState(false);
  // const [startPosInfo, setStartPosInfo] = useState(startMock);
  // const [endPosInfo, setEndPosInfo] = useState(endMock);

  useEffect(() => {
    // TODO: fetch data from server
  }, [])

  const onSubmitStart = (startRating, startComment) => {
    console.log()
    console.log(startPosInfo.lendplace_id, startRating, startComment);
    setIsStartSubmitted(true);
  }

  const onSubmitEnd = (endRating, endComment) => {
    console.log(endPosInfo.lendplace_id, endRating, endComment);
    setIsEndSubmitted(true);
  }

  return (
    <Container component="main" maxWidth="md">
      <Typography component="h1" variant="h5" sx={{ py: 3 }}>
        별점
      </Typography>
      <Divider />
      <Box sx={{ display: "flex", flexDirection: "column"}}>
        <RatingInfo type="출발지" posInfo={startPosInfo} submitHandler={onSubmitStart} isSubmitted={isStartSubmitted}/>
        <Divider sx={{ py: 3 }}/>
        <RatingInfo type="도착지" posInfo={endPosInfo} submitHandler={onSubmitEnd} isSubmitted={isEndSubmitted}/>
      </Box>
    </Container>
  )
}

export default TravelRating;