import { Box, Container, Divider, Typography } from "@mui/material";


const mock = {
  "coord": {
    "lon": 139,
    "lat": 35
  },
  "weather": [
    {
      "id": 803,
      "main": "Clouds",
      "description": "broken clouds",
      "icon": "https://cdn.glitch.com/6e8889e5-7a72-48f0-a061-863548450de5%2F04d.png?1499366020964"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 28.23,
    "pressure": 1011,
    "humidity": 74,
    "temp_min": 26,
    "temp_max": 31
  },
  "visibility": 10000,
  "wind": {
    "speed": 3.6,
    "deg": 230
  },
  "clouds": {
    "all": 75
  },
  "dt": 1499396400,
  "sys": {
    "type": 1,
    "id": 7616,
    "message": 0.0043,
    "country": "JP",
    "sunrise": 1499369792,
    "sunset": 1499421666
  },
  "id": 1851632,
  "name": "Shuzenji",
  "cod": 200
}

const Weather = ({data}) => {
  console.log(data)
  return (
    <Box sx={{ p: 0}}>
      {(!data) ? <></> : (
        <>
          <Typography variant="h5" sx={{ fontWeight: "bold", my: 1 }} >날씨</Typography>
          <Typography variant="span" sx={{ fontSize: "10px", color: "gray"}}>
            {data.lendplace.statn_addr2 ? data.lendplace.statn_addr2 : data.lendplace.statn_addr1}의 날씨
          </Typography>
          <Divider sx={{my: 1}} />
          <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", pb: 3}}>
            <img src={"https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"} style={{ width: "130px"}}/>
            <Typography variant="span">
              {data.weather[0].main} : {data.weather[0].description}
            </Typography>
          </Box>
          <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
            <Box sx={{display: "flex", flexDirection: "column"}}>
              <Typography variant="span">현재 온도</Typography>
              <Typography variant="span">{data.main.temp}도</Typography>
            </Box>
            <Box sx={{display: "flex", flexDirection: "column"}}>
              <Typography variant="span">최저 온도</Typography>
              <Typography variant="span">{data.main.temp_min}도</Typography>
            </Box>
            <Box sx={{display: "flex", flexDirection: "column"}}>
              <Typography variant="span">최고 온도</Typography>
              <Typography variant="span">{data.main.temp_max}도</Typography>
            </Box>
          </Box>
          

        </>
      )}
      
      
    </Box>
  )
}

export default Weather;