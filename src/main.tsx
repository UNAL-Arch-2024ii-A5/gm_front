import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  gql,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

// 1️⃣ Define la URL del servidor GraphQL
const httpLink = createHttpLink({
  uri: 'http://d3uihmey15ol1d.cloudfront.net/api',
})

// 2️⃣ Middleware para incluir el token en cada request
const authLink = setContext((_, { headers }) => {
  // Obtiene el token del almacenamiento local o donde lo guardes
  const token = sessionStorage.getItem('token') // O sessionStorage, cookies, etc.

  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : '',
    },
  }
})

// La url la podríamos meter en variables de ambiente para la parte cloud (?)
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

window.__APOLLO_CLIENT__ = client
window.gql = gql

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </BrowserRouter>
  </StrictMode>,
)
