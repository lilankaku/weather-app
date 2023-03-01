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
                body: undefined, // string, FormData, Blob, BufferSource, or URLSearchParams
                referrer: "about:client", // or "" to send no Referer header,
                // or an url from the current origin
                referrerPolicy: "strict-origin-when-cross-origin", // no-referrer-when-downgrade, no-referrer, origin, same-origin...
                mode: "cors", // same-origin, no-cors
                credentials: "same-origin", // omit, include
                cache: "default", // no-store, reload, no-cache, force-cache, or only-if-cached
                redirect: "follow", // manual, error
                integrity: "", // a hash, like "sha256-abcdef1234567890"
                keepalive: false, // true
                signal: undefined, // AbortController to abort request
                window: window // null 
            })
        
            
        const data = await res.json()
        return data.data

    }catch(err){
        console.log(err)
    }
}
