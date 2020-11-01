import React, { useState } from "react";
import { Navbar, NavbarToggler} from "reactstrap";
import { Link } from "react-router-dom";

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <Link to="/" className="navbar-brand">
          Book The Show
        </Link>
        <NavbarToggler onClick={toggle} />
      </Navbar>
    </div>
  );
};

export default Header;
