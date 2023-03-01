
export const getAPIKey = async () =>{

    let headers = new Headers();
    headers.set('Authorization', 'Basic ' + btoa(process.env.REACT_APP_USERNAME + ":" + process.env.REACT_APP_PASSWORD))
    
    try{
        const res = await fetch('https://login.meteomatics.com/api/v1/token', {
            method: 'GET', headers: headers
        })

        const data = await res.json()
        return data.access_token
    }catch(err){
        console.log(err)
    }
}

