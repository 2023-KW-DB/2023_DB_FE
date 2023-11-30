import { useEffect, useState } from "react";
import bikeStationData from "./bikeStationData.json";
import { Box, Button, CircularProgress, Link, Rating, Typography } from "@mui/material";
import ReactDOMServer from "react-dom/server";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { Link as RouterLink } from "react-router-dom";
const { kakao } = window;

const KakaoMap = ({ onClickMarker, isOnRent }) => {
  const [lat, setLat] = useState(37.62019307507592);
  const [long, setLong] = useState(127.0586406171661);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [bikeInformationData, setBikeInformationData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL + "/station/get-all-lendplace?user_id=1", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        if (response.status !== 200) {
          throw new Error("자전거 대여소 정보를 가져오는데 실패하였습니다.");
        }
        const jsonData = await response.json();
        setBikeInformationData(jsonData.result);
        setIsLoaded(true);
      } catch (error) {
        console.log(error);
        alert("자전거 대여소 정보를 가져오는데 실패하였습니다.");
        setIsLoaded(true);
      }
    })();
  }, []);

  // const bikeInformationData = bikeStationData.DATA;
  const updateMarkder = (map, leftTop, rightBottom) => {
    const newMarkers = [];
    // Clear all markers in map
    markers.forEach((marker) => {
      marker.setMap(null);
    });

    for (let i = 0; i < bikeInformationData.length; i++) {
      const bikeStation = bikeInformationData[i];

      // if lat and lnt is not in the range, remove marker
      if (
        bikeStation.startn_lat < leftTop.getLat() ||
        bikeStation.startn_lat > rightBottom.getLat() ||
        bikeStation.startn_lnt < leftTop.getLng() ||
        bikeStation.startn_lnt > rightBottom.getLng()
      ) {
        continue;
      }

      const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(bikeStation.startn_lat, bikeStation.startn_lnt),
        text: `[${bikeStation.lendplace_id}]`,
        clickable: true,
        id: bikeStation.lendplace_id,
      });
      const infoWindow = new kakao.maps.InfoWindow({
        content: ReactDOMServer.renderToString(
          <Box style={{ padding: 5, fontSize: 12, minHeight: 100, minWidth: 175 }}>
            [{bikeStation.lendplace_id}]
            <br />
            {bikeStation.statn_addr2 ? bikeStation.statn_addr2 : bikeStation.statn_addr1}
            <br />
            <Box style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              {bikeStation.favorite ? <StarIcon /> : <StarOutlineIcon />}
              {/* <Rating name="read-only" value={bikeStation.average_rating} readOnly precision={0.1} /> */}
              <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <Typography variant="body1" sx={{ px: 2, py: 0, my: 0 }} style={{ marginTop: 0, marginBottom: 0, textAlign: "right" }}>
                  평균 평점 : {bikeStation.average_rating}점
                </Typography>
                <Typography variant="body1" sx={{ px: 2, py: 0, my: 0 }} style={{ marginTop: 0, marginBottom: 0, textAlign: "right" }}>
                  자전거 대수 : {bikeStation.usable_bikes}대
                </Typography>
              </Box>
            </Box>
          </Box>,
        ),
        removable: true,
      });

      // 마커에 마우스오버 이벤트를 등록합니다
      kakao.maps.event.addListener(marker, "mouseover", () => {
        infoWindow.open(map, marker);
      });

      kakao.maps.event.addListener(marker, "mouseout", () => {
        setTimeout(() => {
          infoWindow.close();
        }, 3000);
      });

      // 마커 이벤트 리스너 등록
      kakao.maps.event.addListener(marker, "click", () => {
        onClickMarker(marker, bikeStation);
      });
      newMarkers.push(marker);
    }
    setMarkers(newMarkers);
  };

  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(lat, long),
      level: 3,
    };

    //
    const map = new kakao.maps.Map(container, options);
    setMap(map);

    kakao.maps.event.addListener(map, "dragend", () => {
      const leftTop = map.getBounds().getSouthWest();
      const rightBottom = map.getBounds().getNorthEast();
      updateMarkder(map, leftTop, rightBottom);
    });

    kakao.maps.event.addListener(map, "zoom_changed", () => {
      const leftTop = map.getBounds().getSouthWest();
      const rightBottom = map.getBounds().getNorthEast();
      updateMarkder(map, leftTop, rightBottom);
    });
    map.addOverlayMapTypeId(kakao.maps.MapTypeId.BICYCLE);
    updateMarkder(map, map.getBounds().getSouthWest(), map.getBounds().getNorthEast());

    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
  }, [isLoaded]);

  useEffect(() => {
    if (map) {
      const moveLatLon = new kakao.maps.LatLng(lat, long);
      map.setCenter(moveLatLon);
    }
  }, [lat, long]);

  return (
    <>
      <div
        id="map"
        style={{
          width: "100%",
          height: "100%",
        }}
      ></div>

      {bikeInformationData.length === 0 && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            alignItems: "center",
            zIndex: 9900,
            backgroundColor: "black",
            opacity: 0.7,
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h1 style={{ color: "white" }}>자전거 대여소 정보를 가져오는 중입니다.</h1>
          <CircularProgress />
        </div>
      )}
    </>
  );
};

export default KakaoMap;
