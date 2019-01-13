import Layout from '../components/layout'
import {tickets} from '../data/dummy'
import { HorizontalGridLines, LineSeries, XAxis, XYPlot, YAxis } from 'react-vis'
import { Avatar, Row, Col, List } from 'antd'
import 'react-vis/dist/style.css'
import 'antd/dist/antd.css'

export default () => (
  <Layout>
    <Row type="flex" justify="center">
      <Col span={12}>
        <List
          itemLayout="horizontal"
          dataSource={tickets}
          renderItem={ticket => (
            <List.Item>
              <List.Item.Meta
                avatar={<a href={`/bookie?id=${ticket.uid}`}><Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /></a>}
                title={<a href={`/sport?id=${ticket.sid}`}>{ticket.sport}</a>}
                description={<a href={`/ticket?id=${ticket.id}`}>{ticket.description}</a>}
              />
            </List.Item>
          )}
        />
      </Col>
    </Row>
  </Layout>
)