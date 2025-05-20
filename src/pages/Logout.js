import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../context/UserContext";

export default function Logout() {
  const { setUser, unsetUser } = useContext(UserContext);
  console.log("Logging out user");
  unsetUser();

  useEffect(() => {
    setUser({
      id: null,
      isAdmin: null,
    });
  }, [setUser]);

  return <Navigate to="/login" />;
}
