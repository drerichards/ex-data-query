import { GraphQLServer } from 'graphql-yoga'
import {users, posts, comments} from './data'

const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        comments: [Comment!]!
        me: User!
        post: Post!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments: [Comment!]!
    }

    type Comment {
        id: ID!
        text: String!
        author: User!
        post: Post!
    }
`

const resolvers = {
    Query: {
        users(parent, args, ctx) {
            if (!args.query) {
                return users
            }
            return users.filter(user => user.name
                    .toLowerCase()
                    .includes(args.query.toLowerCase()))
        },
        posts(parent, args, ctx) {
            if (!args.query) {
                return posts
            }
            return posts.filter(post => {
                const titleMatch = post.title
                    .toLowerCase()
                    .includes(args.query.toLowerCase())
                const bodyMatch = post.body
                    .toLowerCase()
                    .includes(args.query.toLowerCase())
                return titleMatch || bodyMatch
            })
        },
        comments(parent, args, ctx) {
            return comments
        },
        me() {
            return {
                id: '7984621',
                name: 'Andre',
                email: 'email@email.com',
                age: 34
            }
        },
        post() {
            return {
                id: '5739839',
                title: 'Good Day',
                body: 'Text...',
                published: true
            }
        }
    },
      Post: {
        author(parent, args, ctx) {
            return users.find(user => user.id === parent.author)
        },
        comments(parent, args) {
            return comments.filter(comment => comment.post === parent.id)
        }
    },
    Comment: {
        author(parent, args, ctx) {
            return users.find(user => user.id = parent.author)
        },
        post(parent, args) {
            return posts.find(post => post.id === parent.post)
        }
    },
    User: {
        posts(parent, args, ctx) {
            return posts.filter(post => post.author === parent.id)
        },
        comments(parent, args) {
            return comments.filter(comment => comment.author === parent.id)
        }
    },
  
}

const server = new GraphQLServer({
    typeDefs, resolvers
})

server.start(() => console.log('Server Running'))