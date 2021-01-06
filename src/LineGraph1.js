import { keys } from '@material-ui/core/styles/createBreakpoints';
import { ArrowRight } from '@material-ui/icons';
import numeral, { set } from 'numeral';
import React, { useEffect, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';



const options = {
  legend: {   // it display undefined rect on top
    display: false,
  },
  elements: {  //if it removes it ll show dotted on line
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,  //?
  tooltips: {
    mode: "index",
    intersect: false,  //if it is true , then it will not showing digits on line while moving
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
  const lineData = [];
  let lastDataPoint;
  for (let date in data.cases) {
    if (lastDataPoint) {     //first time is false and directly goes to lastDatapoint
      let newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint    //current infected number - last day infected 
      }
      lineData.push(newDataPoint) //push it in array with x-axix and y-axix
    }
    lastDataPoint = data[casesType][date]; //it has total infected numbers 
  }
  return lineData;
}


export const LineGraph1 = ({ casesType }) => {

  const [data, setData] = useState({});


  useEffect(() => {

    const fetchData = async () => {
      await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=30")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log("LineData123", data)
          //let chartData = buildChartData(data, casesType);
          //setData(chartData);
           const chartData = buildChartData(data, casesType)
           setData(chartData)
        });
    }
    fetchData();
  }, [casesType]);


  

  return (
    <div>
      
      { data?.length > 0 && (   //it will check data length it will show problem 
         <Line
          data={{
            datasets: [
              {
                backgroundColor: "rgba(204, 16, 52, 0.5)",
                borderColor: "#CC1034",
                data: data,
              },
            ],
            
          }}options={options}
           /> 
      )
    }
    </div>
  )
}