import React from 'react'
import { Link } from 'react-router-dom'

interface Props {
    to: string;
}

const NavItem = ({to}: Props) => {
  return (
    <Link to={to}>New review</Link>
  )
}

export default NavItem