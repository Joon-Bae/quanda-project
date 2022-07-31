import { csrfFetch } from './csrf'

//ACTIONS
const GET_ALL_QUESTIONS = 'questions/GET_ALL_QUESTIONS'
const ADD_QUESTION = '/questions/ADD_QUESTION'
const EDIT_QUESTION = '/questions/EDIT_QUESTION'
const DELETE_QUESTION = '/questions/DELETE_QUESTION'

//ACTION CREATORS
export const getAllQuestions = (questions) => ({
    type: GET_ALL_QUESTIONS,
    questions,
})
export const addQuestion = (question) => ({
    type: ADD_QUESTION,
    question,
});

export const editQuestion = (question) => ({
    type: EDIT_QUESTION,
    question,
});

export const deleteQuestion = (question) => ({
    type: DELETE_QUESTION,
    question
})

//THUNKS
export const getAllQuestionsThunk = () => async(dispatch) => {
    const res = await fetch(`/api/questions/`);

    if (res.ok) {
        const allQuestions= await res.json();
        dispatch(getAllQuestions(allQuestions));
        return allQuestions;
    }
}

export const addQuestionThunk= (addedQuestion) => async(dispatch) => {
    const res = await csrfFetch('/api/questions/new', {
        method: "POST",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(addedQuestion),
    })

    if (res.ok) {
        const question = await res.json();
        dispatch(addQuestion(question))
        return question;
    }
}

export const editQuestionThunk = (formValues) => async(dispatch) => {
    const { id } = formValues
    const result = await csrfFetch(`/api/questions/${id}/edit`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(formValues)
    })
    if(result.ok) {
        const editedQuestion = await result.json();
        dispatch(editQuestion(editedQuestion))
        return editedQuestion;
    }
}

export const deleteQuestionThunk = (id) => async(dispatch) => {
    const res = await csrfFetch(`/api/questions/${id}`, {
        method: 'DELETE'
    });

    if (res.ok) {
        const data = await res.json()
        dispatch(deleteQuestion(data));
    }
}



//REDUCER
const initialState = {};
function questionsReducer(state = initialState, action) {
    let newState = {}
    switch (action.type) {
        case GET_ALL_QUESTIONS: {
            const newState = {};
			action.questions.forEach((question) => (newState[question.id] = question)
			);
			return newState;
        }

        case ADD_QUESTION: {
             newState = {...state}
            const newQuestionId = action.payload.id
            newState[newQuestionId] = action.payload
            return newState;
            // return { ...state, [action.question.id]: action.question };
        }
        case EDIT_QUESTION: {
            newState= { ...state }
            const editId = action.payload.id
            newState[editId] = action.payload
            return newState;
        }
        case DELETE_QUESTION: {
            newState = { ...state };
            const deletedId = action.payload.id
            delete newState[`${deletedId}`];
            return newState;
        }
        default:
            return state;
    }
}

export default questionsReducer
