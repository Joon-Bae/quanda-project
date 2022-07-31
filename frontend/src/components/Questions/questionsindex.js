import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect, useHistory, useParams } from 'react-router-dom';
import { editQuestion } from '../../store/questions';
import { deleteQuestionThunk } from '../../store/questions';
import { getAllQuestionsThunk } from '../../store/questions';
import { getAnswersThunk } from '../../store/answers';
import './questions.css'

const Question = () => {
	const dispatch = useDispatch();
    const history = useHistory()
    const { id } = useParams();
    const question = useSelector(state => state?.question[`${id}`])
	const userAnswers = useSelector((state) => Object.values(state.answer))
	const sessionUser = useSelector((state) => state?.session.user)
	const userId = useSelector(state=> state?.session?.user?.id)
	const [title, setTitle] = useState('');
    const [description, setDescription] = useState();
	const [isLoaded, setIsLoaded] = useState(false)

useEffect(() => {
	dispatch(getAnswersThunk(id))
}, [dispatch, id])

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

const sendtoNewAnswerForm =(e) => {
	e.preventDefault();
	e.stopPropagation();
	history.push(`/questions/${id}/answer/new`)
}

if (!userId) {
	return null;
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
			Delete Question
		</button>
		</div>
		) : (
			<span>
				<h1>{question.title}</h1>
				<p>{question.description}</p>
			</span>
		)}
		<div className='answers-container'>
		<button onClick={(e) => sendtoNewAnswerForm(e)}>
			Provide an Answer!
		</button>
		<div className='user-questions'>
                    {userAnswers?.length > 0 ? userAnswers?.map((answer) => {
                        return (
                            <NavLink key={`${answer?.id}`} to={`/answers/${answer?.id}`}>
                                <div>
                                    {answer.answer}
                                </div>
                            </NavLink>
                        )

                    }): <h1>No Answers Currently</h1> }
                </div>
		</div>
	</div>
)

}

export default Question;
