import { Routes, Route } from "react-router-dom";
import Landing from "../pages/Landing";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/prof" element={<Profile />} />
            <Route
                path="/profile"
                element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}
