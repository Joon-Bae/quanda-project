import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { editQuestion } from '../../store/questions';
import { deleteQuestionThunk } from '../../store/questions';
import './questions.css'

const Question = () => {
	const dispatch = useDispatch();
    const history = useHistory()
    const { id } = useParams();
    const question = useSelector(state => state?.question[`${id}`])
	const sessionUser = useSelector((state) => state?.session.user)


const editUserQuestion = (e) => {
	e.preventDefault();
	e.stopPropagation();
	history.push(`/questions/${id}/edit`)
}

const deleteUserQuestion = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(deleteQuestionThunk(id))
    history.push(`/home`)

}

return (
	<div className='editform-container'>
		{sessionUser.id === question.userId ? (
		<div className='editdelete-btns'>
		<h1>{question.title}</h1>
		<p>{question.description}</p>
		<button onClick={(e)=> editUserQuestion(e)}>
			Edit Question</button>
		<button onClick={(e) => deleteUserQuestion(e)}>
			Delete Note
		</button>
		</div>
		) : (
			<span>
				<h1>{question.title}</h1>
				<p>{question.description}</p>
			</span>
		)}
	</div>
)

}

export default Question;