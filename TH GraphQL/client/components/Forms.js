import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

const Forms = () => {
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
                    <Form.Control as='select' defaultValue="Select Author"/>
                </Form.Group>
            </Form>
        </Col>
    </Row>
  )
}

export default Forms