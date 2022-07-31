import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect, useHistory, useParams } from 'react-router-dom';
import { deleteAnswerThunk } from '../../store/answers';
import './answers.css'

const Answer = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    const { id } = useParams();
    const sessionUser = useSelector((state) => state?.session.user)
    const answer = useSelector((state) => state?.answer[`${id}`])

    const deleteUserAnswer = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(deleteAnswerThunk(id))
        history.push(`/home`)
    }

    return (
        <div className='answer-delete-button'>
         {sessionUser.id === answer.userId ? (
		<div className='deletequestion-btn'>
		<h1>{answer.answer}</h1>
		<button onClick={(e) => deleteAnswerThunk(e)}>
			Delete Answer
		</button>
		</div>
		) : (
			<span>
				<h1>{answer.answer}</h1>
			</span>
		)}
        </div>
        )
}




export default Answer
