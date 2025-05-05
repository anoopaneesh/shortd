import { Avatar, Box, Heading, Icon, Image, Text } from '@chakra-ui/react'
import logo from '../assets/logo.svg'
import { useAppData } from '@/context/AppContext'
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from './ui/menu'
import { MdLogout } from "react-icons/md";
import { useNavigate } from 'react-router';
import { ROUTES } from '@/common/constant';

const Navbar = () => {
    const { user,signOut } = useAppData()
    const navigate = useNavigate()
    const goToDashboard = () => {
        navigate(ROUTES.Dashboard)
    }
    return (
        <Box className='flex items-center justify-between w-full h-16 shadow-lg' paddingX={20} paddingY={8}>
            <div className='flex gap-2 items-center select-none' onClick={() => goToDashboard()}>
                <Image src={logo} aspectRatio={1 / 1} width={8} alt='Logo' />
                <Heading size="2xl">Shortd</Heading>
            </div>
            <div className='flex items-center gap-16'>
                <Text fontSize={18}>{`Credits left : ${user?.credits}`}</Text>
                <MenuRoot>
                    <MenuTrigger>
                        <Avatar.Root size="md" variant="solid" colorPalette={pickPalette(user?.email || "S")}>
                            <Avatar.Fallback name={user?.email} />
                            {/* <Avatar.Image src="https://bit.ly/sage-adebayo" /> */}
                        </Avatar.Root>
                    </MenuTrigger>
                    <MenuContent>
                        <MenuItem value="Sign out">
                            <div className='flex gap-2 items-center' onClick={() => signOut()}>
                                <MdLogout />
                                <Text fontSize={18}>Sign out</Text>
                            </div>
                        </MenuItem>
                    </MenuContent>
                </MenuRoot>

            </div>
        </Box>
    )
}

const colorPalette = ["red", "blue", "green", "yellow", "purple", "orange"]

const pickPalette = (name: string) => {
    const index = name.charCodeAt(0) % colorPalette.length
    return colorPalette[index]
}

export default Navbar
