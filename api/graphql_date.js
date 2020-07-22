const { Kind } = require('graphql/language');
const { GraphQLScalarType } = require('graphql');

const GraphQLDate = new GraphQLScalarType({
  name: 'GraphQLDate',
  description: 'A Date type in GraphQL as custom scalar',
  serialize(value) {
    return value.toISOString();
  },
  parseValue(value) {
    const dateValue = new Date(value);
    return Number.isNaN(dateValue) ? undefined : dateValue;
  },
  parseLiteral(ast) {
    console.log('Literal');
    const value = new Date(ast.value);
    return (ast.kind === Kind.STRING && !Number.isNaN(value)) ? value : undefined;
  },
});

module.exports = GraphQLDate;
