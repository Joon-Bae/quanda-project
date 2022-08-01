import "./homepage.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { getAllQuestionsThunk } from "../../store/questions";


export const Homepage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const userId = useSelector(state=> state?.session?.user?.id)
    const userQuestions = useSelector((state) => Object.values(state.question))
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        if (userId) {
            dispatch(getAllQuestionsThunk())
            setIsLoaded(true)
        }
    }, [dispatch, isLoaded])



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
            <div className='homepage-component'>
                <div className='add-questions'>
                    <button className='addquestion-btn'onClick={(e) => sendToNewQuestionForm(e)}>
                        Ask Your Question!
                    </button>
                </div>
                <div className='user-questions'>
                    <div className='newsfeed'>
                    <h1>See what others are asking!</h1>
                    </div>
                    {userQuestions?.length > 0 ? userQuestions?.map((question) => {
                        return (
                            <NavLink key={`${question?.id}`} to={`/questions/${question?.id}`}>
                                <div className='questionsList'>
                                    {question.title}
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
