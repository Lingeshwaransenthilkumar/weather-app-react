import { useState } from "react";
import { useEffect } from "react";
import propTypes from 'prop-types';
// images (we have to use or import images like this only)
import clearIcon from "./assets/clear.png";
import cloudIcon from "./assets/cloud.png";
import mistIcon from "./assets/mist.png";
import rainIcon from "./assets/rain.png";
import snowIcon from "./assets/snow.png";
import windIcon from "./assets/wind.png";
import humidityIcon from "./assets/humidity.png";
import drizzleIcon from "./assets/drizzle.png";
import errorImg from './assets/404.png';


// we are going to pass this as a prop
const Weatherdetails = ({icon,temp,location,country,lat,long,wind,humidity})=>{
    return(
        <>
        <div className="image">
            <img src={icon} alt="" />
        </div>
        <div className="temp">{temp}°C</div>
        <div className="location">{location}</div>
        <div className="country">{country}</div>
        <div className="cord">
            <div>
                <span>Latitude</span>
                <span className="latitude">{lat}</span>
            </div>
            <div>
                <span>Longitude</span>
                <span className="longitude">{long}</span>
            </div>
        </div>
        <div className="data-container">
            <div className="element">
                <img src={humidityIcon} alt="" className="icon-1"/>
                <div className="data">
                    <div className="humidity-percent">{humidity}%</div>
                    <div className="text">Humidity</div>
                </div>
            </div>
            <div className="element">
                <img src={windIcon} alt="" className="icon-2"/>
                <div className="data">
                    <div className="wind-percent">{wind} km/hr</div>
                    <div className="text">Wind</div>
                </div>
            </div>
        </div>
        </>
    )
}

Weatherdetails.protoTypes = {
    icon:propTypes.string.isRequired,
    temp:propTypes.number.isRequired,
    location:propTypes.string.isRequired,
    country:propTypes.string.isRequired,
    humidity:propTypes.number.isRequired,
    wind:propTypes.number.isRequired,
    lat:propTypes.number.isRequired,
    long:propTypes.number.isRequired
}


function Weatherapp(){
    let apiKey = '445aa8d24582275cf52fd85ed17579ab'
    const [icon,setIcon]=useState(drizzleIcon);
    const [temp,setTemp]=useState(0);
    const [location,setLocation]=useState("Chennai");
    const [country,setCountry]=useState("IN");
    const [lat,setLat]=useState(0);
    const [long,setLong]=useState(0);
    const [wind,setWind]=useState(0);
    const [humidity,setHumidity]=useState(0);
    const [text,setText]=useState('chennai');
    const [cityNotFound,setCityNotFound]=useState(false);
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(null);


    // weather icons 
    const weatherIconMap={
        "01d":clearIcon,
        "01n":clearIcon,
        "02d":cloudIcon,
        "02n":cloudIcon,
        "50d":mistIcon,
        "50n":mistIcon,
        "03d":drizzleIcon,
        "03n":drizzleIcon,
        "04d":drizzleIcon,
        "04n":drizzleIcon,
        "09d":rainIcon,
        "09n":rainIcon,
        "13d":snowIcon,
        "13n":snowIcon

    }



    // change event used in input 
    const handleCity=(e)=>{
        setText(e.target.value);
    }

    const handleKeyDown = (e)=>{
        if(e.key==="Enter"){
            search();
        }

    }

    useEffect(function(){
        search();
    },[])


       
    const search = async()=>{
        setLoading(true);
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${apiKey}`;

        try{
            let res = await fetch(url);
            let data = await res.json();
            console.log(data)
            if(data.cod==="404"){
                console.error("city not found");
                setCityNotFound(true);
                setLoading(false)
                //alert("City not found")
                return
            }

            setHumidity(data.main.humidity);
            setWind(data.wind.speed);
            setTemp(Math.floor(data.main.temp -  273.15));
            setLocation(data.name);
            setCountry(data.sys.country);
            setLat(data.coord.lat);
            setLong(data.coord.lon)
            setCityNotFound(false);
            const weatherIconCode = data.weather[0].icon;
            // to get dict value
            setIcon(weatherIconMap[weatherIconCode] || clearIcon);

        }catch(error){
            console.log("error occured"+error);
            setError("An error occured while fetching weather data");
        }finally{
            setLoading(false);

        }
    }

    return(
        <>
        
          <div className="container">
            <div className="input-container">
                <input type="text" name="city" className="cityInput" placeholder="Search City" onChange={handleCity} value={text} onKeyDown={handleKeyDown}/>
                <div className="search-icon">
                    <ion-icon name="search-outline" onclick={()=>{search}}></ion-icon>
                </div>
            </div>
            

            {/* conditional rendering */}
            {loading && <div className="loading-message">Loading...</div>}
            {error && <div className="error-message">{error}</div>}
            {cityNotFound && <div className="cityNotFound">City not found</div>}
            {cityNotFound && <img className="errorImg" src={errorImg}/>}

            {/* we are going to conditionaly render weather details if city not found and loading exists */}
            {!cityNotFound && !loading && <Weatherdetails icon ={icon} temp={temp} location={location} country={country} lat={lat} long={long} humidity={humidity} wind={wind}/>}
          </div>
        </>
    )
}


export default Weatherapp;