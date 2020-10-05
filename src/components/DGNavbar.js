import React from 'react';

import { Link } from 'react-router-dom';

import logo from '../images/logo.svg';

import { Navbar, Nav } from 'react-bootstrap';

import { userState } from '../store/atoms';
import { useRecoilState } from 'recoil';

export default function DGNavbar() {
	const [ user, setUser ] = useRecoilState(userState);

	const logout = () => {
		setUser({ id: null, username: null, token: null });
	};
	return (
		<Navbar style={{ backgroundColor: '#264653', fontSize: '1.8rem' }} variant="dark">
			<Link to={'/external'} style={{ display: 'flex', alignItems: 'center', marginLeft: '1rem' }}>
				<img
					src={logo}
					alt="martijnspitter.nl logo"
					className="cvlogo"
					style={{ width: '3rem', height: '3rem', marginRight: '1rem' }}
				/>
			</Link>
			<Navbar.Brand href="/documentation" style={{ color: '#E76F51', marginLeft: '1rem', fontSize: '1.5rem' }}>
				Digital Garden
			</Navbar.Brand>
			<Nav className="mr-auto" style={{ marginLeft: '1rem' }}>
				<Nav.Link href="/home">Home</Nav.Link>
			</Nav>
			<Nav className="ml-auto">
				{user.username && <Nav.Link href="/newpost">New Post</Nav.Link>}
				{user.username && <Nav.Link href="/newtag">New Tag</Nav.Link>}
				{user.username && (
					<Nav.Link href="/home" onClick={logout}>
						Logout
					</Nav.Link>
				)}
			</Nav>
		</Navbar>
	);
}
