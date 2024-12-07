import React from 'react'
import { Link } from 'react-router-dom'

interface Props {
    to: string;
    text: string
}

const NavItem = ({to, text}: Props) => {
  return (
    <Link to={to}>{text}</Link>
  )
}

export default NavItem