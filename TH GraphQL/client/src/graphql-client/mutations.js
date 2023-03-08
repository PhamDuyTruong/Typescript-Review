import {gql} from '@apollo/client';

const addBook = gql`
    mutation addSingleBook($name: String, $genre: String, $authorId: ID!){
        createBook(name: $name, genre: $genre, authorId: $authorId){
            id
            name
        }
    }
`;

export {addBook}