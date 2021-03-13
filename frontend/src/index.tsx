import ReactDOM from 'react-dom';
import App from './App';

import { ApolloProvider } from '@apollo/client';
import { AplClient as client } from './config/graphql';

import 'antd/dist/antd.less';

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root'),
);
