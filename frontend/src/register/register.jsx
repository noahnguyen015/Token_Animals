import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


function Register() {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({username: '', password: ''});
    const [message, setMessage] = useState();

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:8000/api/register/", {
                method : "POST",
                headers: {"Content Type": "application/json"},
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
        <div>
            <form onSubmit={handleSubmit}>
                <input name="username" placeholder="Username" onChange={handleChange} required></input>
                <input name="password" placeholder="Password" onChange={handleChange} required></input>
                <button type="submit">Register</button>
            </form>
            <p>Login <Link to ="/login">Login</Link></p>
            <p>{message}</p>
        </div>
    </>
    )
}

export default Register;