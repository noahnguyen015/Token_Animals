import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {Carousel} from './carousel'
import {NavBar} from '../navbar/navbar'
import './home.css'

function Home() {

  const [count, setCount] = useState(0);

  const options = ["blue", "blue", "purple", "pink", "red"];

  const [isChanging, setChange] = useState([]);

  let isLoggedIn = false;

   const accesstoken = localStorage.getItem("access");
   const refreshtoken = localStorage.getItem("refresh");
   const username = localStorage.getItem("username");

   if(accesstoken && refreshtoken){
    console.log("You are logged in!")
    isLoggedIn = true;
   }

  return (
    <>
        <h3>GAMBLING WEBSITE WITHOUT A NAME</h3>
        <NavBar/>
        <div>
          {isLoggedIn? `Welcome ${username}!` : "Please Login"}
        </div>
        <p>Hello</p>
        <Carousel options={options}/>
    </>
  )
}

export default Home
