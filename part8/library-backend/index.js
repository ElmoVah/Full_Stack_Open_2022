require('dotenv').config()
const { ApolloServer, gql, UserInputError } = require('apollo-server')

const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!

    editAuthor(name: String!, setBornTo: Int!): Author
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let books = await Book.find({})

      if (args.genre && args.author) {
        const author = await Author.findOne({ name: args.author })
        return await Book.find({
          $and: [{ genres: { $in: args.genre } }, { author: author.id }]
        }).populate('author')
      }

      if (args.genre) {
        return await Book.find({ genres: { $in: args.genre } }).populate(
          'author'
        )
      }

      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        return await Book.find({ author: author.id }).populate('author')
      }

      return await Book.find({}).populate('author')
    },
    allAuthors: async () => Author.find({})
  },
  Author: {
    bookCount: root => {
      return Book.countDocuments({ author: root.name })
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author })

      if (!author) {
        author = new Author({ name: args.author })
        try {
          await author.save()
        } catch (error) {
          throw new UserInputError(error.messaga, {
            invalidArgs: args
          })
        }    
      }

      const newBook = new Book({ ...args, author: author.id })
      try {
        await newBook.save()
      } catch (error) {
        throw new UserInputError(error.messaga, {
          invalidArgs: args
        })
      }
      return newBook
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })
      
      if (!author) {
        return null
      }

      try {
        await Author.findOneAndUpdate(
        { name: args.name },
        { born: args.setBornTo },
        { new: true }
      );
      } catch (error) {
        throw new UserInputError(error.messaga, {
          invalidArgs: args
        })
      }

      return author
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
