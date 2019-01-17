import Layout from '../components/layout'
import {tickets} from '../data/dummy'
import { Avatar, Row, Col, List } from 'antd'

export default () => (
  <Layout>
    <Row type="flex">
      <Col span={8} offset={2}>
        <List
          itemLayout="horizontal"
          dataSource={tickets}
          renderItem={ticket => (
            <List.Item>
              <List.Item.Meta
                //avatar={<a href={`/bookie?id=${ticket.uid}`}><Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /></a>}
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