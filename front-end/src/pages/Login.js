import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        // if user was login orientation main page
        const auth = localStorage.getItem("token");

        if (auth) {
            navigate("/");
        }
    }, []);

    const handleLogin = async () => {
        let result = await fetch("http://localhost:5000/login", {
            method: "post",
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        console.log(result.user);

        if (result.user) {
            localStorage.setItem("user", JSON.stringify(result.user));
            localStorage.setItem("token", JSON.stringify(result.auth));
            navigate("/")
        } else {
            alert("Geçersiz Kullanıcı Adı Veya Şifre");
        }

    };


    return (
        <div className='login'>
            <h1 >Login</h1>
            <input className={'inputBox'} type={"email"} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email' />
            <input className={'inputBox'} type={"password"} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password' />
            <button type='submit' onClick={handleLogin} className={'inputBtn'}>Login</button>
        </div>
    )
}


export default Login;