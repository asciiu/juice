import Layout from '../components/layout'
import posts from '../data/posts'
import Link from 'next/link'

export default () => (
  <Layout>
    <h1>ANEX</h1>
    <ul>
      {posts.map((post, index) => (
        <li key={index}>
          <Link href={{pathname: '/second', query: {id: index}}}>
            <a>{post.title}</a>
          </Link>
        </li>
      ))}
    </ul>
  </Layout>
)