import React, { useState, useEffect } from "react";
import {
  AllUsers, DeleteUser, UpdateUser, GetUser, AddUser,
  AllTeams, TeamByName, AddTeam, UpdateTeam, DeleteTeam
} from "./settings";
import {
  Container,
  Row,
  Col,
  Button,
  InputGroup,
  FormControl,
  Table,
  Form
} from "react-bootstrap";

function AdminCrudSport() {
  const initialValues = {
    teamName: "",
    pricePerYear: "",
    minAge: "",
    maxAge: ""
  };

  //const [allPerson, setAllPerson] = useState([]);
  //const [person, setPerson] = useState(initialValues);
  const [allTeam, setAllTeam] = useState([]);
  const [team, setTeam] = useState(initialValues);

  const handleSubmit = (event) => {
    //   alert('A name was submitted: ' + person.firstName);
    event.preventDefault();
    updateForm(team);
    console.log("from submit " + team);
  };

  const handleChange = (event) => {
    const target = event.target;
    const id = target.id;
    const value = target.value;
    setTeam({ ...team, [id]: value });
    console.log("from change " + id);
  };

  const fetchTeam = () => {
    fetch(AllTeams)
      .then((res) => res.json())
      .then((data) => {
        setAllTeam(data);
      });
  };

  const deleteSport = (teamName) => {
    const options = makeOptions("DELETE");

    fetch(DeleteTeam + teamName, options)
      .then((res) => res.json())
      .then((data) => {
        setAllTeam(data);
        fetchTeam();
      })
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => console.log(e.detail));
        } else {
          console.log("Network error");
        }
      });
  };

  const updateForm = (team) => {
    const options = makeOptions("PUT", team);

    fetch(UpdateTeam + team.teamName, options)
      .then((res) => fetchTeam())
      .then(reset => setTeam(initialValues))
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => console.log(e.detail));
        } else {
          console.log("Network error" + err);
        }
      });
  };

  const getTeam = (teamName) => {
    fetch(TeamByName + teamName)
      .then((res) => res.json())
      .then((data) => {
        setTeam(data);
        console.log(data);
      })
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => console.log(e.detail));
        } else {
          console.log("Network error");
        }
      });
  };

  const addTeam = () => {
    const options = makeOptions("POST", team);

    fetch(AddTeam, options)
      .then((res) => res.json())
      .then((res) => fetchTeam())
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => console.log(e.detail));
        } else {
          console.log("Network error");
        }
      });
  };

  const teamForm = () => {
    return (
      <div>
        <Form onSubmit={handleSubmit} >

          <Form.Group controlId="teamName">
            <Form.Label>Sport</Form.Label>
            <Form.Control
              type="text"
              placeholder="team name"
              value={team.teamName}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="pricePerYear">
            <Form.Label>Sport</Form.Label>
            <Form.Control
              type="text"
              placeholder="price per year"
              value={team.pricePerYear}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="minAge">
            <Form.Label>Sport</Form.Label>
            <Form.Control
              type="text"
              placeholder="minimum age"
              value={team.minAge}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="maxAge">
            <Form.Label>Sport</Form.Label>
            <Form.Control
              type="text"
              placeholder="maximum age"
              value={team.maxAge}
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>

        </Form>
        <p>{JSON.stringify(team)}</p>
      </div>
    );
  };

  /*
  Function for POST, PUT and DELETE
  */
  function makeOptions(method, body) {
    const opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json"
      }
    };
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  }

  function fetchWithErrorCheck(res) {
    if (!res.ok) {
      return Promise.reject({ status: res.status, fullError: res.json() });
    }
    return res.json();
  }

  useEffect(() => {
    fetchTeam();
  }, []);

  return (
    <div>
      <Container>
        <h2>CRUD for Teams</h2>
        <Row className="mt-4">
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Team Name</th>
                  <th>Price Per Year</th>
                  <th>Minimum Age</th>
                  <th>Maximum Age</th>
                  <th colSpan="2">&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {allTeam.all &&
                  allTeam.all.map((element) => {
                    return (
                      <tr key={element.teamName}>
                        <td>{element.teamName}</td>
                        <td>{element.pricePerYear}</td>
                        <td>{element.minAge}</td>
                        <td>{element.maxAge}</td>
                        <td>
                          <Button onClick={() => getTeam(element.teamName)}>
                            Edit
                          </Button>
                        </td>
                        <td>
                          <Button onClick={() => deleteSport(element.teamName)}>
                            Delete
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>

          </Col>
        </Row>
        {<Button onClick={() => addTeam()}>Add</Button>}
        {teamForm()}
      </Container>
    </div>
  );
}

export default AdminCrudSport;
