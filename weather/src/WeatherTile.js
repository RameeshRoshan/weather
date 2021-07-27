import React, { Component } from 'react'

export default class WeatherTile extends Component {
    
    render() {
        let {city,idx,deletecity}=this.props;
        return (
            <div className="tilediv" key={idx}>
                <button id="close" onClick={()=>deletecity(idx)} >X</button>
                <div>
                    <h2>{city.location.name}</h2>
                    <p>{city.location.region}</p>
                    <p>{city.location.tz_id}</p>
                </div>
                <div className="row_flex">
                    <div>
                        <img src={city.current.condition.icon} alt="icon"/>
                        <p id="condition">{city.current.condition.text}</p>
                    </div>
                    <div>
                        <h1 id="temp">{city.current.temp_c}<span className="small">&#x2103;</span></h1>
                        <p>Feels Like:<span>{city.current.feelslike_c}</span></p>
                    </div>
                </div>
                <div className="row_flex">
                    <div className="left">
                        <p>Pressure:  <span>{city.current.pressure_mb}</span>mb</p>
                        <p>Wind: <span>{city.current.wind_kph}</span>kph</p>
                        <p>Precipitation: <span>{city.current.precip_mm}</span>mm</p>
                    </div>
                    <div className="left">
                        <p>Visibility: <span>{city.current.vis_km}</span>km</p>
                        <p>Humidity: <span>{city.current.humidity}</span>%</p>
                        <p>UV index: <span>{city.current.uv}</span></p>
                    </div>
                </div>
            </div>
        )
    }
}
