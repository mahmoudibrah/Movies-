import React, { useEffect, useState } from "react";
import axios from "axios";
import myImage from "../../Assets/title-image-1.eb5e2899315f131fed94.webp";
import { Link } from "react-router-dom";
export default function Home(mediaType) {
  const [person, setPerson] = useState([]);
  const [tvList, setTvList] = useState([]);
  const [moviesList, setMoviesList] = useState([]);
  async function getTranding(mediaType, callback) {
    let { data } = await axios(
      `https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=dda1f2a5601a9d7073885852e6804574`
    );
    if (callback === setPerson) {
      callback(data.results.splice(0, 10));
    } else {
      callback(data.results.splice(0, 16));
    }
    console.log(data);
  }
  useEffect(() => {
    getTranding("movie", setMoviesList);
    getTranding("tv", setTvList);
    getTranding("person", setPerson);
  }, []);

  return (
    <>
      {moviesList.length>0 && tvList.length>0 && person.length>0 ? (
        <>
          {" "}
          <div className="home vh-100  d-flex align-items-center">
            <div className="container">
              <div className="content">
                <h1 className="fw-bolder">
                  {" "}
                  OUR LATEST MOVIES <br /> OUR LATEST Tv{" "}
                </h1>
              </div>
            </div>
          </div>
          <div className="api movies py-4">
            <div className="container">
              <div className="row g-3">
                <div className="col-md-4 align-self-center">
                  <div className="box py-3">
                    <h2 className="">
                      Tranding movies <br />
                      to watch right now{" "}
                    </h2>
                    <h5 className="text-muted">most watch movies by week</h5>
                  </div>
                </div>
                {moviesList.map((movie, idx) => (
                  <div key={idx} className="col-md-2">
                    <Link
                      to={`/moviedetails/${movie.id}`}
                      className="text-decoration-none"
                    >
                      <div className="item position-relative">
                        <img
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                          className="w-100"
                          alt="movie"
                        />
                        <h6 className="text-light p-2">{movie.title}</h6>
                        <div className="layer position-absolute top-0 end-0 p-2 bg-info">
                          {movie.vote_average.toFixed(1)}
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="api tv py-4">
            <div className="container">
              <div className="row g-3">
                <div className="col-md-4 align-self-center">
                  <div className="box py-3">
                    <h2 className="">
                      Tranding Tv <br />
                      to watch right now{" "}
                    </h2>
                    <h5 className="text-muted">most watch Tv by week</h5>
                  </div>
                </div>
                {tvList.map((tv, idx) => (
                  <div key={idx} className="col-md-2">
                    <Link
                      to={`/tvdetails/${tv.id}`}
                      className="text-decoration-none"
                    >
                      <div className="item position-relative">
                        <img
                          src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`}
                          className="w-100"
                          alt="tv"
                        />
                        <h6 className="text-light p-2">{tv.name}</h6>
                        <div className="layer position-absolute top-0 end-0 p-2 bg-info">
                          {tv.vote_average.toFixed(1)}
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="api person py-4">
            <div className="container">
              <div className="row g-3">
                <div className="col-md-4 align-self-center">
                  <div className="box py-3">
                    <h2 className="">
                      Tranding person <br />
                      to watch right now{" "}
                    </h2>
                    <h5 className="text-muted">most watch person by week</h5>
                  </div>
                </div>
                {person.map((person, idx) => (
                  <div key={idx} className="col-md-2">
                    <div className="item position-relative">
                      {person.profile_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
                          className="w-100"
                          alt="person"
                        />
                      ) : (
                        <img
                          src={myImage}
                          className="w-100 image_null"
                          alt="person"
                        />
                      )}
                      <h6 className="p-2">{person.name}</h6>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>{" "}
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
