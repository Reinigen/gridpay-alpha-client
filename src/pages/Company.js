import { useContext, useState } from "react";
import UserContext from "../context/UserContext";

export default function CompanyView() {
  const { user } = useContext(UserContext);

  const [company, setCompany] = useState(null);
}
