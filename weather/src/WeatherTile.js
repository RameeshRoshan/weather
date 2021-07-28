import React, { Component } from 'react'

export default class WeatherTile extends Component {
    
    render() {
        let {city,idx,deletecity}=this.props;
        return (
            <div className="tilediv" key={idx}>
                <button id="close" onClick={()=>deletecity(idx)} >X</button>
                <div>
                    <h2 className="name">{city.location.name}</h2>
                    <p className="smallfont">{city.location.region}</p>
                    <p className="smallfont">{city.location.tz_id}</p>
                </div>
                <div className="row_flex">
                    <div>
                        <img id="icon" src={city.current.condition.icon} alt="icon"/>
                    </div>
                    <div>
                        <h1 id="temp">{city.current.temp_c}<span className="small">&#x2103;</span></h1>
                    </div>
                </div>
                <div className="row_flex">
                    <div>
                        <p id="condition">{city.current.condition.text}</p>
                    </div>
                    <div>
                        <p>Feels Like: <span>{city.current.feelslike_c}</span></p>
                    </div>
                </div>
                <div className="row_flex">
                    <div className="left">
                        <div className="row">
                            <div className="smallfont">Pressure: </div> <div>{city.current.pressure_mb} mb</div>
                        </div>
                        <div className="row">
                            <div className="smallfont">Wind: </div> <div>{city.current.wind_kph}kph</div>
                        </div>
                        <div className="row">
                            <div className="smallfont">Precipitation: </div><div>{city.current.precip_mm}mm</div>
                        </div>
                    </div>
                    <div className="right">
                        <div className="row">
                            <div className="smallfont">Visibility: </div><div>{city.current.vis_km}km</div>
                        </div>
                        <div className="row">
                            <div className="smallfont">Humidity: </div><div> {city.current.humidity}%</div>
                        </div>
                        <div className="row">
                            <div className="smallfont">UV index: </div><div>{city.current.uv}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
