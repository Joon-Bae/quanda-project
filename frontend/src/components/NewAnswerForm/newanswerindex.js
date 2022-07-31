import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { postAnswerThunk } from '../../store/answers'


function NewAnswerForm() {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state?.session?.user?.id)
    const questionId = useSelector((state) => state?.session?.question?.id)
    const [answer, setAnswer] = useState("")
    const [errors, setErrors] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const validationErrors = [];
        if (!answer.length) validationErrors.push("Answer is required");
        if (answer.length > 100) validationErrors.push("Answer must be 100 characters or less");
        setErrors(validationErrors);
    }, [answer]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formValues = {
            userId,
            questionId,
            answer
        }
        dispatch(postAnswerThunk(formValues))
        console.log(formValues)
        history.push(`/questions/${questionId}`)
    }

    return (
        <form
            className="answers-form"
            onSubmit={handleSubmit}
        >
            <h2>Submit An Answer</h2>
            <ul className="errors">
                {
                    errors.map(error => (
                        <li key={error}>{error}</li>
                    ))
                }
            </ul>
            <label>
                Answer
                <input
                    type="text"
                    name="answer"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                />
            </label>
            <button
                type="submit"
                disabled={errors.length > 0}
                onClick={(e) => handleSubmit(e)}
            >
                Submit This Answer
            </button>
        </form>
    );
}

export default NewAnswerForm;
