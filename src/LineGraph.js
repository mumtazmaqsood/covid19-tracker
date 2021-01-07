import React, { useEffect, useState } from 'react';
import { Line } from "react-chartjs-2";
import numeral from "numeral";



const options = {
  legend: {   // it display undefined rect on top
    display: false,
  },
  elements: {  //if it removes it ll show dotted on line
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,  //when cursor moving on line , it is showing digits
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: { //showing gridlines on chart if removed
          display: false,
        },
          ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

const buildChartData = (data, casesType) => {
  const chartData = [];
  let lastDataPoint;
  for (let date in data.cases) {
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint
      }
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
  }
  console.log("chartData", chartData)
  return chartData;
};



export const LineGraph = ({ casesType }) => {

  const [data, setData] = useState({});

  useEffect(() => {

    const fetchData = async () => {
      await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=30")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log("LineData123", data)
          let chartData = buildChartData(data, casesType);
          setData(chartData);

        });
    }
    fetchData();

  }, [casesType]);

  console.log("chardata", data)

  return (
    <div>
      
      <h3>World Wide new Cases </h3>
      {data?.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                backgroundColor: "rgba(204, 16, 52, 0.5)",
                borderColor: "#CC1034",
                data: data,
              },
            ],
          }}
          options={options}
        />
      )}
      


     


    </div>
  );
}


