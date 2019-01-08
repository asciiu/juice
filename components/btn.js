import React from 'react'
import {withRouter} from 'next/router'

const Btn = ({href, onClick, children, router}) => (
    <span>
        <button onClick={onClick} 
                style={{fontWeight : router.pathname == href ? 'bold' : ''}}>
                {children}
        </button>
    </span>
)

export default withRouter(Btn)
