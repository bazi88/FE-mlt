import React from "react"
import {Routes, Route, Navigate} from "react-router-dom"
import PublicRoutes from "./components/PublicRoutes";
import PermissionDenied from "./components/PermissionDenied";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Home from "./pages/home/Home";
import InnerContent from "./components/InnerContent";
import Auth from "./pages/authentication/Auth";
import TranslateText from "./pages/translate/TranslateText";
import Login from "./pages/authentication/Login";

const MainRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<ProtectedRoutes />}>
                <Route path="/" element={<InnerContent />}>
                    <Route path="/" element={<Navigate replace to="translate" />} />
                    <Route path="home" element={<Home />} />
                </Route>
            </Route>
            {/** Public Routes */}
            {/** Wrap all Route under PublicRoutes element */}
            <Route path="login" element={<PublicRoutes />}>
                <Route path="/login" element={<Login />} />
            </Route>
            <Route path="/translate" element={<TranslateText />} />

            {/** Permission denied route */}
            <Route path="/denied" element={<PermissionDenied />} />
        </Routes>
    )
}

export default MainRoutes