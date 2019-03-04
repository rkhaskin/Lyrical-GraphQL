import React from 'react';
import ReactDOM from 'react-dom';
// interracts with gql server on the backend. Makes a request for data and stores the data locally when the 
// response comes back.
import ApolloClient from 'apollo-client';
// integration layer between react and apollo store. will take data from the store and inject into react app
import {ApolloProvider} from 'react-apollo';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';

import App from './components/App';
import SongList from './components/SongList'
import SongCreate from './components/SongCreate';

// apollo store
const client = new ApolloClient({});

const Root = () => {
    // apolloProvider is a react component. We are passing a reference to the apollo store to it.
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={SongList} />
          <Route path="/songs/new" component={SongCreate} />
       </Route>
  
      </Router>
    </ApolloProvider>
  )
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
