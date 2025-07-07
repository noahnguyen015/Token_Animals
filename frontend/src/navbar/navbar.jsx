import { Link, useNavigate } from 'react-router-dom'    
        
export function NavBar() {

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
            <button>Profile</button>
            <button onClick={Logout}>Logout</button>
            </div>
        </nav>
    </div>
    </>
    )
}