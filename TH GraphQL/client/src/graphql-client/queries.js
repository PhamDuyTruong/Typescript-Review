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

`;

const getAuthors = gql`
    query getAuthorQuery{
        authors{
            name
            id
        }
    }
`

export {getBooks, getDetailBookById, getAuthors}