import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center gap-2" href="#">
          <i className="bi bi-people-fill text-primary fs-4"></i>
          <span>Employee Directory</span>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
