import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { Input, Label, Container, Button } from 'reactstrap';
import axios from 'axios';

export default function AddMovie() {
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [poster, setPoster] = useState('');
    const [imdbId, setId] = useState('');
    const [type, setType] = useState('');
    const [errorMsg, setErrorMsg] = useState({});

    const history = useHistory();

    function isValid() {
        let error = false;
        let errorMsg = {}

        if (imdbId.slice(0,2) !== 'tt' && imdbId.length !== 9) {
            error = true; 
            errorMsg.imdbId = "Invalid movie Id";
            
        }
        if (title.length === 0) {
            error = true; 
            errorMsg.title = "Please enter movie title";
        }
        if (year.length !== 4) {
            error = true; 
            errorMsg.year = "Please enter a valid year";
        }

        if(error){
            setErrorMsg(errorMsg)
        } 
        else {
            onClickInsert();
        }
        

    }


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
                    onChange={e => { setId(e.target.value)}}
                />
                <span style={{color: 'red'}}>{errorMsg.imdbId}</span>
                <br />
                <Label>Enter the Movie Name</Label>
                <Input
                    placeholder='Enter movie name'
                    onChange={e => { setTitle(e.target.value) }}
                />
                <span style={{color: 'red'}}>{errorMsg.title}</span>
                <br />
                <Label>Enter the Year</Label>
                <Input
                    placeholder='Enter the year'
                    onChange={e => { setYear(e.target.value) }}
                />
                <span style={{color: 'red'}}>{errorMsg.year}</span>
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

                <Button color='success' onClick={isValid}>
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

