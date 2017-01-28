import React, { Component } from 'react';
import { connect } from 'react-redux';
import GoogleMap from '../components/google_map';
import Chart from '../components/chart';


class WeatherList extends Component {
  renderWeather(cityData) {
    const lat =cityData.city.coord.lat;
    const lon =cityData.city.coord.lon;
    const temps = cityData.list.map(weather => weather.main.temp);
    const pressures = cityData.list.map(weather => weather.main.pressure);
    const humidities = cityData.list.map(weather => weather.main.humidity);
    console.log(`temp = ${temps.length}, pres = ${pressures.length}, hum = ${humidities.length}`)
    return (
      <tr key={cityData.city.name}>
        <td><GoogleMap lat={lat} lon={lon} /></td>
        <td><Chart data={temps} color='orange' units='K' /></td>
        <td><Chart data={pressures} color='green' units='hPa' /></td>
        <td><Chart data={humidities} color='red' units='%' /></td>
      </tr>
    )
  }

  render() {
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>City</th>
            <th>Temperature (K)</th>
            <th>Pressure (hPa)</th>
            <th>Humidity (%)</th>
          </tr>
        </thead>
        <tbody>
          {this.props.weather.map(this.renderWeather)}
        </tbody>
      </table>
    );
  }
}


function mapStateToProps({ weather }) {
  return { weather };
}

export default connect(mapStateToProps)(WeatherList);