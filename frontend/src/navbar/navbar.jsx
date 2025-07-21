import { Link, useNavigate } from 'react-router-dom'    
import './navbar.css'
        
export function NavBar() {

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
        <nav className="d-flex flex-row align-items-center justify-content-end">
            <div className="d-flex me-5">
                <Link to="/"><button className="p-3 px-4 nav-button">Home</button></Link>
                <button className="p-3 px-4 nav-button">About</button>
                {isLoggedIn? <Link to="/inventory"><button className="p-3 px-4 nav-button">Inventory</button></Link> : <></>}
                {isLoggedIn? <button className="p-3 px-4 nav-button" onClick={Logout}>Logout</button> : <Link to="/login"><button className="p-3 px-4 nav-button">Login</button></Link>}
            </div>
        </nav>
    </div>
    </>
    )
}