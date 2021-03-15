const graphql = require("graphql");
const { GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLList } = graphql;

const userData = require("../json/MOCK_DATA.json");
const rocketData = require("../json/Rocket.json");

const UserType = require("./TypeDefs/UserType");
const RocketType = require('./TypeDefs/RocketType');


const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllUsers: {
      type: new GraphQLList(UserType),
      args: { id: { type: GraphQLInt } },
      resolve(parent, args) {
        return userData;
      },
    },
    getAllRockets: {
      type: new GraphQLList(RocketType),
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return rocketData;
      },
    },
    getRocket: {
      type: new GraphQLList(RocketType),
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return (rocketData.filter(res => res.id = args))
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: {
      type: UserType,
      args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parent, args) {
        userData.push({
          id: userData.length + 1,
          firstName: args.firstName,
          lastName: args.lastName,
          email: args.email,
          password: args.password,
        });
        return args;
      },
    },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
