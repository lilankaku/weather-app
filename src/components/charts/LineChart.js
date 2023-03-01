import React, {useEffect, useContext, useState} from 'react';
import { DataContext } from '../../contexts/DataContext'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
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
      text: 'Chart.js Line Chart',
    },
  },
};


export function LineChart() {
  const [arr, setArr] = useState([])
  const [labels, setLabels] = useState([]);

  const {data} = useContext(DataContext)

  const [chartData, setCharData] = useState({
    labels,
    datasets: [
      {
        fill: true,
        label: '',
        data: arr,
        borderColor: 'rgb(255, 204, 0)',
        backgroundColor: 'rgba(255, 245, 204, 0.5)',
      },
    ],
  })

  function assignData(){
    let tempArr = Object.keys(data).length === 0  ? 0 : data[0].coordinates[0].dates.map((val) => {
      return val.value
    })

    let labelValues=[]
    let newSet = new Set()

    labelValues = Object.keys(data).length === 0  ? 0 : data[0].coordinates[0].dates.map((val) => {
      let date = new Date(val.date)
      let hours = date.getHours();
      if(data[0].coordinates[0].dates.length <= 48){
        newSet.add(`${date.getHours() % 12 || 12}${hours >= 12 ? 'pm' : 'am'}`)
        return `${date.getHours() % 12 || 12}${hours >= 12 ? 'pm' : 'am'}`
      }
      else{
        let date = new Date(val.date)
        let day = `${date.getDate()}/${date.getMonth()+1}`
        newSet.add(day)
          return day
      }
    })
    // console.log(labelValues[200])
    labelValues  = [...newSet];
    labelValues = labelValues.slice(1, (labelValues.length));
    console.log(labelValues)

    setCharData(prevData => ({
      labels: labelValues,
      datasets: [
        {
          fill: false,
          label: '',
          data: tempArr,
          borderColor: 'rgb(255, 204, 0)',
          backgroundColor: 'rgba(255, 245, 204, 0.5)',
        },
      ],
    }))
  }

  useEffect(() => {
    assignData()
    return () => {
    }
  }, [data])
  

  return <Line options={options} data={chartData} />;
}
