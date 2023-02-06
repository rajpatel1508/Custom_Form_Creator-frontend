import React, { useState, useEffect } from "react";
import {
    Container,
    Button,
    Modal,
    Form,
    Table,
    Row,
    Col,
    NavLink,
    Navbar,
    Nav,
} from "react-bootstrap";
import axios from "axios";
import './style.css';
import axiosInstance from "../helpers/axios";

const FormList = () => {
    const [forms, setForms] = useState([]);
    const [show, setShow] = useState(false);
    const [formName, setFormName] = useState("");
    const [inputs, setInputs] = useState([{ value: "" }]);
    const [showLogin, setShowLogin] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const [isAuthenticated, setisAuthenticted] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [Responses, setResponses] = useState([]);
    const [viewResponses, setViewResponses] = useState(false);
    

    const handleLogin = async () => {
        const res = await axiosInstance.post(`/login`, {
            username,
            password
        });

        if (res.status === 200) {
            const { token, user } = res.data;
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
        }
    };

    const handleSignUp = async () => {
        let res;
        try {
            res = await axiosInstance.post(`/register`, { username, password });
            if (res.status === 200) {
                const { token, user } = res.data;
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));
            } else {
                const { error } = res.data;
            }
        } catch (error) {
            console.log({ error })
        }
    };

    useEffect(() => {
        axios({
            method: 'GET',
            url: 'http://localhost:2000/api/forms',
        })
            .then((res) => {
                setForms(res.data.forms)
            })
            .catch(e => {
                console.log(e);
            })
        const token = localStorage.getItem('token');
        if (token) {
            setisAuthenticted(true);
        }
    }, []);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleSubmit = async () => {
        const res = await axiosInstance.post(`/forms`, {
            title: formName,
            fields: inputs
        });

        if (res.status === 200) {
            console.log('form created');
        }
    };

    const handleView = async (id) => {
        const res = await axiosInstance.get(`/forms/${id}/responses`);
        if (res.status === 200) {
            setResponses(res.data.responses);
        }
        else {
            console.log('error getting responses');
        }
        setViewResponses(true);
    };

    const handleInputChange = (e, index) => {
        const newInputs = [...inputs];
        newInputs[index].value = e.target.value;
        setInputs(newInputs);
    };

    const addInput = () => {
        setInputs([...inputs, { value: "" }]);
    };

    const onEdit = (id) => {

    }

    const onDelete = (id) => {

    }

    return (
        <>
            <Modal show={showLogin} onHide={() => setShowLogin(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowLogin(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleLogin}>
                        Login
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showSignUp} onHide={() => setShowSignUp(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign Up</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowSignUp(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSignUp}>
                        Sign Up
                    </Button>
                </Modal.Footer>
            </Modal>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">Form Builder</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Form inline>
                        {isAuthenticated ? (
                            <Button variant="outline-success" onClick={() => {localStorage.clear(),location.reload()}}>
                                Sign Out
                            </Button>
                        ) : (
                            <>
                                <Button variant="outline-success" onClick={() => setShowLogin(true)}>
                                    Login
                                </Button>
                                <Button variant="outline-success" onClick={() => setShowSignUp(true)}>
                                    Sign Up
                                </Button>
                            </>
                        )}
                    </Form>
                </Navbar.Collapse>
            </Navbar>
            <Container>
                <Button onClick={handleShow}>Create Form</Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Form</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <Form.Label>Form Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Form Name"
                                onChange={(event) => setFormName(event.target.value)}
                            />
                        </div>
                        <div>
                            <Form.Label>Form Fields</Form.Label>
                        </div>
                        {inputs.map((input, index) => (
                            <div key={index}>
                                <Form.Control
                                    type="text"
                                    placeholder="Form Field"
                                    value={input.value}
                                    onChange={(e) => handleInputChange(e, index)}
                                />
                            </div>
                        ))}
                        <div>
                            <Button className="addbutton" type="button" onClick={addInput}>
                                Add Input Field
                            </Button>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleSubmit}>
                            Create
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Row>
                    <Col >Name</Col>
                    <Col >Link</Col>
                    <Col >Actions</Col>
                </Row>
                {forms.map((form) => (
                    <Row key={form._id}>
                        <Col >{form.title}</Col>
                        <Col >
                            <a href={`http://localhost:3000/forms/${form._id}/link`}>Form Link</a>
                        </Col>
                        <Col style={{ maxWidth: '500px' }}>
                            <Button style={{ marginRight: '5px' }} onClick={() => handleView(form._id)}>View Responses</Button>
                        </Col>
                    </Row>
                ))}
                <Modal show={viewResponses} onHide={() => setViewResponses(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Responses for Form</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Response ID</th>
                                    <th>Response Data</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Responses.map((response, index) => (
                                    <tr key={index}>
                                        <td>{response._id}</td>
                                        <td>{response.answers.map((answer) => (<>{answer}<br/></>))}</td>
                                        <td>
                                            <Button onClick={() => onEdit(response.id)}>Edit</Button>
                                            <Button onClick={() => onDelete(response.id)}>Delete</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Modal.Body>
                </Modal>
            </Container>
        </>
    );
};

export default FormList;
