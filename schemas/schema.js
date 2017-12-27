const graphql = require('graphql');
const _ = require('lodash');
const axios = require ("axios");

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLSchema,
    GraphQLNonNull
} = graphql;



const UserType = new GraphQLObjectType({
    name:'User',
    fields: () => ({
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
    })
});

const CompanyType = new GraphQLObjectType({
    name:'Company',
    fields: () => ({
        id: {type : GraphQLString},
        name: { type: GraphQLString },
        users: {
            type: new GraphQLList(UserType),
            resolve(parentValue,args){
                return axios.get(`http://localhost:3000/companies/${parentValue.id}/users`).then( (response) => {
                     return response.data;
                 })
            }
        }
    })
});

const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields: {
        addUser:{
            type:UserType,
            args:{
                firstName:{type:new GraphQLNonNull(GraphQLString)},
                age:{type:new GraphQLNonNull(GraphQLInt)},
                companyId:{type:GraphQLString}
            },
            resolve(parentValue,args){
                return axios.post(`http://localhost:3000/users`,{firstName:args.firstName,age:args.age,companyId:args.companyId,}).then( (response) => {
                    return response.data;
                });
            }
        },
        deleteUser: {
            type: UserType,
            args: {
              id: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parentValue, args) {
                console.log(args.id);
              return axios.delete(`http://localhost:3000/users/${args.id}`).then( (response) => {
                   return response.data;
              });
              
            }
        }
        
    }
})

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
    query:RootQuery,
    mutation:Mutation
});
