import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./index.css"

const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("");


    const handleValue = async () => {
        await fetch("http://localhost:8080/api/user/register", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                "email": email,
                "username": name,
                "password": password,
            })
        }).then(response => response.json()).then((response) => {
            console.log(response)
            if (response.message === "success") {
                navigate("/login")
            } else {
                alert("incorrect code");
            }
        }).catch(() => {
            setError("Something bad is happened - api-server error")
        });
    }

    return (
        <div className="RegistrationPageContainer">
            
            <div className="registrationForm">
                <h2>Sign Up page</h2>
                <input className="RegistrationPageContainer-input1" id={"inputName"} placeholder={"Your Name"} onChange={e => setName(e.target.value)} />
                <input className="RegistrationPageContainer-input2" id={"inputSurname"} placeholder={"Your Surname"} onChange={e => setSurname(e.target.value)} />
                <input className="RegistrationPageContainer-input2" type={"email"} id={"inputEmail"} placeholder={"Email"} onChange={e => setEmail(e.target.value)} />
                <input className="RegistrationPageContainer-input3" type={"password"} id={"inputPassword"} placeholder={"Password"} onChange={e => setPassword(e.target.value)} />
                <button onClick={()=>handleValue()}>Register</button>
            </div>

        </div>
    )
};

export default Register;