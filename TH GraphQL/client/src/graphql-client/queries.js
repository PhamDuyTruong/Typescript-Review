import {gql} from '@apollo/client';

const getBooks = gql`
    query getAllBooks{
    books{
      name
      id
    }
  }

`;

const getDetailBookById = gql`
    query getDetailBookById($id: ID!){
        book(id: $id){
            id
            name
            genre
            author{
                id
                name
                age
                books{
                    id
                    name
                }
            }
        }
    }

`

export {getBooks, getDetailBookById}