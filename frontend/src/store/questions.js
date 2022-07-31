import { csrfFetch } from './csrf'

//ACTIONS
const GET_ALL_QUESTIONS = 'questions/GET_ALL_QUESTIONS'
const ADD_QUESTION = '/questions/ADD_QUESTION'

//ACTION CREATORS
const getAllQuestions = (questions) => ({
    type: GET_ALL_QUESTIONS,
    payload: questions
})
const addQuestion = (questions) => ({
    type: ADD_QUESTION,
    payload: questions,
});

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

//REDUCER
const initialState = {};
function questionsReducer(state = initialState, action) {
    let newState = {}
    switch (action.type) {
        case GET_ALL_QUESTIONS: {
            newState = {...state}
            const questions = action.payload
            if(questions.length > 0){
                questions.map((question) => {
                    newState[question.id] = question;
                });
            }
            return newState;
        }
        // case GET_NOTEBOOKNOTES: {
        //     newState = { ...state }
        //     const notes = action.payload
        //     // const id = action.payload.id
        //     newState['notes'] = notes
        //     return newState;
        // }
        // case GET_NOTEBOOK: {
        //     newState = { ...state }
        //     const notebook = action.payload
        //     const id = action.payload.id
        //     newState[id] = notebook
        //     return newState;
        // }
        case ADD_QUESTION: {
             newState = {...state}
            const newQuestionId = action.payload.id
            newState[newQuestionId] = action.payload
            return newState;
        }
        // case DELETE_NOTEBOOK: {
        //     newState = { ...state };
        //     const deletedId = action.payload.id
        //     console.log(newState[`${deletedId}`])
        //     delete newState[`${deletedId}`];
        //     return newState;
        // }
        default:
            return state;
    }
}

export default questionsReducer
