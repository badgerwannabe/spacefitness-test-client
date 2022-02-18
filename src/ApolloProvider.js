import React from 'react'
import App from './App'
import {ApolloClient,InMemoryCache,createHttpLink,ApolloProvider} from '@apollo/client';


const httpLink = createHttpLink({
    uri: 'https://spacefit-server-replit.herokuapp.com/graphql'
    // uri: 'https://enl2byybqrqyvm9.m.pipedream.net'
   
})

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
  });

  export default (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );