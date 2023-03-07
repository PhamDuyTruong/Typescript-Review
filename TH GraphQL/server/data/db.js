const Book = require("../Models/Book");
const Author = require("../Models/Author");

const mongoDataMethods = {
    getAllBooks: async () => await Book.find(),
    getAllAuthors: async() => await Author.find(),
    getBookById: async(id) => await Book.findById(id),
    getAuthorById: async(id) => await Author.findById(id),
    createAuthor: async args => {
        const newAuthor = new Author(args);
        return await newAuthor.save();
    },
    createBook: async args => {
        const newBook = new Book(args);
        return await newBook.save();
    }
};

module.exports = mongoDataMethods;