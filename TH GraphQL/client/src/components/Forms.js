import React, {useState} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useQuery, useMutation} from '@apollo/client';
import {getAuthors, getBooks} from '../graphql-client/queries';
import {addBook} from '../graphql-client/mutations'
import BookForm from './BookForm';
import AuthorForm from './AuthorForm';

const Forms = () => {
    const [newBook, setNewBook] = useState({
        name: '',
        genre: '',
        authorId: ''
    });

    //Query
    const {loading, error, data} = useQuery(getAuthors);

    //Mutation
    const [createBook, dataMutation] = useMutation(addBook);



 

  return (
    <Row>
        <Col>
           <BookForm />
        </Col>
        <Col>
           <AuthorForm />
        </Col>
    </Row>
  )
}

export default Forms