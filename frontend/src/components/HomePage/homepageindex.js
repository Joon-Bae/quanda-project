import "./homepage.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { getAllQuestionsThunk } from "../../store/questions";


export const Homepage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    // const notebookId = useSelector(state => state?.session?.notebook?.id)
    const userId = useSelector(state=> state?.session?.user?.id)
    // const userId = useSelector((state) => state.session.user.id)
    // const userNotes = useSelector((state) => Object.values(state.note))
    const userQuestions = useSelector((state) => Object.values(state.question))
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        if (userId) {
            dispatch(getAllQuestionsThunk())
            // dispatch(getNotebooksThunk(userId))
            setIsLoaded(true)
        }
    }, [dispatch, isLoaded])


    // const sendToNewNoteForm = (e) => {
    //     e.preventDefault();
    //     e.stopPropagation();
    //     //change 1 later to be notebookId when notebook is created
    //     history.push(`/notebooks/1/note/new`)
    // }

    const sendToNewQuestionForm = (e) => {
        e.preventDefault();
        e.stopPropagation();
        history.push(`/questions/new`)
    }

    if (!userId) {
        return null;
    }
    else if (isLoaded){
        return (
            <div>
                <div className='add-questions'>
                    <button onClick={(e) => sendToNewQuestionForm(e)}>
                        Ask Your Question!
                    </button>
                </div>
                <div className='user-questions'>
                    {userQuestions?.length > 0 ? userQuestions?.map((question) => {
                        return (
                            <NavLink key={`${question?.id}`} to={`/questions/${question?.id}`}>
                                <div>
                                    {userId === question.userId ? question.title: null}
                                </div>
                            </NavLink>
                        )

                    }): <h1>No Questions Currently</h1> }
                </div>
            </div>
        )
    }
    else {
        return null;
    }
}
