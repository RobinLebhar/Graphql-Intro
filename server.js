const express = require('express');
const expressGraphQL = require('express-graphql');
const userSchema = require('./schemas/schema')
const server = express();

server.use('/graphql',expressGraphQL({
  schema:userSchema,
  graphiql:true
}));

server.listen(4000,() => {
  console.log('Serveur en écoute sur le port 4000');
});
