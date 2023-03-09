import React, {useState} from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useMutation} from '@apollo/client';
import {getAuthors} from '../graphql-client/queries';
import {addAuthor} from '../graphql-client/mutations'

const AuthorForm = () => {
    const [newAuthor, setNewAuthor] = useState({
        name: '',
        age: ''
    });

    const handleInputChange = e => {
        setNewAuthor({
            ...newAuthor,
            [e.target.name]: e.target.value
        })
    };

     //Mutation
     const [createAuthor, dataMutation] = useMutation(addAuthor);

     const handleSubmitBook = (e) => {
        e.preventDefault();
        createAuthor({
            variables: {
                name: newAuthor.name,
                age: newAuthor.age,
            },
            refetchQueries: [{query: getAuthors}]
        });
        setNewAuthor({
            name: '',
            age:''
        })
    }

  return (
    <Form onSubmit={handleSubmitBook}>
    <Form.Group className='invisible'>
        <Form.Control />
    </Form.Group>
        <Form.Group>
            <Form.Control type='text' placeholder='Author name' name='name' onChange={handleInputChange} value={newAuthor.name}/>
        </Form.Group>
        <Form.Group>
            <Form.Control type='number' placeholder='Author age' name='age' onChange={handleInputChange} value={newAuthor.age}/>
        </Form.Group>
        <Button className='float-right' variant='info' type='submit'>Add Author</Button>
    </Form>
  )
}

export default AuthorForm