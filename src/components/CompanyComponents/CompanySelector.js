import { useCallback, useContext, useEffect } from "react";
import UserContext from "../../context/UserContext";
import CompanyContext from "../../context/CompanyContext";
import { Container } from "react-bootstrap";

export default function CompanySelector() {
  const { user } = useContext(UserContext);
  const { company, setCompany } = useContext(CompanyContext);

  const fetchCompanies = useCallback(() => {
    fetch(`${process.env.REACT_APP_GRIDPAY_API}/companies/owner`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.data !== "Company not found") {
          setCompany(data.data[0]);
        } else {
          setCompany({
            id: null,
            name: null,
          });
        }
      });
  }, [setCompany]);

  useEffect(() => {
    fetchCompanies();
  }, [company, fetchCompanies]);

  return company.id !== null ? (
    <>
      <Container>
        <h1>COMPANY</h1>
        <h2> CREATE COMPANY</h2>
      </Container>
    </>
  ) : (
    <>
      <Container>
        <h1>CREATE COMPANY</h1>
      </Container>
    </>
  );
}
