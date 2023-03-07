const resolvers = {
    Query: {
        books: async(parent, args, {mongoDataMethods}) => await mongoDataMethods.getAllBooks(),
        book: async(parent, args, {mongoDataMethods}) => await mongoDataMethods.getBookById(args.id),
        authors: async(parent, args, {mongoDataMethods}) => await mongoDataMethods.getAllAuthors(),
        author: async (parent, args, {mongoDataMethods}) => await mongoDataMethods.getAuthorById(args.id),
    },
    Book: {
        author: (parent, args) => {
            return authors.find(author => author.id === parent.authorId)
        }
    },
    Author: {
        books: (parent, args) => books.filter(book => book.authorId === parent.id)
    },
    Mutation: {
        createAuthor: async(parent, args, {mongoDataMethods}) => await mongoDataMethods.createAuthor(args),
        createBook: async(parent, args, {mongoDataMethods}) => await mongoDataMethods.createBook(args)
    }
};

module.exports = resolvers