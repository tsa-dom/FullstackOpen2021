const { ApolloServer, gql, UserInputError, AuthenticationError, PubSub } = require('apollo-server')
const config = require('./utils/config')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
mongoose.connect(config.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => { console.log('connected to MongoDB') })
  .catch((error) => { console.log('error occured while connecting to MongoDB', error.message) })

mongoose.set('debug', true)

const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const pubsub = new PubSub()

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }
  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.genre) return await Book.find({}).populate('author')
      const books = await Book.find({ genres: { $in: [args.genre] }}).populate('author')
      return books
    },
    allAuthors: async (root, args) => {
      const authors = await Author.find({}).populate('books')
      return authors.map(author => {
        return { name: author.name, born: author.born, bookCount: author.books.length}
      })
    },
    me: (root, args, context) => {
      return context.user
    } 
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const user = context.user
      if (!user) throw new AuthenticationError("User not authenticated")

      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author, born: null })
        try {
          await author.save()
        } catch (error) {
          throw new UserInputError(error.message, { invalidArgs: args })
        }
      }
      const book = new Book({
        title: args.title,
        published: args.published,
        genres: args.genres,
        author: author
      })
      try {
        author.books = author.books.concat(book._id)
        await book.save()
        await author.save()

        pubsub.publish('BOOK_ADDED', { bookAdded: book })
        return book
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }
    },
    editAuthor: async (root, args, context) => {
      const user = context.user
      if (!user) throw new AuthenticationError("User not authenticated")

      const author = await Author.findOne({ name: args.name })
      author.born = args.setBornTo
      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }
      return author
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

      try {
        await user.save()
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== 'password') {
        throw new UserInputError('Wrong credentials')
      }
      const userForToken = {
        id: user._id,
        username: user.username
      }
      return { value: jwt.sign(userForToken, process.env.SECRET) }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.SECRET)
      const user = await User.findById(decodedToken.id)
      return { user }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscription ready at ${subscriptionsUrl}`)
})