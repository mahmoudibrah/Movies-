import axios from "axios";
import Joi from "joi";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
export default function Register() {
  const [lodind, setLodind] = useState(false);
  let navigate = useNavigate();
  const [errorList, setErrorList] = useState([]);
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    age: 0,
    email: "",
    password: 0,
  });
  function getuserData(e) {
    setErrorList([]);
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
      console.log(ValidationResult.error.details);
    } else {
      let { data } = await axios.post(
        `https://route-egypt-api.herokuapp.com/signup`,
        user
      );
      if (data.message === "success") {
        setLodind(false);
        navigate("/login");
      } else {
        setLodind(false);
        setError(data.message);
      }
    }
  }
  function validData() {
    let schema = Joi.object({
      first_name: Joi.string().alphanum().min(3).max(10).required(),
      last_name: Joi.string().alphanum().min(3).max(10).required(),
      age: Joi.number().min(16).max(60).required(),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "eg", "org"] },
      }),
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,10}$")),
    });
    return schema.validate(user, { abortEarly: false });
  }
  function getCurrentError(key) {
    for (const err of errorList) {
      if (err.context.key === key) {
        return err.message;
      }
    }
    return "";
  }
  return (
    <>
      <div className="container my-4">
        <form onSubmit={submitForm}>
          {error ? (
            <div className="alert alert-danger">
              {error} <Link to="/login">Login</Link>{" "}
            </div>
          ) : (
            ""
          )}
          {/* {errorList.map((error, idx) => {
            if (error.path[0] === "password") {
              return (
                <p key={idx} className="text-danger">
                  {" "}
                  password must be 4 uppercase character or lowercase or 4
                  numbers{" "}
                </p>
              );
            } else {
              return (
                <p key={idx} className="text-danger">
                  {" "}
                  {error.message}{" "}
                </p>
              );
            }
          })} */}
          <h2>Registartion Form</h2>
          <div className="group mt-3">
            <label htmlFor="first_name" className="mb-1">
              First Name :
            </label>
            <input
              onChange={getuserData}
              type="text"
              name="first_name"
              id="first_name"
              className="bg-transparent text-white form-control"
            />
            {getCurrentError("first_name").length ? (
              <div className="alert alert-danger">
                {getCurrentError("first_name")}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="group my-2 ">
            <label htmlFor="last_name" className="mb-1">
              last Name :
            </label>
            <input
              onChange={getuserData}
              type="text"
              name="last_name"
              id="last_name"
              className="bg-transparent text-white form-control"
            />
            {getCurrentError("last_name").length ? (
              <div className="alert alert-danger">
                {getCurrentError("last_name")}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="group my-2 ">
            <label htmlFor="age" className="mb-1">
              {" "}
              Age :
            </label>
            <input
              onChange={getuserData}
              type="number"
              name="age"
              id="age"
              className="bg-transparent text-white form-control"
            />
            {getCurrentError("age").length ? (
              <div className="alert alert-danger">
                {getCurrentError("age")}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="group my-2 ">
            <label htmlFor="email" className="mb-1">
              {" "}
              email :
            </label>
            <input
              onChange={getuserData}
              type="email"
              name="email"
              id="email"
              className="bg-transparent text-white form-control"
            />
            {getCurrentError("email").length ? (
              <div className="alert alert-danger">
                {getCurrentError("email")}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="group my-2 ">
            <label htmlFor="password" className="mb-1">
              {" "}
              password :
            </label>
            <input
              onChange={getuserData}
              type="password"
              name="password"
              id="password"
              className="bg-transparent text-white form-control"
            />
            {getCurrentError("password").length ? (
              <div className="alert alert-danger">
                password must be 4 uppercase character or lowercase or 4
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="group mt-3  d-flex justify-content-end">
            <button type="submit" className="btn btn-info">
              {lodind ? (
                <i className="fa-solid fa-spinner fa-spin "></i>
              ) : (
                "Register"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
