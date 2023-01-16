import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    console.log(token, "##")
    if (!token) return <Navigate to="/" replace />;
    console.log(token, "##555")
    return children
};
