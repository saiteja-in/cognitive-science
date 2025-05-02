import UserForm from "@/components/UserForm";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Signin = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (userId) {
            navigate("/history");
        }
    }, []);
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <UserForm/>
        </div>
    )
}

export default Signin;
