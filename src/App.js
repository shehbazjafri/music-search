import React, { useState } from "react";
import "./App.css";

function App() {
  const url = "https://itunes.apple.com/search?term=";
  const [results, setResults] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  async function fetchData(searchTerm) {
    try {
      const response = await fetch(url + searchTerm, {
        crossDomain: true,
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
      const data = await response.json();
      setResults(data.results);
    } catch (err) {
      console.log(err);
    }
  }

  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  const searchArtist = event => {
    event.preventDefault();
    fetchData(searchTerm);
  };

  return (
    <div className="App">
      <div className="search-box">
        <form onSubmit={searchArtist}>
          <input
            type="text"
            placeholder="Search artists"
            onChange={handleChange}
          />
          <input className="search-button" type="submit" value="Search" />
        </form>
      </div>
      {results && (
        <div className="results">
          {results.map((track, i) => {
            return (
              <div className="track" id={i} key={i}>
                <img src={track.artworkUrl60} alt="track artwork" />
                <h4>{track.trackName}</h4>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
