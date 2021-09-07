import React, { useState, useEffect } from "react";
import instance from "./axios";
import request from "./request";
import "./Banner.css";

const Banner = () => {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request1 = await instance.get(request.fetchNetflixOriginals);
      setMovie(
        request1.data.results[
          Math.floor(Math.random() * request1.data.results.length - 1) // [ aama multi plse hse khali random joie ek to] // measn aray ni length hse enmano koi pn random num hse e img show thse
        ]
      );
      return request1;
    }
    fetchData();
  }, []);

  console.log(movie);

  function truncate(str,n){
    return str?.length > n ? str.substr(0,n-1) + "...":str;  // easyj 6 150 krta vdhi jse to 150j rese niche call karyo 6 descriptin ma
  }


  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("http://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        {/* title */}
        <h1 className="banner__title" >{movie?.title || movie?.name || movie?.original_name}</h1>

        {/* div > 2 buttons */}
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>

        {/* description */}
        <h1 className="banner__description">
        {truncate(movie?.overview,150)}
        </h1>
      </div>

      <div className="banner--fadeBottom" />
    </header>
  );
};

export default Banner;

// understanding mate var ma store kraine b use kari skaay
// const randm = Math.floor(Math.random() * request.data.results.length - 1);
// console.log(request.data.results[randm]); // [ aama multi plse hse khali random joie ek to] // measn aray ni length hse enmano koi pn random num hse e img show thse

/* <h1>{movie?.title || movie?.name || movie?.original_name}</h1> */ // this line means 1 na hoy to second ena hoy to third
