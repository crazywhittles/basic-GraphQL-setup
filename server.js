const express = require('express');

//graphQL LOL
const {graphqlHTTP} = require('express-graphql');
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull
} = require('graphql')
const app = express();

//would usually be in db
const books = [
    {id: 1, name: "book1", authorId: 1},
    {id: 2, name: "book2", authorId: 2},
    {id: 3, name: "book3", authorId: 3}
]

const authors = [
    {id: 1, name: "john"},
    {id: 2, name: "dave"}
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    description: 'This displays a book written by an author',
    fields: () => ({
        id: {type: GraphQLNonNull(GraphQLInt)},
        name: {type: GraphQLNonNull(GraphQLString)},
        authorId: {type: GraphQLNonNull(GraphQLInt)}
    })
})

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        books: {
            type: new GraphQLList(BookType),
            description: 'List of all books',
            resolve: () => books
        }
    })
})

const schema = new GraphQLSchema({
    query: RootQueryType
})

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));
app.listen(5000, 
    () => console.log('Server running on http://localhost:5000/graphql'));

