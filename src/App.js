import React, { useState } from "react";
import axios from "axios";
import CreateArea from "./components/createArea";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [unit, setUnit] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [weatherData, setWeatherData] = useState([]);


  function searchDataCelsius() {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=39dbe63ca34880b70244fb075b6b1b7f`)
      .then((response) => {
        setData(response.data);
        setErrorMessage("");
      })
      .catch((error) => {
        setErrorMessage("Invalid location. Please try again.");
        console.log(error);
      });

    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=32ba0bfed592484379e51106cef3f204`
    )
      .then((response) => response.json())
      .then((data) => {
        const forecastData = data.list.slice(0, 5);
        setWeatherData(forecastData);
      })
      .catch((error) => {
        setErrorMessage("Invalid location. Please try again.");
        console.log(error);
      });

    setUnit("");
  }

  function searchDataFah() {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=39dbe63ca34880b70244fb075b6b1b7f`)
      .then((response) => {
        setData(response.data);
        setErrorMessage("");
      })
      .catch((error) => {
        setErrorMessage("Invalid location. Please try again.");
        console.log(error);
      });

    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=imperial&appid=32ba0bfed592484379e51106cef3f204`
    )
      .then((response) => response.json())
      .then((data) => {
        const forecastData = data.list.slice(0, 5);
        setWeatherData(forecastData);
      })
      .catch((error) => {
        setErrorMessage("Invalid location. Please try again.");
        console.log(error);
      });

    setUnit("");
  }
  

  function setUnits() {
    
    searchDataCelsius()
  }

  function setUnitss() {
    
    searchDataFah()
  }

  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    setNotes((prevNotes) => {
      return [...prevNotes, newNote];
    });
  }

  function handleAddSearch(noteContent) {
    setLocation(noteContent);
  }
  const getCurrentDate = (index) => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + index);
    const options = { weekday: "short" }; 
    return currentDate.toLocaleDateString(undefined, options); 
  };




  return (
    <div>
      <div className="app">
        <h2 className="ccw">Check Current Weather</h2>
        <div className="search">
          <input
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="Search Location"
            type="text"
            className="locationInput"
          />

          <div className="degrees">
            <button onClick={setUnits} className="cel">
              Celsius
            </button>
            <button onClick={setUnitss} className="fah">
              Fahrenheit
            </button>
          </div>
        </div>
        <div className="container">
          {errorMessage && <p className="error">{errorMessage}</p>}
          {data.name !== undefined ? (
            <div className="top">
              <div className="topleft">
                <div className="temperature">
                  {data.main ? (
                    <h1 className="theTemp">{data.main.temp.toFixed()}°</h1>
                  ) : null}
                </div>
                <div className="location">
                  <p className="locationName">{data.name}</p>
                </div>
              </div>

              <div className="topright">
                <div id="iconsContainerr">
                  {weatherData.length > 0 && (
                    <div className="imagee">
                      <img
                        src={`http://openweathermap.org/img/wn/${weatherData[0].weather[0].icon}.png`}
                        className="imgClassName"
                        id="currentWeatherIcon"
                        style={{ display: "block" }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="fave">
              <div className="fave-top">
                <h3 className="fave-h">Add Favorite Location(s)</h3>
                <CreateArea onAdd={addNote} onAddSearch={handleAddSearch} />
              </div>
            </div>
          )}
          {data.name !== undefined && (
            <div className="bottom">
              <div id="weatherContainer">
                <div id="iconsContainerr">
                  {weatherData.map((item, index) => (
                    <div className="icons" key={index}>
                      <div className="image">
                        <p className="maxValues">{`${(
                          item.main.temp_min
                        ).toFixed(1)}°`}</p>
                        <img
                          src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                          className="imgclassNamee"
                          id={`img${index + 1}`}
                          style={{ display: "block" }}
                        />
                      </div>
                      <p className="weather">{getCurrentDate(index)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}

export default App;
