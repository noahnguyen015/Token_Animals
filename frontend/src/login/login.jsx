import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Title from '../title/title'

function Login () {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({username: '', password: ''});
    const [message, setMessage] = useState('');

    const handleChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = async e => {
        e.preventDefault();

        try{
            const res = await fetch('http://localhost:8000/api/login/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if(res.ok){
                //local storage: feature of Web Storage API to store key value pairs in the browser 
                //stores only strings
                localStorage.setItem('access', data["access-token"]);
                localStorage.setItem('refresh', data["refresh-token"]);
                localStorage.setItem('username', data["username"]);
                setMessage('Logged in as ' + data["username"]);
                navigate("/")
            }else{
                setMessage('Login failed: ' + JSON.stringify(data));
            }
        } catch(error){
            setMessage('Error Occurred: '  + error.message);
        }
    }

    return (
    <>
        <div className="row h-100">
            <div className="col-4 backdrop"></div>
            <div className="col-4 form-container h-100 d-flex flex-column  justify-content-center align-items-center">
                <Title/>
                <div className="d-flex flex-column justify-content-center align-items-center form-box w-100">
                    <h2 className="my-5">LOGIN</h2>
                    <form onSubmit={handleSubmit}>
                        <input className="mb-4 formfield" name="username" placeholder="Username" onChange={handleChange} required></input><br/>
                        <input className="mb-4 formfield" name="password" placeholder="Password" onChange={handleChange} required></input><br/>
                        <button className="submit-button"type="submit">LOGIN</button>
                    </form>
                    <p><Link to="/register">Register a New Account</Link></p>
                    <p>{message}</p>
                </div>
            </div>
            <div className="col-4 backdrop"></div>
        </div>
    </>
    )
}

export default Login

/*
        <Title/>
        <h2>LOGIN PAGE</h2>
        <form onSubmit={handleSubmit}>
            <input name="username" placeholder="Username" onChange={handleChange} required/><br/>
            <input name="password" placeholder="Password" onChange={handleChange} required/><br/>
            <button type="submit">LOGIN</button>
        </form>
        <p><Link to="/register">Register a New Account</Link></p>
        <p>{message}</p>
*/