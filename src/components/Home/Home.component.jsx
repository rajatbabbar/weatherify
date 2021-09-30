import React, { useEffect, useState } from "react";
import "./home.scss";
export default function Home() {
    const [locationCity, setLocatonCity] = useState();
    const [minTemp, setMinTemp] = useState();
    const [maxTemp, setMaxTemp] = useState();
    const [currTemp, setCurrTemp] = useState();
    const [feelsLike, setFeelsLike] = useState();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            let getWeather = async () => {
                try {
                    let res = await fetch(
                        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
                    );

                    const location = await res.json();
                    console.log(location);
                    setLocatonCity(location.name);
                    setMinTemp(location.main.temp_min);
                    setMaxTemp(location.main.temp_max);
                    setCurrTemp(location.main.temp);
                    setFeelsLike(location.main.feels_like);
                } catch (e) {
                    console.log(e);
                }
            };
            getWeather();
        });
    }, []);

    return (
        <div className="container">
            <h1 className="city">City: {locationCity}</h1>
            <h3 className="temp">Temperature is: {Math.round(currTemp)}</h3>
            <div className="max-temp">
                Maximum Temperature is:
                {Math.round(maxTemp)}
            </div>
            <div className="min-temp">
                Minimum Temperature is:
                {Math.round(minTemp)}
            </div>

            <div className="feels-like">
                Due to Humidity feels like is: {Math.round(feelsLike)}
            </div>
        </div>
    );
}
