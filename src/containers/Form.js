import React, { useEffect, useState } from 'react';
import { Form, Col, Button, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axiosInstance from '../helpers/axios';

const FormResponsePage = ({ formData }) => {
    const [showModal, setShowModal] = useState(false);
    const [responses, setResponses] = useState([]);
    const { id } = useParams();
    const [formdata, setformdata] = useState([]);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    useEffect(async () => {
        const res = await axiosInstance.get(`/api/form/${id}`);
        if (res.status === 200) {
            setformdata(res.data.fields);
        }
        else {
            console.log('error getting data');
        }
    },[])
    const handleChange = (event,index) => {
        const newInputs = [...responses];
        newInputs[index] = event.target.value;
        setResponses(newInputs);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const res = await axiosInstance.post(`/forms/${id}/response`, { responses });
        if (res.status == 200) {
            console.log('response added');
            setShowModal(true);
        }
    };

    return (
        <>
            <h2>{formdata.title}</h2>
            <Form onSubmit={handleSubmit}>
                {formdata.fields.map((field, index) => (
                    <Form.Row key={index}>
                        <Form.Group as={Col} controlId={field}>
                            <Form.Label>{field}</Form.Label>
                            <Form.Control
                                type="text"
                                name={field}
                                value={""}
                                onChange={(e) => handleChange(e,index)}
                            />
                        </Form.Group>
                    </Form.Row>
                ))}
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Response submitted</Modal.Title>
                </Modal.Header>
                <Modal.Body>Your response has been successfully submitted!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default FormResponsePage;
