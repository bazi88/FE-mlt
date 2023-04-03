/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch } from "./app/hooks";
import { setUser } from "./features/authSlice";
import Auth from "./pages/authentication/Auth";
import Home from "./pages/home/Home";
import NoMatch from "./pages/NoMatch";
import { AuthProvider } from "./hooks/useAuth";
import { HomeLayout } from "./components/HomeLayout";
import { ProfilePage } from "./pages/home/ProfilePage";
import { SettingPage } from "./pages/home/SettingPage";
import MainRoutes  from "./Routes";

import Dashboard from "./pages/Dashboard";

function App() {
  // const dispatch = useAppDispatch();
  // const user = JSON.parse(localStorage.getItem("user") || "{}");
  // console.log("user", user);

  // useEffect(() => {
  //   dispatch(setUser(user));
  // }, []);

  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <MainRoutes/>
      {/*   <AuthProvider>
          <Routes>
            <Route element={<HomeLayout />} />
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Auth />} />
            <Route/>
            <Route path="/dashboard" element={<ProtectedLayout />}>
              <Route path="profile" element={<ProfilePage />} />
              <Route path="settings" element={<SettingPage />} />
            </Route>            
          </Routes>
        </AuthProvider> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
