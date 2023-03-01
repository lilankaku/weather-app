
export const getAPIKey = async () =>{

    let headers = new Headers();
    headers.set('Authorization', 'Basic ' + btoa(process.env.REACT_APP_USERNAME + ":" + process.env.REACT_APP_PASSWORD))
    
    try{
        const res = await fetch('https://login.meteomatics.com/api/v1/token', {
            method: 'GET', 
            headers: headers,
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
        return data.access_token
    }catch(err){
        console.log(err)
    }
}

