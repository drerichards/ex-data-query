import { GraphQLServer } from 'graphql-yoga'

const users = [
    {
        id: '1',
        name: 'Andre',
        email: 'Andre@email.com',
        age: 32
    },
    {
        id: '2',
        name: 'Mark',
        email: 'Mark@email.com',
        age: 36
    },
    {
        id: '3',
        name: 'Rich',
        email: 'Rich@email.com',
        age: 34
    },
]

const posts = [
    {
        id: '001',
        title: '1 Title',
        body: 'Content...',
        published: true
    },
    {
        id: '002',
        title: '2 Title',
        body: 'Content...',
        published: false
    },
    {
        id: '003',
        title: '3 Title',
        body: 'Content...',
        published: true
    },
]


const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        me: User!
        post: Post!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
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
                return post.title.toLowerCase().includes(args.query.toLowerCase())
            })
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
    }
}

const server = new GraphQLServer({
    typeDefs, resolvers
})

server.start(() => console.log('Server Running'))