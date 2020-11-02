import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom'
import { Modal, ModalHeader, ModalBody, ModalFooter, Container, Button } from 'reactstrap';
import axios from 'axios';

export default function DeleteMovie(props) {
    const { movieId, movieTitle } = props;
    const [modal, setModal] = useState(false);
    
    const toggle = () => setModal(!modal);

    async function onclickDeleteMovie() {
        try{
            const response  = await axios.delete(`http://localhost:5000/deleteMovie/${movieId}`, {movieId});
            console.log(response.data)
            alert(response.data.message)
        } 
        catch(error) {
            console.error(error);
        }

        toggle();
    }

    return(
        <Container>
            <Button color="danger" onClick={toggle}>
            Delete Movie
            </Button>

            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Delete {movieTitle}</ModalHeader>
                <ModalBody>
                    Are you sure to delete {movieTitle}?
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={onclickDeleteMovie}>Delete</Button>{' '}
                    <Button color="success" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </Container>
    )
}