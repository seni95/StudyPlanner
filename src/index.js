import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import PlannerRepository from './service/planner_repository';
import { createBrowserRouter, RouterProvider,Route } from 'react-router-dom';
import Login from './components/Login/login';
import AuthService from './service/auth_service';


const authService = new AuthService();
var userInfo = "";

const getUserInfo=(user)=>{
userInfo =user;
}


const router = createBrowserRouter([
  {
    path:"/",
    element:<Login authService={authService}></Login>,
  },
  {
    path:"/studyPlanner",
    element: <App/>
  }

]);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
