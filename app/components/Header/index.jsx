import React from 'react'
import './style.less'

const Header = ({ user }) => (
    <div className="user_header">
        <p>Hello <span>{user.username}</span></p>
    </div>
)

export default Header