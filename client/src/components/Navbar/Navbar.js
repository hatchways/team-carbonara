import React from 'react';
import { Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import useStylesNavbar from './stylesNavbar';

function Navbar() {
  const classes = useStylesNavbar();
  return (
    <header className={classes.navbar}>
      <h1>
        <span>calend</span>app
      </h1>
      <div>
        <nav>
          <Link className={classes.link} to="/dashboard">
            Home
          </Link>
          <Link className={classes.link} to="/integration">
            Integration
          </Link>
          <Link className={classes.link} to="/upgrade">
            Upgrade
          </Link>
        </nav>
        <div className={classes.profile}>
          <Avatar src="https://lh3.googleusercontent.com/-1f-lik6wjVI/AAAAAAAAAAI/AAAAAAAAAAA/AAKWJJMYmqRdLc1CHHPO_sJXKNQk8g7IXA/s96-c/photo.jpg" />
          <span>Raymond Lo</span>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
