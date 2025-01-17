import React from "react";
import {
	Button,
	Container,
	Form,
	Nav,
	Navbar,
	NavDropdown,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";

const OurNavbar = () => {
	return (
		<Navbar
			expand="lg"
			bg="primary"
			data-bs-theme="dark">
			<Container fluid>
				<Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
				<Navbar.Toggle aria-controls="navbarScroll" />
				<Navbar.Collapse id="navbarScroll">
					<Nav
						className="me-auto my-2 my-lg-0"
						style={{ maxHeight: "100px" }}
						navbarScroll>
						<Nav.Link
							as={NavLink}
							to={"/"}>
							Home
						</Nav.Link>
						<Nav.Link
							as={NavLink}
							to={"/book/list"}>
							Add Listing
						</Nav.Link>
						<NavDropdown
							title="Link"
							id="navbarScrollingDropdown">
							<NavDropdown.Item href="#action3">Action</NavDropdown.Item>
							<NavDropdown.Item href="#action4">
								Another action
							</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href="#action5">
								Something else here
							</NavDropdown.Item>
						</NavDropdown>
						<Nav.Link
							as={NavLink}
							to={"/book/orders"}>
							Orders
						</Nav.Link>
					</Nav>
					<Form className="d-flex">
						<Form.Control
							type="search"
							placeholder="Search"
							className="me-2"
							aria-label="Search"
						/>
						<Button variant="outline-success">Search</Button>
					</Form>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default OurNavbar;
