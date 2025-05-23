import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import CompanyContext from "../../context/CompanyContext";

export default function SwitchCompany() {
  const { setCompany } = useContext(CompanyContext);
  console.log("Switching Company");

  useEffect(() => {
    setCompany({
      id: null,
      name: null,
      isActive: null,
    });
  }, [setCompany]);

  return <Navigate to="/company-selector" />;
}
