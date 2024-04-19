import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Jobs from './Components/jobDashboard/Jobs.jsx';
import Applayout from './Applayout.jsx';
import AppContext from 'antd/es/app/context.js';
import AppProvider from './Context/AppProvider.jsx';
import SignUp from './Components/authentication/Signup.jsx';
import Login from './Components/authentication/Login.jsx';
import FilePage from './Components/files/FilePage.jsx';

const router = createBrowserRouter([
  {
 
   path:"/",
   element: <App/>
  },
  {
    path: "/jobs",
    element: <Jobs/>
  },
  {
    path:"/register",
    element: <SignUp/>
  },
  {
    path:'login',
    element: <Login/>
  },
  {
    path:'files',
    element: <FilePage/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(

  <AppProvider>
  <RouterProvider router={router} />
  </AppProvider>

)
