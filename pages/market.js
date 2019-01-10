import Layout from '../components/layout'
import Error from 'next/error'
import posts from '../data/posts'

export default ({url: {query: {id}}}) => (
  (posts[id]) ? (
    <Layout>
        <h1>{posts[id].title}</h1>
    </Layout>
  ) : (
    <Error statusCode={404}/>
  )
)