import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {Carousel} from './carousel'
import {NavBar} from '../navbar/navbar'
import './home.css'

function Home() {

   // const whites = [common_bear];
   // const blues = [tie_bear, glasses_bear];
   // const greens = [detective_bear, delinquent_bear];
   // const purples = [princess_bear, sleepy_bear];
   // const blacks = [boba_bear];

  const options = ["white", "green", "blue", "purple", "black"];

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
        <Carousel options={options}/>
    </>
  )
}

export default Home
