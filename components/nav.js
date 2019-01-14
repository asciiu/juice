import Link from 'next/link'
import React from 'react'
import Btn from './btn'
import './nav.css'

export default () => (
  <nav>
    <Link href="/" passHref><Btn>yuice</Btn></Link>
    <Link href="/about" passHref><Btn>about</Btn></Link>
    <Link href="/add" passHref><Btn>add</Btn></Link>
    <Link href="/sketch" passHref><Btn>play!</Btn></Link>
  </nav>
)