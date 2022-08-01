import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { editQuestionThunk } from '../../store/questions'
import { getAllQuestionsThunk } from '../../store/questions'
import './editquestion.css'



function EditQuestionForm() {

    const dispatch = useDispatch();
    const { id } = useParams();
    const userId = useSelector((state) => state?.session?.user?.id)
    const question = useSelector((state) => state?.question[id])
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState();
    const [errors, setErrors] = useState([]);
    const history = useHistory();



    useEffect(() => {
        const validationErrors = [];
        if (!title.length) validationErrors.push("Title is required");
        if (title.length > 100) validationErrors.push("Title must be 100 characters or less");
        setErrors(validationErrors);

    }, [title]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formValues = {
            userId, //2
            id,
            title, //joon
            description
        }

        dispatch(editQuestionThunk(formValues))
        history.push(`/home`)

    }


    return (
        <div className='edit-question-container'>
        <form
            className="edit-question-form"
            onSubmit={handleSubmit}
        >
            <h2 className='edit-text'>Edit Question</h2>
            <ul className="errors">
                {
                    errors.map(error => (
                        <li key={error}>{error}</li>
                    ))
                }
            </ul>
            <div >
                <input
                    className='editquestion-input'
                    type="text"
                    name="title"
                    placeholder='Enter New Title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <button
                className='question-submit-edit-btn'
                type="submit"
                disabled={errors.length > 0}
                >
                Edit Question
            </button>
        </form>
        </div>
    );
}

export default EditQuestionForm;
