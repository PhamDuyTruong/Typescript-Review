import React, {useState} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useQuery, useMutation} from '@apollo/client';
import {getAuthors} from '../graphql-client/queries';
import {addBook} from '../graphql-client/mutations'

const Forms = () => {
    const [newBook, setNewBook] = useState({
        name: '',
        genre: '',
        authorId: ''
    });

    const handleInputChange = e => {
        setNewBook({
            ...newBook,
            [e.target.name]: e.target.value
        })
    }

    //Query
    const {loading, error, data} = useQuery(getAuthors);

    //Mutation
    const [createBook, dataMutation] = useMutation(addBook);



    const handleSubmitBook = (e) => {
        e.preventDefault();
        createBook({
            variables: {
                name: newBook.name,
                genre: newBook.genre,
                authorId: newBook.authorId
            }
        });
        setNewBook({
            name: '',
            genre: '',
            authorId: ''
        })
    }

  return (
    <Row>
        <Col>
            <Form onSubmit={handleSubmitBook}>
                <Form.Group>
                    <Form.Control type='text' placeholder='Book name' name='name' onChange={handleInputChange} value={newBook.name}/>
                </Form.Group>
                <Form.Group>
                    <Form.Control type='text' placeholder='Book genre' name='genre'onChange={handleInputChange} value={newBook.genre}/>
                </Form.Group>
                <Form.Group>
                    {loading ? <p>Loading...</p>: null}
                    <Form.Control as='select' defaultValue="Select Author" name='authorId' onChange={handleInputChange} value={newBook.authorId}>
                        <option disabled>Select Author</option>
                        {data.authors.map(item => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Button className='float-right' variant='info' type='submit' >Add Book</Button>
            </Form>
        </Col>

        <Col>
        <Form>
            <Form.Group className='invisible'>
                <Form.Control />
            </Form.Group>
                <Form.Group>
                    <Form.Control type='text' placeholder='Author name'/>
                </Form.Group>
                <Form.Group>
                    <Form.Control type='number' placeholder='Author age'/>
                </Form.Group>
                <Button className='float-right' variant='info' type='submit'>Add Author</Button>
            </Form>
        
        </Col>
    </Row>
  )
}

export default Forms