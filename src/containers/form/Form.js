import React, { useEffect, useState } from 'react';
import { Form, Col, Button, Modal, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../helpers/axios';

const FormResponsePage = () => {
    const [showModal, setShowModal] = useState(false);
    const [responses, setResponses] = useState([]);
    const { id } = useParams();
    const [formdata, setformdata] = useState({});

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    useEffect(() => {
        const getdata = async () => {
            const res = await axiosInstance.get(`/form/${id}`);
            if (res.status === 200) {
                setformdata(res.data.form);
            }
            else {
                console.log('error getting data');
            }
        }
        getdata();
    }, [])

    console.log(formdata.fields)
    const handleChange = (event, index) => {
        const newInputs = [...responses];
        newInputs[index] = event.target.value;
        setResponses(newInputs);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log({ responses });
        const res = await axiosInstance.post(`/forms/response/${id}`, { answers: responses });
        if (res.status == 200) {
            console.log('response added');
            handleShow();
        }
    };

    return (
        <Container>
            <h2>{formdata.title}</h2>
            <form onSubmit={handleSubmit}>
                {formdata.fields && formdata.fields.map((field, index) => (
                    <Row key={index}>
                        <Col>
                            <label>{field}</label>
                        </Col>
                        <Col>
                            <input type={"text"} onChange={(e) => handleChange(e, index)} />
                        </Col>
                    </Row>
                ))}
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </form>
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
        </Container>
    );
};

export default FormResponsePage;
