import React, { Component } from "react";

export default class WeatherDisplay extends Component{
    state = {
        weatherData: null
      };

      componentDidMount() {
        const name = this.props.name;
        const URL ="https://api.openweathermap.org/data/2.5/weather?q=" + 
        name + 
        "&lang=en&units=metric&appid=f71010b80a0cfa1712fe9aebe36c2d58";
        fetch(URL).then(res => res.json()).then(json => {
            this.setState({weatherData : json});
        });
    }

    render() {
        const weatherData = this.state.weatherData;
        if (!weatherData) return <div>Loading...</div>
        const weather = weatherData.weather[0];
        const iconUrl = "http://openweathermap.org/img/w/" + 
        weather.icon + 
        ".png";
        return (
            <div>
                <h1>
                    {weather.main} in {weatherData.name}
                    <img src={iconUrl} alt={weatherData.description} />
                </h1>
                <p>Current: {weatherData.main.temp.toFixed(0)}°С</p>
                <p>High: {weatherData.main.temp_max.toFixed(0)}°С</p>
                <p>Low: {weatherData.main.temp_min.toFixed(0)}°С</p>
                <p>Wind Speed: {weatherData.wind.speed} mi/hr</p>
            </div>
        );
    }
}
