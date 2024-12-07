import NavItem from './subComponents/NavItem';
import { Box, Flex } from '@chakra-ui/react';
import Styles from './Sidebar.module.css'
import LogoutButton from './buttons/LogoutButton';

interface Props {
    type: string
}

const Navigation = ({type}: Props) => {

    return type == 'Default' ? (
        <Flex direction='column' justifyContent='space-between' height='100%'>
            <Box className={Styles.navDiv} >
                <NavItem to='/newReview' text='New Review' />
                <NavItem to='/user' text='My Reviews' />
                <LogoutButton />
            </Box>

            <Box>
                
            </Box>
        </Flex>
    ) : (<>p</>)
}

export default Navigation;