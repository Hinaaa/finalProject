
import './App.css'
import {useEffect, useState} from "react";
import axios from "axios";
import LandingPage from "./LandingPage.tsx";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.tsx";

function Dashboard() {
    return null;
}

function App() {
    const [user,setUser] = useState<string | undefined | null> (undefined)
    const [username,setusername] = useState<string>("")
    //login
    function login() {
        const host :string =
            window.location.host === "localhost:5173" ? //if 5173
                "http://localhost:8080" //then 8080
                :
                window.location.origin //otherwise render.com
        window.open(host + "/oauth2/authorization/github", "_self") //new tab or address in same tab. self means same tab here
    }
    //logout
    function logout() {
        const host :string =
            window.location.host === "localhost:5173" ? //if 5173
                "http://localhost:8080" //then 8080
                :
                window.location.origin //otherwise render.com
        window.open(host + "/logout", "_self")
    }

    const loadUser = () => {
        axios.get("/api/auth")
            .then(r=>setusername(r.data))
            .catch(error => setUser(null)) //error when not logged in successfsully
    }
    useEffect(() => {
        loadUser();
    }, []);

  // const [message, setMessage] = useState("")
  //   useEffect(() => {
  //       fetch("http://localhost:8080/api/hello")
  //           .then((res) => res.text())
  //           .then(data=>setMessage(data))
  //           .catch(error => console.error('Error fetching hello:', error));
  //   }, []);
//   <h1>{message}</h1>
//
  return (
    <>
        <button onClick={login}>Login</button>
        <button onClick={logout}>logout</button>
        <h1>{username}</h1>
        <Routes>
            <Route path={"/"} element ={<LandingPage/>}/>
            <Route element={<ProtectedRoute user={user} />}>
                <Route path="/dashboard" element={<Dashboard />} />
            </Route>
        </Routes>
    </>
  )
}

export default App
