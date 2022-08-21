const { UserInputError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const JWT_SECRET = 'TOP_SECRET'

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {

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
    allAuthors: async () => await Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Author: {
    bookCount: async (root) => {
      return await Book.find({ author: root.id }).countDocuments()
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {

      if (!context.currentUser) {
        throw new AuthenticationError('not authenticated')
      }

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

      const newBook = new Book({ ...args, author })
      try {
        await newBook.save()
      } catch (error) {
        throw new UserInputError(error.messaga, {
          invalidArgs: args
        })
      }

      pubsub.publish('CREATE_BOOK', { bookAdded: newBook })

      return newBook
    },
    editAuthor: async (root, args, context) => {
      const author = await Author.findOne({ name: args.name })

      if (!context.currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      if (!author) {
        return null
      }

      try {
        await Author.findOneAndUpdate(
          { name: args.name },
          { born: args.setBornTo },
          { new: true }
        )
      } catch (error) {
        throw new UserInputError(error.messaga, {
          invalidArgs: args
        })
      }

      return author
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

      return user.save().catch(error => {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['CREATE_BOOK'])
    }
  }
}

module.exports = resolvers