import React, {Dispatch, SetStateAction, useState} from "react";
import {useNavigate} from "react-router-dom";
import "./index.css"

import {loginUser} from '../../services/auth';
import { useAppDispatch, useAppSelector } from "../../hooks/redux";

const Login = () => {
    const navigate = useNavigate();

    const {user} = useAppSelector(state => state.reducer)
    const dispatch = useAppDispatch()
    

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [verEmail, setVerEmail] = useState<string>("")
    const [newPassword, setNewPassword] = useState<string>("");


    const handleLogin = async () => {
        const response = await dispatch(loginUser(email, password))
        if (response === null) {
            navigate('/error')
        }
    }

    

    const ResetPassword = async () => {
        await fetch("http://localhost:8080/api/reset-password", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                "email":verEmail,
                "password": newPassword,
            })
        }).then((r) => r.json()).then((data)=> {
            console.log(data);
            if (data.message === "success") {
                window.location.reload()
            }
        }).catch((e) => console.log(e));
    }

    const OpenPopup = () => {
        let x = document.getElementById("loginVerPopup") 
        if (x !== null) {
            x.style.display = 'flex'
        }
    }

    return (
        <div className="loginPageContainer">
            <div className="form">
                <h1>Sign Up page</h1>
                <input className="loginPageContainer-input1" type={"email"} id={"inputEmail"} placeholder={"Email"} onChange={e => setEmail(e.target.value)} />
                <input className="loginPageContainer-input2" type={"password"} id={"inputPassword"} placeholder={"Password"} onChange={e => setPassword(e.target.value)} />
                <a href={"#"} onClick={() => {OpenPopup()}} style={{fontSize: "16px", color:"blue",}}><i>Forgot Paswrod?</i></a>
                <button onClick={()=> handleLogin()}>Login</button>
            </div>
            <div className={"popup"} id={"loginVerPopup"}>            
                <div className="resetPassword" id="resetPassword">
                    <h1>Enter New Password</h1>
                    <input type="text" placeholder="New Password" onChange={(e) => {setNewPassword(e.target.value)}}/>
                    <button onClick={() => {ResetPassword()}}>Submit new password</button>
                </div>
            </div>
        </div>
    )
};

export default Login;