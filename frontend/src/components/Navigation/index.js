import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <NavLink className='signUpBtn' to="/signup">Sign Up</NavLink>
        <LoginFormModal />
      </>
    );
  }

  return (
    <div className="navigationBar">
      <div className="navigationLinks">
        <NavLink className="homeLink" exact to="/">
          <div className="logo">Qu&a</div>
        </NavLink>
      {isLoaded && sessionLinks}
      </div>
  </div>
  )
}

export default Navigation;
