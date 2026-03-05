import styles from "../index";
import { navLinks } from "../constants";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdMenuOpen } from "react-icons/md";
import { useState } from "react";
import { Drawer } from "antd";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [nav, setNav] = useState(false);

  return (
    <Navbar bg="light" expand="lg" className="py-3 shadow-sm mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-4">
          Rent a Ride
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            {navLinks.map((navlink, index) => (
              <Nav.Link as={Link} key={index} to={navlink.path} className="fw-semibold px-3 text-dark">
                {navlink.title}
              </Nav.Link>
            ))}
          </Nav>
          <Nav className="d-flex align-items-center gap-2">
            {currentUser && !currentUser.isAdmin && !currentUser.isVendor ? (
              <Nav.Link as={Link} to="/profile" className="p-0">
                <img
                  src={`${currentUser.profilePicture}`}
                  alt="profile"
                  referrerPolicy="no-referrer"
                  className="rounded-circle object-cover"
                  style={{ width: "40px", height: "40px" }}
                />
              </Nav.Link>
            ) : (
              <>
                <Button variant="outline-success" as={Link} to="/signIn" className="fw-semibold">
                  Sign In
                </Button>
                <Button variant="success" as={Link} to="/signup" className="fw-semibold">
                  Sign Up
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
