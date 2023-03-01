import React from 'react'

export const fetchData = async (location, queryDate, token) => {
    const endpoint = 'https://api.meteomatics.com' // add an /
    const date = queryDate
    const longitude = location.longitude
    const latitude = location.latitude
    const url = `${endpoint}/${date}:PT1H/t_2m:C,windchill:C,relative_humidity_2m:p,dew_point_2m:C,wind_speed_2m:ms,visibility:m,precip_1h:mm/${longitude},${latitude}/json?access_token=${token}`
    
    try{
        const res = await fetch(url, {
                method: 'GET',
            })
        
            
        const data = await res.json()
        return data.data

    }catch(err){
        console.log(err)
    }
}
