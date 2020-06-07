import { GraphQLServer } from 'graphql-yoga'

const typeDefs = `
    type Query {
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