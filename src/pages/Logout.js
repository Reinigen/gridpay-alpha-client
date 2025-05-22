import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import CompanyContext from "../context/CompanyContext";

export default function Logout() {
  const { setUser, unsetUser } = useContext(UserContext);
  const { setCompany, unsetCompany } = useContext(CompanyContext);
  console.log("Logging out user");
  unsetUser();
  unsetCompany();

  useEffect(() => {
    setUser({
      id: null,
      isAdmin: null,
    });
    setCompany({
      id: null,
      name: null,
    });
  }, [setUser, setCompany]);

  return <Navigate to="/login" />;
}
