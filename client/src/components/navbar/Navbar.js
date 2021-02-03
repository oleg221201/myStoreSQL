import React from "react"
import {NavLink, useHistory} from "react-router-dom";
import {useAuth} from "../../hooks/auth.hook";
import {Nav, Navbar} from "react-bootstrap";


export const Menu = () => {
	const auth = useAuth()
	const history = useHistory()

	const logout = event => {
		event.preventDefault()
		auth.logout()
		sessionStorage.clear()
		history.push('/registration')
		window.location.reload(false)
	}

	const login_logout = () => {
		let data = localStorage.getItem("currentUser")
		data = JSON.parse(data)

		if (data && data.token){
			return (
				<div>
					<a
						style={{'color': 'inherit'}}
						href="/logout"
						onClick={logout}
					>Log Out</a>
				</div>
			)
		}
		else {
			return (
				<div>
					<NavLink
						to="/registration"
						style={{'marginRight': '20px'}}
					>Registration</NavLink>
					<NavLink to="/login">Log In</NavLink>
				</div>
			)
		}
	}


	return (
		<Navbar collapseOnSelect expand="lg" bg="light" variant="light">
			<Navbar.Brand href="/">
				Store
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="mr-auto">
					<Nav.Link href="/">Main</Nav.Link>
					<Nav.Link href="/cart">Cart</Nav.Link>
					<Nav.Link href="/profile">Profile</Nav.Link>
				</Nav>
				{login_logout()}
			</Navbar.Collapse>
		</Navbar>
	)
}