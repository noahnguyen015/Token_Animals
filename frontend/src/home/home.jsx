import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {Carousel} from './carousel'
import {NavBar} from '../navbar/navbar'
import './home.css'
import Title from '../title/title'

function Home() {
  
  const options = ["white", "green", "blue", "purple", "black"];

  let isLoggedIn = false;

   const accesstoken = localStorage.getItem("access");
   const refreshtoken = localStorage.getItem("refresh");
   const username = localStorage.getItem("username");

   if(accesstoken && refreshtoken){
    isLoggedIn = true;
   }

  return (
    <>
        <Title/>
        <NavBar/>
        <div className="row">
          <div className="col-3"></div>
          <div className="col-6">
            <Carousel options={options}/>
          </div>
          <div className="col-3"></div>
        </div>
    </>
  )
}

export default Home
