const graphql = require('graphql');
const _ = require('lodash');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema
} = graphql;

const users = [
    {id:'1' ,firstName:'Robin',age:24},
    {id:'2',firstName:'Catherine',age:25}
];
const UserType = new GraphQLObjectType({
    name:'User',
    fields: {
        id: {type : GraphQLString},
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt}
    }
});
// Permet a graphql d'entrer dans le graph de notre application
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        user:{
            type:UserType,
            args:{id:{type:GraphQLString}},
            //  Ici on va récuperer les données avec les parametres en entrée
            resolve(parentValue,args){
             return _.find(users,{id:args.id});
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query:RootQuery
});

