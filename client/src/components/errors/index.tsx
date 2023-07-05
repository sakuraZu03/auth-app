import { stat } from "fs";
import React from "react";
import { useAppSelector } from "../../hooks/redux";
import "./index.css"

const ErrorPage = () => {
    const {error} = useAppSelector(state => state.reducer)
       
    return (
        <div className="mainPage">
            <h1>{JSON.stringify(error)}</h1>
        </div>
    )
};

export default ErrorPage;

