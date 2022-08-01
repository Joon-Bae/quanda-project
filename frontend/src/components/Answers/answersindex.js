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
    const userId = useSelector((state) => state?.session?.user?.id)

    const deleteUserAnswer = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(deleteAnswerThunk(id))
        history.push(`/home`)
    }

    return (
        <div className='delete-page'>
        <div className='delete-page-container'>
         {sessionUser.id === answer.userId ? (
		<div>
		<h1 className='answer-show'>Do you want to delete this answer?</h1>
		<button className='deleteanswer-btn' onClick={(e) => deleteUserAnswer(e)}>
			Delete Answer
		</button>
		</div>
		) : (
			<span>
				<h1 className='nodelete-answer'>{answer.answer}</h1>
			</span>
		)}
        </div>
        </div>
        

    )
}




export default Answer
