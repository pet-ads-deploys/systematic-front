import { Box, Icon } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { ImExit } from 'react-icons/im'
import Style from './LogouButton.module.css'
import useLogout from '../../../hooks/logout/useLogout'

const LogoutButton = () => {
    const logout = useLogout();

    return (
        <Box display='flex' w='120px' className={Style.linkBox}>
            <Icon boxSize='21px' mr='7px' as={ImExit} color='#c9d9e5'/>
            <Link 
            className={Style.link} 
            onClick={logout}
            to='/'>Logout</Link>
        </Box>
    )
}

export default LogoutButton