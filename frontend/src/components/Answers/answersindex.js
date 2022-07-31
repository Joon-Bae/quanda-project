import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect, useHistory, useParams } from 'react-router-dom';
import { deleteAnswerThunk } from '../../store/answers';
import './answers.css'

const Answer = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    const { id } = useParams();

    const deleteUserAnswer = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(deleteAnswerThunk(id))
        history.push(`/home`)
    }

    return (
        <div className='answer-delete-button'>
            <h2> Would you like to delete this answer?</h2>
            <button onClick={(e) => deleteUserAnswer(e)}>
                Delete Answer
            </button>
        </div>
        )
}




export default Answer
