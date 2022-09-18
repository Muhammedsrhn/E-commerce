import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    

    const collectData = async () => {
        localStorage.setItem("user", JSON.stringify({ name, email, password }));
        navigate("/login")
        console.warn(name, email, password);
        let result = await fetch("http://localhost:5000/registers", {
            method: "post",
            body: JSON.stringify({ name, email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = result.json();
        console.warn(result);
        

    }
    return (
        <div className="register">
            <h1>Register</h1>
                <input type={"text"} className={"inputBox"} placeholder={"Enter Name"} value={name} onChange={(e) => setName(e.target.value)} />
                <input type={"email"} className={"inputBox"} placeholder={"Enter Email"} value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type={"password"} className={"inputBox"} placeholder={"Enter Password"} value={password} onChange={(e) => setPassword(e.target.value)} />
                <button onClick={collectData} type={"button"} className={"inputBtn"}>Sign Up</button>
        </div>
    )
}

export default SignUp;
