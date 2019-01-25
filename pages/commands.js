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
            <p>Politeness and courtesy is a rarity these days. Do your best to be nice. 
            Don't post negative comments.</p>
            <p>Your profile score will be determined by the community. Therefore,
            it is advisble that you be polite and respectful.</p>
          </div>
          <div>
            <h1>2nd Commandment</h1>
            <p>Be responsible. Don't bet more than you can afford to loose, 
              and don't take things personally.</p>
          </div>
          <div>
            <h1>3rd Commandment</h1>
            <p>Fraudsters will not be tolerated. Simlarly, it is your responsbility to
            read the terms of someone else's wager and fully understand what the terms
            of a bet are before you agree to take the bet. 
            </p>
          </div>
          <div>
            <h1>4th Commandment</h1>
            <p>Grade your bets with morality.</p>
            <p>You are liable to grade your own bet. 
            If your intentions are to decieve your opponent by grading your bet 
            incorrectly and your opponent grades against you, both of you will loose.
            The wagered amount will be donated to charity. As such, it is in your best 
            interest to come to a consensus on outcome.</p>
            <p>If you are unsure of what to do, communicate with the person that you 
            entered the bet with. If you've made a mistake when grading
            your own bet, it is your responsibility to reach out to support and the other
            player immediately.</p>
          </div>
          <div>
            <h1>5th Commandment</h1>
            <p>Thou shall not spam.</p>
            <p>You're welcome to send a private message to another person in regard to 
            your own business, but you must refrain from spamming the community on 
            public channels. Public channels are NOT to be used for advertising purposes.</p>
          </div>
        </Carousel>
      </Col>
    </Row>
  </Layout>
  </span>
)