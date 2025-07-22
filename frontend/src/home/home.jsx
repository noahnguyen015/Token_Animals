import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {Carousel} from './carousel'
import {NavBar} from '../navbar/navbar'
import './home.css'
import { GetWallet } from '../wallet/wallet'
import Title from '../title/title'

function Home() {

  const [Wallet, setWallet] = useState(null);
  
  const options = ["white", "green", "blue", "purple", "black"];

  let isLoggedIn = false;

   const accesstoken = localStorage.getItem("access");
   const refreshtoken = localStorage.getItem("refresh");
   const username = localStorage.getItem("username");

   if(accesstoken && refreshtoken)
   {
      isLoggedIn = true;
   }

    useEffect(() => {
      const callWallet = async () => {
        //grab latest wallet
          const wallet = await GetWallet();
          setWallet(wallet["balance"]);
      }

      callWallet();
    },[]);

  return (
    <>
        <Title/>
        {(Wallet !== null)? <NavBar Wallet={Wallet} setWallet={setWallet}/> : <></>}
        <div className="row">
          <div className="col-3"></div>
          <div className="col-6">
           {(Wallet !==null)? <Carousel options={options} Wallet={Wallet} setWallet={setWallet}/>: <></>}
          </div>
          <div className="col-3"></div>
        </div>
    </>
  )
}

export default Home
