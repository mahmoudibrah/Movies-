import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Popular() {
  const [popular, setPopular] = useState([]);
  async function getPopular() {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=dda1f2a5601a9d7073885852e6804574&language=en-US&page=1`
    );
    setPopular(data.results);
    console.log(data.results);
  }
  useEffect(() => {
    getPopular();
    return () => {
      getPopular();
    };
  }, []);

  return (
    <>
      {popular ? (
        <>
          {" "}
          <div className="container py-3">
            <div className="row">
              {popular.map((pop, idx) => (
                <div key={idx} className="col-md-2">
                  <div className="item position-relative">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${pop.poster_path}`}
                      className="w-100"
                      alt="movie"
                    />
                    <h6 className="text-light p-2">{pop.title}</h6>
                    <div className="layer position-absolute top-0 end-0 p-2 bg-info">
                      {pop.vote_average.toFixed(1)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          {" "}
          <div className="vh-100 d-flex justify-content-center align-items-center ">
            <i className="fa-solid fa-spinner fa-5x fa-spin text-white "></i>
          </div>
        </>
      )}
    </>
  );
}
