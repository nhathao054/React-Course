import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const account = useSelector((state) => state.user.account);
  const isAuthenticate = useSelector((state) => state.user.isAuthenticate);

  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <NavLink to="/" className="navbar-brand">
          Haven-Quiz
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
            <NavLink to="/admins" className="nav-link">
              Admin
            </NavLink>
            <NavLink to="/users" className="nav-link">
              User
            </NavLink>
            {/* <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/admins">Admin</Nav.Link>
            <Nav.Link href="/users">User</Nav.Link> */}
          </Nav>
          <Nav>
            {isAuthenticate === false ? (
              <>
                <button className="btn-login" onClick={() => handleLogin()}>
                  Log in
                </button>
                <button className="btn-signin">Sign in</button>{" "}
              </>
            ) : (
              <NavDropdown title="Setting" id="basic-nav-dropdown">
                <NavDropdown.Item>Log in</NavDropdown.Item>
                <NavDropdown.Item>Log out</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>Profile</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
