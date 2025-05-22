import { useCallback, useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import CompanyContext from "../../context/CompanyContext";
import UserContext from "../../context/UserContext";

export default function CompanySelector() {
  const { company, setCompany } = useContext(CompanyContext);
  const { ownedCompanies, setOwnedCompanies } = useState([]);
  const { employedCompanies, setEmployedCompanies } = useState([]);
  const { companyList, setCompanyList } = useState([]);
  const { user } = useContext(UserContext);

  const fetchOwnedCompanies = useCallback(() => {
    if (user.id === null) {
      return <></>;
    } else {
      fetch(`${process.env.REACT_APP_GRIDPAY_API}/companies/owner`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then(
          (data) => {
            console.log(data);
            if (data.data !== "Company not found") {
              setOwnedCompanies(data.data);
            } else {
              setOwnedCompanies([]);
            }
          },
          [setCompany, setOwnedCompanies]
        );
    }
  });

  const fetchEmployedCompanies = useCallback(() => {});

  function selectCompany(e) {
    e.preventDefault();
    setCompany(e.target.value);
  }

  useEffect(() => {
    fetchOwnedCompanies();
  }, [company, companyList, fetchOwnedCompanies]);

  return company.isActive !== null ? (
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
