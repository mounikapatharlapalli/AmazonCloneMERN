import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CheckLogin = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const user_id = localStorage.getItem("user_id");

    if (!user_id) {
      navigate("/login"); // Redirect to login if not logged in
    }
  }, [navigate]);

  return null; // Prevent rendering anything
};

export default CheckLogin;
