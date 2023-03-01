import React, {useState, useEffect, useContext} from 'react'
import '../../../styles/filter.css'
import Location_Icon from '../../../assets/Location_Icon.png'
import { DataContext } from '../../../contexts/DataContext'
import { AuthContext } from '../../../contexts/AuthContext'
import cityData from '../../../data/cityData'
import { fetchData } from '../../../api/fetchData'


function Filter() {

    const {setDateRange, setCity, setData} = useContext(DataContext)
    const {token} = useContext(AuthContext);

    const [userInput, setUserInput] = useState({
        startDate: new Date().toISOString().substring(0,10),
        endDate: new Date().toISOString().substring(0,10),
        city: 'stockholm' 
    })

    useEffect(() => {
        if(userInput.startDate && userInput.endDate && userInput.startDate > userInput.endDate){
            alert("End date cannot be before the stater date")
        }
    }, [userInput]);

    const handleUserInput = (e) => {
        const name = e.target.name
        const value = e.target.value

            setUserInput(
                prevState => ({
                    ...userInput,
                    [name]: value
                })
            )
    }

    Date.prototype.addDays = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }

    const handleSubmit = () => {
        let date = new Date(userInput.endDate);
        let endDate = date.addDays(1)

        const dateRange = new Date(userInput.startDate).toISOString() + '--' + new Date(endDate).toISOString()
        setDateRange(dateRange)
        setCity(cityData[userInput.city])
        console.log("getting Data")
        console.log(dateRange)

        fetchData(cityData[userInput.city], dateRange, token).then(data =>{
            setData(data)
            console.log(data)
        })
    }

    return (
    <div className="filter-container">
        <div className="filter-selectors">
            <button>
                <img className="location-icon" src={Location_Icon}/>
            </button>

            <div>
                <form>
                    <label> From: </label>
                        <input 
                            type='date'
                            name='startDate'
                            onChange={(e) => handleUserInput(e)}
                        >
                        </input>
                    
                    <label> To: </label>
                        <input 
                            type='date'
                            name='endDate'
                            onChange={(e) => handleUserInput(e)}
                        ></input>
                </form>
            </div>
        </div>
        <div className="filter-location-selector">
                <select className="filter-location-input" name="city" id="city" onChange={(e)=>handleUserInput(e)}>
                    <option value="stockholm">Stockholm, SE</option>
                    <option value="newYork">New York, US</option>
                    <option value="toronto">Toronto, CA</option>
                    <option value="london">London, UK</option>
                </select>
                <button 
                    className="filter-location-search-btn"
                    onClick={()=>handleSubmit() }
                >
                    Search
                </button>
        </div>
    </div>
    )
}

export default Filter