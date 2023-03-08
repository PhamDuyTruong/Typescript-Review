import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useQuery} from '@apollo/client';
import {getAuthors} from '../graphql-client/queries'

const Forms = () => {
    const {loading, error, data} = useQuery(getAuthors);

  return (
    <Row>
        <Col>
            <Form>
                <Form.Group>
                    <Form.Control type='text' placeholder='Book name'/>
                </Form.Group>
                <Form.Group>
                    <Form.Control type='text' placeholder='Book genre'/>
                </Form.Group>
                <Form.Group>
                    {loading ? <p>Loading...</p>: null}
                    <Form.Control as='select' defaultValue="Select Author">
                        <option disabled>Select Author</option>
                        {data.authors.map(item => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Button className='float-right' variant='info' type='submit'>Add Book</Button>
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