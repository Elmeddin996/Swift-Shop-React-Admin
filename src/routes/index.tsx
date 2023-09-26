import React from 'react'
import {Routes, Route} from "react-router-dom";
import { ROUTES } from './consts';
import { ProtectedRouterLogin } from '../ProtectedRouters/ProtectedLogin';
// import Login from '../app/Login';
import { Application } from '../app/components/test';


export const AdminRoutes:React.FC = () => {
  return (
    <Routes>
        <Route 
        path={ROUTES.LOGIN}
        element={
          <ProtectedRouterLogin>
            <Application/>
          </ProtectedRouterLogin>
        }
        />
      {/* <Route path='/test'
      element={<Application/>}/>*/}
    </Routes> 
  )
}
