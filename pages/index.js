import Layout from '../components/layout'
import currencies from '../data/currencies'
import Link from 'next/link'
import { HorizontalGridLines, LineSeries, XAxis, XYPlot, YAxis } from 'react-vis'
import { Avatar, Row, Col, List } from 'antd'
import 'react-vis/dist/style.css'
import 'antd/dist/antd.css'

export default () => (
  <Layout>
    <h1>juice</h1>
    <Row>
      <Col span={12}>
        <List
          itemLayout="horizontal"
          dataSource={currencies}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title={<a href={`/base/1`}>{item.title}</a>}
                description={item.description}
              />
            </List.Item>
          )}
        />
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