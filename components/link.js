import React from 'react'
import {withRouter} from 'next/router'

const Link = ({ children, router, href }) => {
  const handleClick = (e) => {
    e.preventDefault()
    router.push(href)
  }

  return (
    <a href={href} onClick={handleClick} >
      {children}
    </a>
  )
}

export default withRouter(Link)
