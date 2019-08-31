import React from 'react';
import logo from './logo.svg';
import Amplify from "aws-amplify";
import awsconfig from './aws-exports';

import Employees from './components/Employees'
import './App.css';

Amplify.configure({
  ...awsconfig,
  aws_appsync_graphqlEndpoint: 'http://localhost:3002/graphql',
  aws_appsync_region: 'us-west-2',
  aws_appsync_authenticationType: 'API_KEY',
  aws_appsync_apiKey: 'da2-xxxxxxxxxxxxxxxxxxxxxxxxxx',
})

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Employees />
      </header>
    </div>
  );
}

export default App;
