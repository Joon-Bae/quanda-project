import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { editQuestion } from '../../store/questions';
import './questions.css'

const Question = () => {
	const dispatch = useDispatch();
    const history = useHistory()
    const { id } = useParams();
    const question = useSelector(state => state?.question[`${id}`])

const editUserQuestion = (e) => {
	e.preventDefault();
	e.stopPropagation();
	history.push(`/questions/${id}/edit`)
		// console.log("HELLO)))))))")
		// dispatch(editNote(id))
		// .then(()=>{
		//     history.push('/')
		// })
}

return (
	<div>
		<h1>{question.title}</h1>
		<p>{question.description}</p>
		<button onClick={(e)=> editUserQuestion(e)}>
			Edit Question</button>
		{/* <button onClick={(e) => deleteUserNote(e)}>
			Delete Note */}
		{/* </button> */}
	</div>
)

}

export default Question;
