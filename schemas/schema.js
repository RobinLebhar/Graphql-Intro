const graphql = require('graphql');
const _ = require('lodash');
const axios = require ("axios");

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema
} = graphql;

const CompanyType = new GraphQLObjectType({
    name:'Company',
    fields: {
        id: {type : GraphQLString},
        name: { type: GraphQLString },
    }
});

const UserType = new GraphQLObjectType({
    name:'User',
    fields: {
        id: {type : GraphQLString},
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt},
       company:{
           type:CompanyType,
           resolve(parentValue,args){
           return axios.get(`http://localhost:3000/companies/${parentValue.companyId}`).then( (response) => {
                return response.data;
            })
            
        }
       }
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
                return axios.get(`http://localhost:3000/users/${args.id}`).then( (response) => {
                    return response.data;
                })
            }
        },
        company:{
            type:CompanyType,
            args:{id:{type:GraphQLString}},
            resolve(parentValue,args){
                return axios.get(`http://localhost:3000/companies/${args.id}`).then( (response) => {
                    return response.data;
                })
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query:RootQuery
});
