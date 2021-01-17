import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, InputGroup, FormControl, Table, Form } from "react-bootstrap";
import { AllTeams } from "./settings";

const AllTeam = () => {

    const [team, setTeam] = useState([]);

    const fetchRandomQuote = () => {
        fetch(AllTeams)
            .then(res => res.json())
            .then(data => {
                setTeam(data);
            })
    }

    //loads random quote first time
    useEffect(() => {
        fetchRandomQuote();
    }, []);

    return (
        <div>

            <Container>
                <h2>Quotes from Breaking Bad</h2>
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
        </div>
    );
}


export default AllTeam;