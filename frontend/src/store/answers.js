import { csrfFetch } from './csrf'

//ACTIONS
const GET_ANSWERS = 'answers/GET_ANSWERS'
const POST_ANSWER = 'answers/POST_ANSWER'
const DELETE_ANSWER = 'answers/DELETE_ANSWER'

//ACTION CREATORS
export const getAnswers = (answers) => ({
    type: GET_ANSWERS,
    answers,
})

export const postAnswer = (answer) => ({
    type: POST_ANSWER,
    answer
})

export const deleteAnswer = (answer) => ({
    type: DELETE_ANSWER,
    answer
})

//THUNKS
export const getAnswersThunk = (questionId) => async(dispatch) => {
    const res = await fetch(`/api/answers/${questionId}`);

    if (res.ok) {
        const answers = await res.json();
        dispatch(getAnswers(answers))
        return answers
    }
}

export const postAnswerThunk= (addedAnswer) => async(dispatch) => {
    const res = await csrfFetch('/api/answers/new', {
        method: "POST",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(addedAnswer),
    })

    if (res.ok) {
        const answer = await res.json();
        dispatch(postAnswer(answer))
        return answer;
    }
}

export const deleteAnswerThunk = (id) => async(dispatch) => {
    const res = await csrfFetch(`/api/answers/${id}`, {
        method: 'DELETE'
    });

    if (res.ok) {
        const data = await res.json()
        dispatch(deleteAnswer(data));
    }
}



//REDUCER
const initialState = {};
function answersReducer(state = initialState, action) {
    let newState = {}
    switch (action.type) {
        case GET_ANSWERS: {
            const newState = {};
			action.answers.forEach((answer) => (newState[answer.id] = answer)
			);
			return newState;
        }
        case POST_ANSWER: {
            newState = {...state}
           const newAnswerId = action.payload.id
           newState[newAnswerId] = action.payload
           return newState;
           // return { ...state, [action.question.id]: action.question };
       }
       case DELETE_ANSWER: {
        newState = { ...state };
        const deletedId = action.payload.id
        delete newState[`${deletedId}`];
        return newState;
    }
        default:
            return state;
    }
}

export default answersReducer
