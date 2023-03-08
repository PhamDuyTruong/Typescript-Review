import React from 'react';
import Card from 'react-bootstrap/Card';
import {useQuery} from '@apollo/client';
import {getDetailBookById} from '../graphql-client/queries';

const BookDetails = ({bookId}) => {
    const {loading, error, data} = useQuery(getDetailBookById, {
        variables: {
            id: bookId
        },
        skip: bookId === null
    });
    if(loading) return (<p>Loading...</p>)
    if(bookId !== null && error) return (<p>Error !!!</p>)

    const book = bookId !== null ? data.book : null;

  return (
    <Card bg='info' text='white' className='shadow'>
        <Card.Body>
            {
                book === null ? <Card.Text>Please selected a book</Card.Text> : (
                    <>
                    <Card.Title>{book.name}</Card.Title>
                    <Card.Subtitle>Thể loại: {book.genre}</Card.Subtitle>
                    <Card.Text>
                        <p>Tác giả: {book.author.name}</p>
                        <p>Tuổi: {book.author.age}</p>
                        <p>Các tác phẩm đã sáng tác: </p>
                        <ul>
                            {
                                book.author.books.map(item => (
                                    <li key={item.id}>
                                        {item.name}
                                    </li>
                                ))
                            }
                        </ul>
                    </Card.Text>
                    </>
                )
            }
           
        </Card.Body>
    </Card>
  )
}

export default BookDetails