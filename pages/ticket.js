import Layout from '../components/layout'
import Error from 'next/error'
import {tickets} from '../data/dummy'

export default ({url: {query: {id}}}) => (
  (tickets[id]) ? (
    <Layout>
        <h1>{tickets[id].description}</h1>
    </Layout>
  ) : (
    <Error statusCode={404}/>
  )
)