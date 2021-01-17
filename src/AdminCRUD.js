import React, { useState, useEffect } from "react";
import {
  AllUsers, DeleteUser, UpdateUser, GetUser, AddUser,
  ALLSports, SportByName, AddSport, UpdateSport, DeleteSport
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

function AdminCrud() {
  const initialValues = {
    sportName: "",
    Description: "",
  };

  //const [allPerson, setAllPerson] = useState([]);
  //const [person, setPerson] = useState(initialValues);
  const [allSport, setAllSport] = useState([]);
  const [sport, setSport] = useState(initialValues);

  const handleSubmit = (event) => {
    //   alert('A name was submitted: ' + person.firstName);
    event.preventDefault();
    updateForm(sport);
    console.log("from submit " + sport);
  };

  const handleChange = (event) => {
    const target = event.target;
    const id = target.id;
    const value = target.value;
    setSport({ ...sport, [id]: value });
    console.log("from change " + id);
  };

  const fetchSport = () => {
    fetch(ALLSports)
      .then((res) => res.json())
      .then((data) => {
        setAllSport(data);
      });
  };

  const deleteSport = (sportName) => {
    const options = makeOptions("DELETE");

    fetch(DeleteSport + sportName, options)
      .then((res) => res.json())
      .then((data) => {
        setAllSport(data);
        fetchSport();
      })
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => console.log(e.detail));
        } else {
          console.log("Network error");
        }
      });
  };

  const updateForm = (sport) => {
    const options = makeOptions("PUT", sport);

    fetch(UpdateSport + sport.sportName, options)
      .then((res) => fetchSport())
      .then(reset => setSport(initialValues))
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => console.log(e.detail));
        } else {
          console.log("Network error" + err);
        }
      });
  };

  const getSport = (sportName) => {
    fetch(SportByName + sportName)
      .then((res) => res.json())
      .then((data) => {
        setSport(data);
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

  const addSport = () => {
    const options = makeOptions("POST", sport);

    fetch(AddSport, options)
      .then((res) => res.json())
      .then((res) => fetchSport())
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => console.log(e.detail));
        } else {
          console.log("Network error");
        }
      });
  };

  const sportForm = () => {
    return (
      <div>
        <Form onSubmit={handleSubmit} >

          <Form.Group controlId="sportName">
            <Form.Label>Sport</Form.Label>
            <Form.Control
              type="text"
              placeholder="sport name"
              value={sport.sportName}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Sport</Form.Label>
            <Form.Control
              type="text"
              placeholder="description"
              value={sport.description}
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>

        </Form>
        <p>{JSON.stringify(sport)}</p>
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
    fetchSport();
  }, []);

  return (
    <div>
      <Container>
        <h2>CRUD for users</h2>
        <Row className="mt-4">
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Sport</th>
                  <th>Sport description</th>
                  <th colSpan="2">&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {allSport.all &&
                  allSport.all.map((element) => {
                    return (
                      <tr key={element.sportName}>
                        <td>{element.sportName}</td>
                        <td>{element.description}</td>
                        <td>
                          <Button onClick={() => getSport(element.sportName)}>
                            Edit
                          </Button>
                        </td>
                        <td>
                          <Button onClick={() => deleteSport(element.sportName)}>
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
        {<Button onClick={() => addSport()}>Add</Button>}
        {sportForm()}
      </Container>
    </div>
  );
}

export default AdminCrud;
