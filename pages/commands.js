import { Row, Col, Carousel } from 'antd';
import Layout from '../components/layout'
import "./commands.less"

function onChange(a, b, c) {
  console.log(a, b, c);
}

const hintStyle = { color: 'rgba(0,0,0,.3)' }

// quotes from https://www.goodreads.com/author/quotes/73092.Meister_Eckhart?page=2
export default () => (
  <span>
  <Layout>
    <Row>
      <Col span={4} offset={2} style={hintStyle}>
        <p>“A good neighbor is a very desireable thing.”</p> 
        <p>- Thomas Jefferson</p>
      </Col>
      <Col span={8} offset={2}>
        <Carousel>
          <div>
            <h1>1st Commandment</h1>
            <p>Be good to each other. Respect one another. There is virtue in humility. 
            Thrive to show good sportsmanship at all times no matter the 
            circustances. Don't be a sore looser.</p> 
            <p>Your profile score will be determined by the people that you bet with. Therefore,
            it is advisble that you be polite and respectful.</p>
          </div>
          <div>
            <h1>2nd Commandment</h1>
            <p>Be responsible. Don't bet more than you can afford to loose.</p>
          </div>
          <div>
            <h1>3rd Commandment</h1>
            <p>Fraudsters will not be tolerated. Simlarly, it is your responsbility to
            read the terms of someone else's wager and fully understand what the terms
            of a bet are before you agree to take the bet. 
            </p>
          </div>
        </Carousel>
      </Col>
    </Row>
  </Layout>
  </span>
)