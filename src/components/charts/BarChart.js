import React, {useEffect, useContext, useState} from 'react';
import { DataContext } from '../../contexts/DataContext'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
    display: false,
      position: 'top',
    },
    title: {
      display: false,
      text: 'Chart.js Bar Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const datas = {
  labels,
  datasets: [
    {
      data: [ 1, 2, 3, 4, 5],
      backgroundColor: 'rgba(138, 176, 245, 1)',
    }
  ],
};

export function BarChart() {
  const [arr, setArr] = useState([])
  const [labels, setLabels] = useState([]);

  const {data} = useContext(DataContext)

  const [chartData, setCharData] = useState({
    labels,
    datasets: [
      {
        data: arr,
        backgroundColor: 'rgba(138, 176, 245, 1)',
      },
    ],
  })

  function assignData(){
    let tempArr = Object.keys(data).length === 0  ? 0 : data[2].coordinates[0].dates.map((val) => {
      return val.value
    })

    let labelValues=""

    if(data[2].coordinates[0].dates.length <= 48 ){
        labelValues = Object.keys(data).length === 0  ? 0 : data[2].coordinates[0].dates.map((val) => {
          let date = new Date(val.date)
          let hours = date.getHours();
          return `${date.getHours() % 12 || 12}${hours >= 12 ? 'pm' : 'am'}`
        })
    }
    else {
      let prevValues=[]
      console.log(labelValues)
      labelValues = Object.keys(data).length === 0  ? 0 : data[2].coordinates[0].dates.map((val) => {
        
        let date = new Date(val.date)
        let day = `${date.getDate()}/${date.getMonth()+1}`
        console.log(day)
        if(!prevValues.includes(day)){
          prevValues.push(day)
          return day
        }
      })
    }
    labelValues = [...new Set(labelValues)];
    labelValues = labelValues.slice(2, (labelValues.length));


    setCharData({
      labels: labelValues,
      datasets: [
        {
          data: tempArr,
          backgroundColor: 'rgba(138, 176, 245, 1)',
        },
      ],
    })
  }

  useEffect(() => {
    assignData()
    console.log(data)
    return () => {
    }
  }, [data])
  
  return <Bar options={options} data={chartData} />;
}