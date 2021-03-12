import ReactDOM from 'react-dom';
import App from './App';

import { ApolloProvider } from '@apollo/client';
import { AplClient as client } from './config/graphql';

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root'),
);
