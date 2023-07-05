import React, {useEffect, useState} from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Login from './components/login';
import Header from './components/header';
import Register from './components/register';
import MainPage from './components/main';
import ErrorPage from './components/errors';
import Page from './components/page';
import Activated from './components/activated'
import Activation from './components/activation'
import './App.css';
import { useAppDispatch } from './hooks/redux';
import { checkAuth } from './services/auth';

const App = (): JSX.Element => {
  const [name, setName] = useState("")
  const [message, setMessages] = useState("messages:")  

  const dispatch = useAppDispatch()

  useEffect(()=> {
    
    if (localStorage.getItem('accessToken')) {
      (
        async () => {
          await dispatch(checkAuth())          
        }
      )()
    }
  }, [])

  return ( 
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={"/login"} element={<Login  />} />
        <Route path={"/register"} element={<Register />} />
        <Route path={"/page"} element={<Page />} />
        <Route path={"/activated"} element={<Activated />} />
        <Route path={"/activation"} element={<Activation />} />
        <Route path={"/"} element={<MainPage />} />
        <Route path={"/error"} element={<ErrorPage />} />
      </Routes>
   </BrowserRouter>
  );
}

export default App;
