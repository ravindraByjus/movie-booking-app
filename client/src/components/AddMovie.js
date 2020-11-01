import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { Input, Label, Container, Button } from 'reactstrap';
import axios from 'axios';

export default function AddMovie() {
    const [title, setTitle] = useState('')
    const [year, setYear] = useState('')
    const [poster, setPoster] = useState('')
    const [imdbId, setId] = useState('')
    const [type, setType] = useState('')

    const history = useHistory();

    async function onClickInsert() {
        try{
            const response  = await axios.post("http://localhost:5000/AddMovie", {
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
                            

    }

    return(
        <Container>
            <section className="mt-4">
                <Label>Enter the imdbId</Label>
                <Input
                    placeholder='Enter the Id'
                    onChange={e => { setId(e.target.value) }}
                />
                <br />
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

                <Button color='success' onClick={onClickInsert}>
                    Insert Data
                </Button>{' '}
                <Button
                    type='button'
                    className='btn btn-danger'
                    onClick={() => history.goBack()}
                >
                    Go Back
                </Button>
            </section>
        </Container>
    )

}

