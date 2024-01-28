import React from 'react'
import App from './App'
import {ApolloClient,InMemoryCache,createHttpLink,ApolloProvider} from '@apollo/client';


const httpLink = createHttpLink({
    // uri: 'https://spacefit-server-replit.herokuapp.com/graphql'
    // uri: 'https://enl2byybqrqyvm9.m.pipedream.net'
    uri: 'https://94897727-4608-4d6f-b9fc-bd012d0a7023-00-1zugykz0p5v91.kirk.replit.dev/graphql'
   
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
