const express = require('express')
const graphqlExpress = require('express-graphql')
const server = express()

server.use('graphql',graphqlExpress({
  graphiql:true
}))

server.listen(4000,() => {
  console.log('Serveur en écoute sur le port 4000');
})
