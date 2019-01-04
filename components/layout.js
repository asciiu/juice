import Header from './header'

const layoutStyle = {
  margin: 20,
  padding: 20,
  height: '1024px',
  border: '1px solid #DDD'
}

const Layout = (props) => (
  <div style={layoutStyle}>
    <Header />
    {props.children}
  </div>
)

export default Layout