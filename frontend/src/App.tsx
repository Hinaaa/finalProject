
import './App.css'
import {useEffect, useState} from "react";
import axios from "axios";


function App() {
    const [username,setusername] = useState<string>("")
    function login() {
        const host :string =
            window.location.host === "localhost:5173" ? //if 5173
                "http://localhost:8080" //then 8080
                :
                window.location.origin //otherwise render.com
        window.open(host + "/oauth2/authorization/github", "_self") //new tab or address in same tab. self means same tab here
    }

    useEffect(() => {
        axios.get("/api/auth")
            .then(r=>setusername(r.data))
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
        <h1>{username}</h1>
    </>
  )
}

export default App
