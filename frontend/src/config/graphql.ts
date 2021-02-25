import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

const link = createHttpLink({
    uri: '/graphql',
    credentials: 'same-origin',
});

export const AplClient: any = new ApolloClient({
    link,
    cache: new InMemoryCache(),
});
