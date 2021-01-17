import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, InputGroup, FormControl, Table, Form } from "react-bootstrap";
import { AllTeams, ALLSports, AllCoach } from "./settings";

const AllSportAndTeam = () => {

    const [sport, setSport] = useState([]);
    const [team, setTeam] = useState([]);
    const [coach, setCoach] = useState([]);

    const fetchSport = () => {
        fetch(ALLSports)
            .then(res => res.json())
            .then(data => {
                setSport(data);
            })
    }

    //loads random quote first time
    useEffect(() => {
        fetchSport();
    }, []);

    const fetchTeam = () => {
        fetch(AllTeams)
            .then(res => res.json())
            .then(data => {
                setTeam(data);
            })
    }

    //loads random quote first time
    useEffect(() => {
        fetchTeam();
    }, []);

    const fetchCoach = () => {
        fetch(AllCoach)
            .then(res => res.json())
            .then(data => {
                setCoach(data);
            })
    }

    //loads random quote first time
    useEffect(() => {
        fetchCoach();
    }, []);

    return (

        <div>
            <Container>
                <h2>Sports</h2>
                <Row className="mt-4">
                </Row>
                <Row className="mt-4">
                    <Col>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Team Name</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    sport.all && sport.all.map(element => {
                                        return (
                                            <tr>
                                                <td>{element.sportName}</td>
                                                <td>{element.description}</td>
                                            </tr>
                                        )
                                    }
                                    )}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
            <Container>
                <h2>Teams</h2>
                <Row className="mt-4">
                </Row>
                <Row className="mt-4">
                    <Col>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Team Name</th>
                                    <th>Price Per Year</th>
                                    <th>Minimum age</th>
                                    <th>Maximum age</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    team.all && team.all.map(element => {
                                        return (
                                            <tr>
                                                <td>{element.teamName}</td>
                                                <td>{element.pricePerYear}</td>
                                                <td>{element.minAge}</td>
                                                <td>{element.maxAge}</td>
                                            </tr>
                                        )
                                    }
                                    )}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
            <Container>
                <h2>Coaches</h2>
                <Row className="mt-4">
                </Row>
                <Row className="mt-4">
                    <Col>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    coach.all && coach.all.map(element => {
                                        return (
                                            <tr>
                                                <td>{element.name}</td>
                                                <td>{element.email}</td>
                                                <td>{element.phone}</td>
                                            </tr>
                                        )
                                    }
                                    )}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}


export default AllSportAndTeam;