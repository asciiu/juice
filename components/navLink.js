import React from 'react'
import {withRouter} from 'next/router'

const NavLink = ({ children, router, href }) => {
  const style = {
    marginRight: 10,
    color: router.pathname === href? 'red' : 'white'
  }

  const handleClick = (e) => {
    e.preventDefault()
    router.push(href)
  }

  return (
    <a href={href} onClick={handleClick} style={style}>
      {children}
    </a>
  )
}

export default withRouter(NavLink)
