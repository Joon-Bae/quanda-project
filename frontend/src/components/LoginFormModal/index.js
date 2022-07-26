import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import * as sessionActions from '../../store/session'
import './LoginForm.css'
import { Redirect, useHistory } from 'react-router-dom';

function LoginFormModal() {

  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.session?.user);
  const [showModal, setShowModal] = useState(false);
  const [credential, setCredential] = useState('')
  const [password, setPassword] = useState('')

  if (user) {
    return <Redirect to="/home" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setErrors([]);
    setCredential('FakeUser1')
    setPassword('password2')
    dispatch(sessionActions.login({ credential:'FakeUser1', password:'password2' }))
  };

  return (
    <>
    <button  className='main-login-button' onClick={() => setShowModal(true)}>
      <img className='hamburger-menu' src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1024px-Hamburger_icon.svg.png'></img>
      </button>
    {showModal && (
      <Modal onClose={() => setShowModal(false)}>
        <LoginForm />
        <div id='demo-login-modal'>
        
        <button type='submit' className='demo-login-button' onClick={(e) => handleSubmit(e)}>Log In As Demo User</button>
        </div>
      </Modal>
    )}
  </>
  );
}

export default LoginFormModal;
