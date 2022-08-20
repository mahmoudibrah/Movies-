import "./App.css";
import Home from "./Commponent/Home/Home";
import Register from "./Commponent/Register/Register.jsx";
import Navbar from "./Commponent/Navbar/Navbar";
import { Routes, Route, Navigate  , useNavigate } from "react-router-dom";
import Login from "./Commponent/Login/Login";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import MovieDetails from './Commponent/MovieDetails/MovieDetails';
import Tvdetails from './Commponent/Tvdetails/Tvdetails';
import Popular from './Commponent/Popular/Popular';
import Toprated from "./Commponent/Toprated/Toprated";
function App() {

  const [usedata, setUsedata] = useState(null);
  let navigate = useNavigate();
  function getUserData() {
    let token = localStorage.getItem("userToken");
    let decoded = jwt_decode(token);
    setUsedata(decoded);
  }
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      getUserData();
    }
  }, []);
  function ProtectedRoute({children}) {
    if (localStorage.getItem("userToken")) {
      return children
    } else {
      return <Navigate to="/login"/>
    }
  }
  function logOut() {
    console.log('asdsa');
    navigate('/login')
    localStorage.removeItem("userToken");
    setUsedata(null)
  }
  return (
    <>
      <Navbar usedata={usedata} logOut={logOut} />
      <Routes>
        <Route path="/" element={ <ProtectedRoute>  <Home /> </ProtectedRoute> } />
        <Route path="home" element={<ProtectedRoute>  <Home /> </ProtectedRoute>} />
        <Route path="toprated" element={  <ProtectedRoute> <Toprated /></ProtectedRoute> } />
        <Route path="moviedetails" element={  <ProtectedRoute> <MovieDetails /></ProtectedRoute>}  >
          <Route path=":id" element={  <ProtectedRoute> <MovieDetails /></ProtectedRoute>} />
        </Route>
        <Route path="popular" element={ <ProtectedRoute> <Popular /> </ProtectedRoute>} />
        <Route path="tvdetails" element={ <ProtectedRoute> <Tvdetails /> </ProtectedRoute>}>
          <Route  path=":id" element={ <ProtectedRoute> <Tvdetails /> </ProtectedRoute>}   />
        </Route>
        <Route path="register" element={<Register />} />
        <Route path="login" element={  <Login getUserData={getUserData} />} />
        <Route
          path="*"
          element={
            <div className="d-flex justify-content-center align-items-center vh-100">
              <h3>Page Not Found 404</h3>
            </div>
          }
        />
      </Routes>
    </>
  );
}

export default App;
