import RegisterForm from "@/components/RegisterForm";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Register = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (userId) {
            navigate("/history");
        }
    }, []);
    
    return (
        <div>
            <RegisterForm />
        </div>
    )
}

export default Register;
