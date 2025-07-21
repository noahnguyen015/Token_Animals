import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Title from '../title/title'
import './register.css'


function Register() {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({username: '', password: ''});
    const [message, setMessage] = useState();
    const [ShowPassword, setShowPassword] = useState(false);

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            const res = await fetch('http://localhost:8000/api/register/', {
                method : 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if(res.ok) {
                setMessage(data.message);
                navigate("/login");
            }
            else{
                setMessage("Error in Registration" + JSON.stringify(data));
            }
        }catch(error){
            setMessage("Error " + error.message);
        }
    };

    return(
    <>
        <div className="row h-100">
            <div className="col-4 backdrop"></div>
            <div className="col-4 form-container h-100 d-flex flex-column  justify-content-center align-items-center">
                <Title/>
                <div className="d-flex flex-column justify-content-center align-items-center form-box w-100">
                    <h2 className="my-5">REGISTRATION</h2>
                    <form onSubmit={handleSubmit}>
                        <input className="mb-4 formfield" name="username" placeholder="Username" onChange={handleChange} required></input><br/>
                        <input type={ShowPassword? "text": "password"} className="mb-4 formfield" name="password" placeholder="Password" onChange={handleChange} required></input><br/>
                        <label className="d-flex align-items-center justify-content-center">Show Password: 
                            <input type="checkbox" className="checkbox ms-3" checked={ShowPassword} onChange={() => setShowPassword(!ShowPassword)}/>
                        </label>
                        <button className="submit-button"type="submit">Register</button>
                    </form>
                    <p><Link to ="/login">Login Page</Link></p>
                    <p>{message}</p>
                </div>
            </div>
            <div className="col-4 backdrop"></div>
        </div>
    </>
    )
}

export default Register;