import React from 'react';
import Card from 'react-bootstrap/Card'

const BookDetails = () => {
  return (
    <Card bg='info' text='white' className='shadow'>
        <Card.Body>
            <Card.Title>Truyện Kiều</Card.Title>
            <Card.Subtitle>Thơ lục bát</Card.Subtitle>
            <Card.Text>
                <p>Nguyễn Du</p>
                <p>130</p>
                <p>All books by this author</p>
                <ul>
                    <li>
                        Lão Hạc
                    </li>
                    <li>Số đỏ</li>
                </ul>
            </Card.Text>
        </Card.Body>
    </Card>
  )
}

export default BookDetails