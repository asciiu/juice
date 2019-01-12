import Layout from '../components/layout'
import currencies from '../data/currencies'
import Link from 'next/link'
import { HorizontalGridLines, LineSeries, XAxis, XYPlot, YAxis } from 'react-vis'
import { Row, Col } from 'antd'
import 'react-vis/dist/style.css'
import 'antd/dist/antd.css'

export default () => (
  <Layout>
    <h1>juice</h1>
    <Row>
      <Col span={12}>
        <ul>
          {currencies.map((currency, index) => (
            <li key={index}>
              <Link as={`/currency/${index}`} href={{pathname: '/base', query: {id: index}}}>
                <a>{currency.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </Col>
      <Col span={12}>
        <XYPlot width={300} height={300}>
          <HorizontalGridLines/>
          <LineSeries
              data={[
                  {x: 1, y: 10},
                  {x: 2, y: 5},
                  {x: 3, y: 15}
              ]}/>
          <XAxis/>
          <YAxis/>
        </XYPlot>
      </Col>
    </Row>
  </Layout>
)