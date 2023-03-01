import React, {useContext, useEffect, useState} from 'react'
import { AuthContext } from '../../../contexts/AuthContext'
import { DataContext } from '../../../contexts/DataContext'
import Cloud_Icon from '../../../assets/Cloud_Icon.png'
import '../../../styles/summary.css'
import {getAPIKey} from '../../../api/getAPIKey'
import { fetchData } from '../../../api/fetchData'

function Summary() {
    const {token, setToken} = useContext(AuthContext)
    const {dateRange, city, data, setData} = useContext(DataContext)

    const [defaultLocation, setDefaultLocation] = useState({
        longitude: 43.6532,
        latitude: 79.3832, 
        name: "Toronto, CA"
    })

    Date.prototype.addHours = function(h) {
        this.setTime(this.getTime() + (h*60*60*1000));
        return this;
      }

    useEffect(() => {

        if(!token){

            let time12H = new Date().addHours(12)
            let queryDate =  new Date().toISOString() + '--' + time12H.toISOString();

            getAPIKey().then((key)=>{
                // console.log(key)
                setToken(key)
                fetchData(defaultLocation, queryDate, key).then(data =>{
                    setData(data)
                    // console.log(data)
                })
            })
        }

      return () => {
        
      }
    }, [token, dateRange, data])
    

    const getDate = () => {
        const today = new Date()
        const hours = today.getHours();
        const dateTime = 
            `${today.toLocaleString('default', 
            { month: 'short' })} ${today.getDate()}, 
            ${today.getHours() % 12 || 12}:${(today.getMinutes()<10?'0':'')}${today.getMinutes()}${hours >= 12 ? 'pm' : 'am'}`
        return dateTime
    }

    return (
    <div className="summary-container">
        <p className="summary-date">    
            {getDate()}
        </p>
        <h2>
            { Object.keys(city).length === 0  ? "Toronto, CA" : city.name} 
        </h2>
        <p className = "summary-wind-chill">
            Feels like { Object.keys(data).length === 0  ? 0 : data[1].coordinates[0].dates[0].value}
            <span><sup>o</sup></span>C
        </p>
        <div className="summary-stats">
            <div className="summary-stats-left">
                <img className="summary-cloud-image" src={Cloud_Icon}/>
                <h3>
                    { Object.keys(data).length === 0  ? 0 : data[0].coordinates[0].dates[0].value}
                    <span><sup>o</sup></span>C
                </h3>
            </div>
            <div className="summary-stats-right">
                <p>
                    Wind: { Object.keys(data).length === 0  ? 0 : data[4].coordinates[0].dates[0].value}m/s
                </p>
                <p>
                    Humidity:  { Object.keys(data).length === 0  ? 0 : data[2].coordinates[0].dates[0].value}%
                </p>
                <p>
                    Dew point: { Object.keys(data).length === 0  ? 0 : data[3].coordinates[0].dates[0].value}
                    <span><sup>o</sup></span>C
                </p>
                <p>
                    Visibility: { Object.keys(data).length === 0  ? 0 : (data[5].coordinates[0].dates[0].value/1000).toFixed(1)}km
                </p>
            </div>
        </div>
    </div>
    )
}

export default Summary