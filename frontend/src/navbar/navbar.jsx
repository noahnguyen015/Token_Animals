import { Link, useNavigate } from 'react-router-dom'    
import './navbar.css'
import { useEffect, useState } from 'react';
import { GetWallet }  from '../wallet/wallet';
import tickets from '../assets/flamingo_ticket.png'

function WalletInfo({wallet}){

    if(wallet === null)
        return (<div className="d-flex justify-content-center align-items-center me-5 ticket-number">????<img className="ticket ms-2" src={tickets}/></div>)
    else
        return (<div className="d-flex justify-content-center align-items-center me-5 ticket-number">{wallet}<img className="ticket ms-2" src={tickets}/></div>)
}
        
export function NavBar({Wallet, setWallet}) {

    let isLoggedIn = false;

    const accesstoken = localStorage.getItem("access");
    const refreshtoken = localStorage.getItem("refresh");

    if(accesstoken && refreshtoken)
        isLoggedIn = true;

    const navigate = useNavigate();

    const Logout = () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("username");

        console.log("Logged Out");
        navigate("/login");
    }

    return (
    <>
    <br/>
    <div className="d-flex flex-row align-items-center justify-content-center">
        <nav className="d-flex flex-row align-items-center justify-content-between">
            <div className="d-flex me-5">
                <Link to="/"><button className="p-3 px-4 nav-button">Home</button></Link>
                <button className="p-3 px-4 nav-button">About</button>
                {isLoggedIn? <Link to="/inventory"><button className="p-3 px-4 nav-button">Inventory</button></Link> : <></>}
            </div>
            <div className="d-flex">
                <WalletInfo wallet={Wallet}/>
                {isLoggedIn? <button className="p-3 px-4 nav-button" onClick={Logout}>Logout</button> : <Link to="/login"><button className="p-3 px-4 nav-button">Login</button></Link>}
            </div>
        </nav>
    </div>
    </>
    )
}