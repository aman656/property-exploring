import Link from 'next/link'
import {Box,MenuButton,MenuIcon,MenuList,Flex,Spacer,IconButton, Menu,MenuItem} from '@chakra-ui/react'
import {FiKey} from 'react-icons/fi'
import {FcMenu,FcHome,FcAbout} from 'react-icons/fc'
import {BsSearch} from 'react-icons/bs'

const Navbar = ()=>{
    return(
        <Flex p="2" borderColor="gray.100" borderBottom="1px">
            <Box fontSize="3xl" color="black.400" fontWeight="bold">
                <Link href="/" paddingLeft="2">LUXURY</Link>
            </Box>
            <Spacer/>
            <Box>
                <Menu>
                    <MenuButton as={IconButton} icon={<FcMenu/>} variant="oulined" color="red.400"  />
                    <MenuList>
                        <Link href="/" passHref>
                        <MenuItem icon={<FcHome/>}>Home</MenuItem>
                        </Link>
                        <Link href="/search" passHref>
                        <MenuItem icon={<BsSearch/>}>Search</MenuItem>
                        </Link>
                        <Link href="/search?purpose=for-sale" passHref>
                        <MenuItem icon={<FcAbout/>}>For Sale</MenuItem>
                        </Link>
                        <Link href="/search?purpose=for-rent" passHref>
                        <MenuItem icon={<FiKey/>}>For Rent</MenuItem>
                        </Link>
                    </MenuList>
                </Menu>
            </Box>


        </Flex>
    )

}


export default Navbar