import axios from "axios";
import Joi from "joi";
import React, { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
export default function Login({getUserData}) {
  const [lodind, setLodind] = useState(false);
  let navigate = useNavigate();
  const [errorList, setErrorList] = useState([]);
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: 0,
  });
  function getuserData(e) {
    setErrorList( [] )
    let myuser = { ...user };
    myuser[`${e.target.name}`] = e.target.value;
    setUser(myuser);
  }
  async function submitForm(e) {
    setLodind(true);
    e.preventDefault();
    let ValidationResult = validData();
    if (ValidationResult.error != null) {
      setLodind(false);
      setErrorList(ValidationResult.error.details);
    } else {
      let { data } = await axios.post(
        `https://route-egypt-api.herokuapp.com/signin`,
        user
      );
      if (data.message === "success") {
        setLodind(false);
        navigate("/home");
        localStorage.setItem('userToken' , data.token);
        getUserData()
      } else {
        setLodind(false);
        setError(data.message);
      }
    }
  }
  useEffect(() => {
   if (localStorage.getItem('userToken')) {
      navigate('/home')
    }
  }, [])
  
  function validData() {
    let schema = Joi.object({
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "eg", "org"] },
      }),
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,10}$")),
    });
    return schema.validate(user, { abortEarly: false });
  }
  return (
    <>
      <div className="container my-4">
        <form onSubmit={submitForm}>
          {error ? (
            <div className="alert alert-danger">
              {error}
            </div>
          ) : (
            ""
          )}
          {errorList.map((error, idx) => {
            if (error.path[0] === "password") {
              return (
                <p key={idx} className="text-danger">
                  password must be 4 uppercase character or lowercase or 4
                  numbers
                </p>
              );
            } else {
              return (
                <p key={idx} className="text-danger">
                  {error.message}
                </p>
              );
            }
          })}
          <h2>Registartion Form</h2>
          <div className="group my-2 ">
            <label htmlFor="email" className="mb-1">
              email :
            </label>
            <input
              onChange={getuserData}
              type="email"
              name="email"
              id="email"
              className="bg-transparent text-white form-control"
            />
          </div>
          <div className="group my-2 ">
            <label htmlFor="password" className="mb-1">
              password :
            </label>
            <input
              onChange={getuserData}
              type="password"
              name="password"
              id="password"
              className="bg-transparent text-white form-control"
            />
          </div>
          <div className="group mt-3  d-flex justify-content-end">
            <button type="submit" className="btn btn-info">
              {lodind ? (
                <i className="fa-solid fa-spinner fa-spin "></i>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
