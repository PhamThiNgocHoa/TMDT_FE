import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import {checkTokenExpiration, logout} from "../server/api/authentication/auth.post";

export const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            setIsLoggedIn(false);
            navigate("/login");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const fetchCheckTokenExpiration = async (token: string)=>{
        try {
            await checkTokenExpiration(token);
        }catch (error:any){
            console.log("Error:", error.message);
            throw new Error("Login failed");
        }
    }

    return { isLoggedIn, handleLogout, setIsLoggedIn, fetchCheckTokenExpiration };
};
