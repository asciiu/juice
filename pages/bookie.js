import Layout from '../components/layout'
import Error from 'next/error'
import {bookies} from '../data/dummy'

export default ({url: {query: {id}}}) => (
  (bookies[id]) ? (
    <Layout>
        {`bookie: `}
        <h1>{bookies[id].username}</h1>
    </Layout>
  ) : (
    <Error statusCode={404}/>
  )
)