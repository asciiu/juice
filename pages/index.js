import Layout from '../components/layout'
import {tickets} from '../data/dummy'
import { HorizontalGridLines, LineSeries, XAxis, XYPlot, YAxis } from 'react-vis'
import { Avatar, Row, Col, List } from 'antd'
import 'react-vis/dist/style.css'
import 'antd/dist/antd.css'

export default () => (
  <Layout>
    <Row>
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