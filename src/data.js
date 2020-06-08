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
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        published: true,
        author: '1'
    },
    {
        id: '002',
        title: '2 Title',
        body: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        published: false,
        author: '2'
    },
    {
        id: '003',
        title: '3 Title',
        body: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        published: true,
        author: '3'
    },
]

const comments = [
    {
        id: '2201',
        text: 'Lincididunt ut labore.',
        author: '3',
        post: '001'
    },
    {
        id: '2202',
        text: 'Ut enex ea commodo consequat.',
        author: '1',
        post: '001'
    },
    {
        id: '2203',
        text: 'Dufu giat nulla pariatur.',
        author: '2',
        post: '002'
    },
    {
        id: '2204',
        text: 'Du et dolore magna aliqua.',
        author: '3',
        post: '003'
    }
]

export { users, posts, comments }