import {useNavigate} from 'react-router-dom';
import React from "react";
import "./index.css"

import { useAppDispatch, useAppSelector  } from '../../hooks/redux';
import { logoutUser } from '../../services/auth'

const PagesHeader = (): JSX.Element => {
    const navigate = useNavigate();

    const dispatch = useAppDispatch()
    const {user} = useAppSelector(state => state.reducer)
   
    return (
        <div className="pagesHeader">
                <h2>Testing Backend</h2>    
           <div className="right">
                {user.email !== "" ? <a href='/'>User:{user.email}</a> : null } 

                <a href="/" onClick={()=>{navigate('/')}}>Main Page</a>
                

                {user.email !== "" ? <a href="/" onClick={()=>{dispatch(logoutUser())}}>Logout</a>: null } 

                <a href='/login'>Login</a>
           </div>
        </div>
    )
};

export default PagesHeader;