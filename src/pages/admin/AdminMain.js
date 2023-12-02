import React, { useRef, useEffect, useState } from "react";
import ECharts, { EChartsReactProps } from "echarts-for-react";
import UserDistanceChart from "./components/UserMonthChart";
import { Box, Button, ButtonGroup, CircularProgress, Divider, Typography } from "@mui/material";
import moment from "moment";
import UserMonthChart from "./components/UserMonthChart";
import UserWeekChart from "./components/UserWeekChart";
const AdminMain = () => {
  const [month, setMonth] = useState(12);
  const [year, setYear] = useState(2023);
  const [options, setOptions] = useState({});
  const [rawData, setRawData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    let monthStartDate = new Date(year, month - 1, 1);
    let monthEndDate = new Date(year, month, 0);
    // Format date like 2023-10-01 00:20:00
    let monthStart = moment(monthStartDate).format("YYYY-MM-DD HH:mm:ss");
    let monthEnd = moment(monthEndDate).format("YYYY-MM-DD HH:mm:ss");

    (async () => {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL + `/get-between-userlog?start=${monthStart}&end=${monthEnd}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status !== 200) {
          throw new Error("데이터를 가져오는데 실패하였습니다.");
        }
        const data = await response.json();
        setRawData(data.result);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [month, year]);

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "start", alignItems: "center" }}>
        <ButtonGroup>
          <Button
            onClick={() => {
              if (year > 1) {
                setYear(year - 1);
              }
            }}
          >
            이전 년도
          </Button>
          <Button>
            <Typography variant="span">{year}년</Typography>
          </Button>
          <Button
            onClick={() => {
              setYear(year + 1);
            }}
          >
            다음 년도
          </Button>
        </ButtonGroup>
        <ButtonGroup sx={{ pl: 5 }}>
          <Button
            onClick={() => {
              if (month > 1) setMonth(month - 1);
            }}
          >
            이전 달
          </Button>
          <Button>{month}월</Button>
          <Button
            onClick={() => {
              if (month < 12) setMonth(month + 1);
            }}
          >
            다음 달
          </Button>
        </ButtonGroup>
      </Box>
      <Divider sx={{ py: 3 }} />
      <Typography variant="h5">월별 이용자 거리 및 횟수</Typography>
      <UserMonthChart data={rawData} />
      <Typography variant="h5" sx={{ pt: 10 }}>
        주간 이용자 거리 및 횟수
      </Typography>
      <UserWeekChart data={rawData} />

      <Box sx={{ pt: 10 }}></Box>

      {isLoading && (
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
          <h1 style={{ color: "white" }}>정보를 가져오는 중입니다.</h1>
          <CircularProgress />
        </div>
      )}
    </>
  );
};

export default AdminMain;
