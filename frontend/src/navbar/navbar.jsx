import { Link, useNavigate } from 'react-router-dom'    
        
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
    <div  className="d-flex flex-row align-items-center justify-content-center">
        <nav className="d-flex flex-row align-items-center justify-content-end navtesting border">
            <div className="d-flex me-5">
            <button className="p-3 px-4">About</button>
            <button className="p-3 px-4">Inventory</button>
            {isLoggedIn? <button className="p-3 px-4">Profile</button>: <></>}
            {isLoggedIn? <button className="p-3 px-4" onClick={Logout}>Logout</button>: <Link to="/login"><button className="p-3 px-4">Login</button></Link>}
            </div>
        </nav>
    </div>
    </>
    )
}