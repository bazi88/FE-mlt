import React from 'react';

import {Navigate, Outlet} from 'react-router-dom'

const useAuth=()=>{
  const user=localStorage.getItem('token')

  if(user){
    return true
  } else {
    return false
  }
}

const  PublicRoutes=(props:any) =>{

  const auth=useAuth()
	
	console.log(auth);

  return auth ? <Navigate to="/translate"/>: <Outlet/>
}

export default PublicRoutes;