import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom'
import { Input, Label, Modal, ModalHeader, ModalBody, ModalFooter, Container, Button } from 'reactstrap';
import axios from 'axios';

export default function UpdateMovie(props) {
    const { imdbId } = props;
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [poster, setPoster] = useState('');
    const [type, setType] = useState('');
    const [modal, setModal] = useState(false);
    
    const toggle = () => setModal(!modal);

    async function onclickUpdate() {
        try{
            const response  = await axios.put(`http://localhost:5000/UpdateMovie/${imdbId}`, {
                                        title,
                                        year,
                                        poster,
                                        imdbId,
                                        type
                                    });
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
            <Button color="primary" onClick={toggle}>
            Update Movie
            </Button>

            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Update Movie</ModalHeader>
                <ModalBody>
                    <Label>Enter the Movie Name</Label>
                    <Input
                        placeholder='Enter movie name'
                        onChange={e => { setTitle(e.target.value) }}
                    />
                    <br />
                    <Label>Enter the Year</Label>
                    <Input
                        placeholder='Enter the year'
                        onChange={e => { setYear(e.target.value) }}
                    />
                    <br />
                    <Label>Enter the Type</Label>
                    <Input
                        placeholder='Enter the type'
                        onChange={e => { setType(e.target.value) }}
                    />
                    <br />
                    <Label>Enter the Poster Link</Label>
                    <Input
                        placeholder='Enter the Poster link'
                        onChange={e => { setPoster(e.target.value) }}
                    />
                    <br />
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={onclickUpdate}>Update</Button>{' '}
                    <Button color="danger" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </Container>
    )
}