import Link from 'next/link'

const linkStyle = {
  marginRight: 15
}

const Header = () => (
    <div>
        <Link href="/">
          <a style={linkStyle}>Home</a>
        </Link>
        <Link href="/about">
          <a style={linkStyle}>About</a>
        </Link>
        <Link href="/socket">
          <a style={linkStyle}>Socket</a>
        </Link>
        <Link href="/sketch">
          <a style={linkStyle}>Sketch</a>
        </Link>
    </div>
)

export default Header