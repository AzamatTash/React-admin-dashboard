import { useState } from 'react';
import { Menu, Sidebar, MenuItem, useProSidebar } from 'react-pro-sidebar';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { tokens } from '../../theme';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import StudentsOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import TeachersOutlinedIcon from '@mui/icons-material/Person2Outlined';
import MessageOutlinedIcon from '@mui/icons-material/MailOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const Item = ({ title, to, icon, selected, setSelected, toggleSidebar }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const handleItem = () => {
		toggleSidebar();
		setSelected(title);
	};

	return (
		<MenuItem
			active={selected === title}
			style={{
				color: colors.grey[100],
			}}
			onClick={handleItem}
			icon={icon}
			component={<Link to={to} />}
		>
			<Typography>{title}</Typography>
		</MenuItem>
	);
};

const MySidebar = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const { collapseSidebar, toggleSidebar, collapsed, broken } = useProSidebar();
	let { pathname } = useLocation();
	const pathList = {
		'/': 'Главная',
		'/schedule': 'Расписание',
		'/teachers': 'Педагоги',
		'/students': 'Ученики',
		'/message': 'Связь',
		'/settings': 'Настройки',
	};
	const [selected, setSelected] = useState(pathList[pathname]);

	return (
		<Box
			sx={{
				position: 'sticky',
				display: 'flex',
				height: '100vh',
				top: 0,
				bottom: 0,
				zIndex: 10000,
				'& .ps-sidebar-root': {
					border: 'none',
				},
				'& .ps-menu-button:hover': {
					color: `${colors.blueAccent[500]} !important`,
					backgroundColor: 'transparent !important',
				},
				'& .ps-active': {
					color: `${colors.greenAccent[500]} !important`,
					backgroundColor: 'transparent !important',
				},
			}}
		>
			<Sidebar breakPoint='md' backgroundColor={colors.primary[400]} rootStyles={{}}>
				<Menu iconshape='square'>
					<MenuItem
						icon={
							collapsed ? (
								<MenuOutlinedIcon onClick={() => collapseSidebar()} />
							) : undefined
						}
						style={{
							margin: '10px 0 20px 0',
							color: colors.grey[100],
						}}
					>
						{!collapsed && (
							<Box
								display='flex'
								justifyContent='space-between'
								alignItems='center'
								ml='15px'
							>
								<Typography variant='h3' color={colors.grey[100]}>
									SolomonPlus
								</Typography>
								<IconButton
									onClick={
										broken ? () => toggleSidebar() : () => collapseSidebar()
									}
								>
									<CloseOutlinedIcon />
								</IconButton>
							</Box>
						)}
					</MenuItem>
					{!collapsed && (
						<Box mb='25px'>
							<Box
								display='flex'
								justifyContent='center'
								alignItems='center'
								sx={{
									'& .avater-image': {
										backgroundColor: colors.primary[700],
										objectFit: 'cover',
									},
								}}
							>
								<img
									className='avater-image'
									alt='profile user'
									width='100px'
									height='100px'
									src={
										'https://img.freepik.com/free-photo/portrait-of-handsome-young-man-with-' +
										'crossed-arms_176420-15569.jpg?w=1060&t=st=1676307525~exp=1676308125~hmac=1' +
										'a81ec9f6bcb50b1806500b6cce6abd951b68639a75380ad7fbce870abf14dc6'
									}
									style={{ cursor: 'pointer', borderRadius: '50%' }}
								/>
							</Box>
							<Box textAlign='center'>
								<Typography
									variant='h3'
									color={colors.grey[100]}
									fontWeight='bold'
									sx={{ m: '10px 0 0 0' }}
								>
									Петр Ян
								</Typography>
							</Box>
						</Box>
					)}
					<Box paddingLeft={collapsed ? undefined : '10%'}>
						<Item
							title='Главная'
							to='/'
							icon={<HomeOutlinedIcon />}
							selected={selected}
							setSelected={setSelected}
							toggleSidebar={toggleSidebar}
						/>
						<Item
							title='Расписание'
							to='/schedule'
							icon={<CalendarMonthOutlinedIcon />}
							selected={selected}
							setSelected={setSelected}
							toggleSidebar={toggleSidebar}
						/>
						<Item
							title='Педагоги'
							to='/teachers'
							icon={<TeachersOutlinedIcon />}
							selected={selected}
							setSelected={setSelected}
							toggleSidebar={toggleSidebar}
						/>
						<Item
							title='Ученики'
							to='/students'
							icon={<StudentsOutlinedIcon />}
							selected={selected}
							setSelected={setSelected}
							toggleSidebar={toggleSidebar}
						/>
						<Item
							title='Связь'
							to='/message'
							icon={<MessageOutlinedIcon />}
							selected={selected}
							setSelected={setSelected}
							toggleSidebar={toggleSidebar}
						/>
						<Item
							title='Настройки'
							to='/settings'
							icon={<SettingsOutlinedIcon />}
							selected={selected}
							setSelected={setSelected}
							toggleSidebar={toggleSidebar}
						/>
					</Box>
				</Menu>
			</Sidebar>
		</Box>
	);
};

export default MySidebar;
