const { buildASTSchema } = require('graphql');
const gql = require('graphql-tag');

const schema = buildASTSchema(gql`
  type Task {
    _id: ID!
    todo_name: String!
    todo_summary: String
    todo_priority: String!
    todo_filename: String
    todo_completed: Boolean!
    todo_owner: String!
  }

  input TaskInput {
    owner: String!
    name: String!
    summary: String
    priority: String!
    filename: String
    completed: Boolean!
  }

  type Query {
    getTasks(user: String!): [Task]!
  }

  type Mutation {
    createCard(input: TaskInput): Task!
    updateCard(id: String!, input: TaskInput): Boolean
    removeCard(id: String!): Boolean
  }
`);

module.exports = { schema: schema };