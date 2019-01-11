import Layout from '../components/layout'
import Error from 'next/error'
import currencies from '../data/currencies'

export default ({url: {query: {id}}}) => (
  (currencies[id]) ? (
    <Layout>
        <h1>{currencies[id].title}</h1>
    </Layout>
  ) : (
    <Error statusCode={404}/>
  )
)