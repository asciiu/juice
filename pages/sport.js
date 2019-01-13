import Layout from '../components/layout'
import Error from 'next/error'
import {sports} from '../data/dummy'

export default ({url: {query: {id}}}) => (
  (sports[id]) ? (
    <Layout>
        <h1>{sports[id].title}</h1>
    </Layout>
  ) : (
    <Error statusCode={404}/>
  )
)