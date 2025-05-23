import { useCallback, useContext, useEffect, useState } from "react";
import { Button, Container, Form, FormGroup, Row } from "react-bootstrap";
import CompanyContext from "../../context/CompanyContext";
import UserContext from "../../context/UserContext";
import AddCompany from "./AddCompany";

export default function CompanySelector() {
  const { company, setCompany } = useContext(CompanyContext);
  const [ownedCompanies, setOwnedCompanies] = useState([]);
  const [employedCompanies, setEmployedCompanies] = useState([]);
  const [companyList, setCompanyList] = useState([]);
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
        .then((data) => {
          // console.log("Owned Companies:", data.data);
          if (data.message !== "Company not found") {
            setOwnedCompanies([...data.data]);
          } else {
            setOwnedCompanies([]);
          }
        });
    }
  }, [user.id, setOwnedCompanies]);

  const fetchEmployedCompanies = useCallback(() => {
    if (user.id === null) {
      return <></>;
    } else {
      fetch(`${process.env.REACT_APP_GRIDPAY_API}/companies/employee`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log("Employed Companies", data.data);
          if (data.status !== 404) {
            setEmployedCompanies([...data.data]);
          } else {
            setEmployedCompanies([]);
          }
        });
    }
  }, [user.id, setEmployedCompanies]);

  function selectCompany(id, name) {
    // console.log("activated selectCompany");

    setCompany({ id: id, name: name, isActive: true });
  }

  useEffect(() => {
    fetchOwnedCompanies();
    fetchEmployedCompanies();
  }, []);

  useEffect(() => {
    if (ownedCompanies.length === 0 && employedCompanies.length === 0) {
      setCompanyList([]);
    } else {
      const ownedCompaniesArr = ownedCompanies.map((company) => {
        // console.log("company", company);
        if (!company) {
          return <></>;
        }
        return (
          <Button
            id="company-button"
            className="btn-options m-2"
            key={company.companyId}
            value={company.companyId}
            onClick={() =>
              selectCompany(company.companyId, company.companyName)
            }
          >
            <h3>{company.companyName}</h3>
            <p>Owner</p>
            <p>{company.address}</p>
          </Button>
        );
      });
      console.log("ownedCompaniesArr", ownedCompaniesArr);
      const employedCompaniesArr = employedCompanies.map((company) => {
        // console.log("company", company);
        if (!company) {
          return <></>;
        }
        return (
          <Button
            id="company-button"
            className="btn-options m-2"
            key={company.companyId}
            value={company.companyId}
            onClick={() =>
              selectCompany(company.companyId, company.companyName)
            }
          >
            <h3>{company.companyName}</h3>
            <p>Employee</p>
          </Button>
        );
      });
      setCompanyList([...ownedCompaniesArr, ...employedCompaniesArr]);
    }
  }, [ownedCompanies, employedCompanies]);
  // console.log("No. of companies", companyList);
  return companyList.length > 0 ? (
    <>
      <Container>
        <h1>Companies</h1>
        <Container className="d-flex flex-column">
          <p>Select Company to View: </p>
          <br></br>
          <Row>{companyList}</Row>
        </Container>

        <hr></hr>
        <p>Start a New Company</p>
        <AddCompany fetchData={fetchOwnedCompanies} />
      </Container>
    </>
  ) : (
    <>
      <h1>Let's Get Started</h1>
      <Container className="d-flex flex-column align-items-center border m-5 p-5">
        <AddCompany fetchData={fetchOwnedCompanies} />
      </Container>
    </>
  );
}
