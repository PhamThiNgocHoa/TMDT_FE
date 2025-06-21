import { useEffect } from "react";
import {useLocation, useNavigate} from "react-router-dom";

const GoogleRedirectHandler = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get("token");

        if (token) {
            localStorage.setItem("authToken", token);
            navigate("/");
        } else {
            navigate("/login?error=oauth");
        }
    }, []);

    return <div>Đang xử lý đăng nhập...</div>;
};

export default GoogleRedirectHandler;
