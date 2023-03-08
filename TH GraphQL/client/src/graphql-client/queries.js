import {gql} from '@apollo/client';

const getBooks = gql`
    query getAllBooks{
    books{
      name
      id
    }
  }

`;

export {getBooks}