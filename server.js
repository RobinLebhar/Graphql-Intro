const express = require('express');
const expressGraphQL = require('express-graphql');
const server = express();

server.use('/salutGraphQL',expressGraphQL({
  graphiql:true
}));

server.listen(4000,() => {
  console.log('Serveur en écoute sur le port 3500');
});
