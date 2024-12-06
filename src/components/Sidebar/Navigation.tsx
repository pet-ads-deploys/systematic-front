import React from 'react'
import NavItem from './subComponents/NavItem';
interface Props {
    type: string
}

const Navigation = ({type}: Props) => {

    return type == 'Default' ? (
        <NavItem to='/newReview' />
    ) : (<>p</>)
}

export default Navigation;