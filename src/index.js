import { GraphQLServer } from 'graphql-yoga'

const users = [
    {
        id: '1',
        name: 'Andre',
        email: 'Andre@email.com',
        age: 32,
        posts: '001'
    },
    {
        id: '2',
        name: 'Mark',
        email: 'Mark@email.com',
        age: 36,
        posts: '002'
    },
    {
        id: '3',
        name: 'Rich',
        email: 'Rich@email.com',
        age: 34,
        posts: '003'
    },
]

const posts = [
    {
        id: '001',
        title: '1 Title',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
        published: true,
        author: '2'
    },
    {
        id: '002',
        title: '2 Title',
        body: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
        published: false,
        author: '2'
    },
    {
        id: '003',
        title: '3 Title',
        body: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ',
        published: true,
        author: '3'
    },
]

const comments = [
    {
        id: '2201',
        text: 'Lincididunt ut labore '
    },
    {
        id: '2202',
        text: 'Ut enex ea commodo consequat. '
    },
    {
        id: '2203',
        text: 'Dufu giat nulla pariatur. '
    },
    {
        id: '220',
        text: 'Du et dolore magna aliqua. '
    }
]

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
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
    }

    type Comment {
        id: ID!
        text: String!
    }
`

const resolvers = {
    Query: {
        users(parent, args, ctx) {
            if (!args.query) {
                return users
            }
            return users.filter(user => {
                return user.name.toLowerCase().includes(args.query.toLowerCase())
            })
        },
        posts(parent, args, ctx) {
            if (!args.query) {
                return posts
            }
            return posts.filter(post => {
                const titleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
                const bodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())
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
                published: true,
            }
        }
    },
    User: {
        posts(parent, args, ctx) {
            return posts.filter(post => {
                return post.author === parent.id
            })
        }
    },
    Post: {
        author(parent, args, ctx) {
            return users.find(user => {
                return user.id === parent.author
            })
        }
    }
}

const server = new GraphQLServer({
    typeDefs, resolvers
})

server.start(() => console.log('Server Running'))