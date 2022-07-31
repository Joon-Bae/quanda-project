import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './splashpage.css'

function SplashPage () {
    const history = useHistory();
    const user = useSelector((state) => state.session.user)
    if (user) {
        history.push('/home')
    }
    return (
        <div className='splashPage'>
            <h1 className='splashWelcome'>It is <span className='homelogo'>Qu&A</span> time!</h1>
            <h2 className='homephrases'>
                "Who questions much, shall learn much, and retain much" - Francis Bacon
                <br />
                <br />
                We all have burning questions begging to be answered.
                <br/>
                What better way to get answers than from users all over the world!
            </h2>
            <div className='relevantImages'>
                <img
                    className='relevantImage1'
                    src="https://singularityhub.com/wp-content/uploads/2017/02/best-innovators-most-beautiful-questions-2-1068x601.jpg"
                />
            </div>
        </div>
    )
}

export default SplashPage
