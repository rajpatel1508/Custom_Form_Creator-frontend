import React, { useState, useEffect } from "react";
import {
    Container,
    Button,
    Modal,
    Form,
    Table,
} from "react-bootstrap";
import axios from "axios";
import './style.css';

const FormList = () => {
    const [forms, setForms] = useState([]);
    const [show, setShow] = useState(false);
    const [formName, setFormName] = useState("");
    const [inputs, setInputs] = useState([{ value: "" }]);

    useEffect(() => {
        axios({
            method: 'GET',
            url: 'localhost:2000/api/forms',
        })
            .then((res) => {
                console.log({ res });
                setForms(res.forms)
            })
            .catch(e => {
                console.log(e);
            })
    }, []);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleSubmit = () => {
        // Implement form submission logic
    };

    const handleDelete = (id) => {
        // Implement delete logic
    };

    const handleView = (id) => {
        // Implement view responses logic
    };

    const handleInputChange = (e, index) => {
        const newInputs = [...inputs];
        newInputs[index].value = e.target.value;
        setInputs(newInputs);
    };

    const addInput = () => {
        setInputs([...inputs, { value: "" }]);
    };

    return (
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
            <Table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Link</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {forms.map((form) => (
                        <tr key={form._id}>
                            <td>{form.name}</td>
                            <td>
                                <a href={`/forms/${form._id}`}>{form.link}</a>
                            </td>
                            <td>
                                <Button onClick={() => handleView(form._id)}>View Responses</Button>
                                <Button onClick={() => handleDelete(form._id)}>Delete</Button>
                                <Button>Edit</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default FormList;
