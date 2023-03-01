import { useEffect, useState, useContext } from 'react'
import { LineChart } from '../../charts/LineChart'
import { BarChart } from '../../charts/BarChart'
import { DataContext } from '../../../contexts/DataContext'
import cityData from '../../../data/cityData'

import '../../../styles/timeseries.css'

function Timeseries() { 

    const [chart, setChart] = useState('temperature')
    const {dateRange, city, data} = useContext(DataContext)


    useEffect(() => {
        // console.log(chart)
      return () => {
      }
    },[chart])

    const handleClick = (e) => {
        setChart(e.target.name)
    }
    

  return (
    <div className="timeseries-container">
        <div className="timeseries-options-container">
            <button name="temperature" onClick={(e)=>handleClick(e)} style={ chart === "temperature"? {"textDecoration": "underline 2px rgb(255, 204, 0)"} : {}}>
                Temperature
            </button>
            <button name="Humidity" onClick={(e)=>handleClick(e)} style={ chart === "Humidity"? {"textDecoration": "underline 2px rgb(255, 204, 0)"} : {}}>
                Humidity
            </button>
        </div>
        <div className="chart" >    
            { chart === 'temperature' ?  <LineChart/> : <BarChart/>}
        </div>
    </div>
  )
}

export default Timeseries