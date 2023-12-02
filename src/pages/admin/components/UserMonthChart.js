import React, { useRef, useEffect, useState } from "react";
import ECharts, { EChartsReactProps } from "echarts-for-react";
import moment from "moment";

const UserMonthChart = ({ data }) => {
  const [options, setOptions] = useState({});

  useEffect(() => {
    console.log(data);
    let minDate = undefined;
    let maxDate = undefined;
    for (let i = 0; i < data.length; i++) {
      const date = new Date(data[i].arrival_time);
      if (minDate === undefined || date < minDate) {
        minDate = date;
      }
      if (maxDate === undefined || date > maxDate) {
        maxDate = date;
      }
    }
    const useDistanceData = new Array(31).fill(0);
    const useCountData = new Array(31).fill(0);

    for (let i = 0; i < data.length; i++) {
      const date = new Date(data[i].arrival_time);
      const day = date.getDate() - 1;
      useDistanceData[day] += data[i].use_distance;
      useCountData[day] += 1;
    }

    const xAxisData = [];
    for (let i = 0; i < useDistanceData.length; i++) {
      xAxisData.push(i + 1);
    }
    if (useDistanceData[30] === 0) {
      xAxisData.pop();
    }
    if (useDistanceData[29] === 0) {
      xAxisData.pop();
    }
    if (useDistanceData[28] === 0) {
      xAxisData.pop();
    }
    for (let i = 0; i < useDistanceData.length; i++) {
      useDistanceData[i] = Math.round(useDistanceData[i] / 1000);
    }
    const options = {
      title: {
        text: "일자별 이동거리 및 횟수",
      },
      tooltip: {
        trigger: "item",
        formatter: function (params) {
          if (params.seriesName === "이동거리") {
            return params.seriesName + "<br/>" + params.name + "일: " + params.value + "km";
          } else {
            return params.seriesName + "<br/>" + params.name + "일: " + params.value + "회";
          }
        },
      },
      xAxis: {
        data: xAxisData,
      },
      yAxis: [
        {
          type: "value",
          name: "이동거리",
          axisLabel: {
            formatter: "{value} km",
          },
          alignTricks: true,
        },
        {
          type: "value",
          name: "이용횟수",
          axisLabel: {
            formatter: "{value} 회",
          },
          alignTricks: true,
        },
      ],
      series: [
        {
          name: "이동거리",
          type: "line",
          data: useDistanceData,
          yAxisIndex: 0,
        },
        {
          name: "이용횟수",
          type: "line",
          data: useCountData,
          yAxisIndex: 1,
        },
      ],
    };
    setOptions(options);
  }, [data]);

  return <ECharts option={options} opts={{ renderer: "svg", height: "400px" }} />;
};

export default UserMonthChart;
