import Link from 'next/link'
import React from 'react'
import Btn from './btn'

export default () => (
    <div>
        <Link href="/" passHref><Btn>Index</Btn></Link>
        <Link href="/about" passHref><Btn>About</Btn></Link>
        <Link href="/second" passHref><Btn>Second</Btn></Link>
        <Link href="/sketch" passHref><Btn>Sketch</Btn></Link>
    </div>
)