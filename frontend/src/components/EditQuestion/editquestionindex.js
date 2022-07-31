import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { editQuestionThunk } from '../../store/questions'
import { getAllQuestionsThunk } from '../../store/questions'



function EditQuestionForm() {

    const dispatch = useDispatch();
    const { id } = useParams();
    // console.log("**************", useParams())
    const userId = useSelector((state) => state?.session?.user?.id)
    const question = useSelector((state) => state?.question[id])
    // const oneNote = useSelector((state) => state.note)
    // console.log(note)
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
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
        // dispatch(editNote(formValues))
        // console.log(formValues)
        // history.push('/')

        // function submitEdit(e){
        //     e.preventDefault();

        dispatch(editQuestionThunk(formValues))
        history.push(`/home`)

    }


    return (
        <form
            className="edit-question-form"
            onSubmit={handleSubmit}
        >
            <h2>Edit Question</h2>
            <ul className="errors">
                {
                    errors.map(error => (
                        <li key={error}>{error}</li>
                    ))
                }
            </ul>
            <label>
                Title
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </label>
            <button
                type="submit"
                disabled={errors.length > 0}
                >
                Edit Question
            </button>
        </form>
    );
}

export default EditQuestionForm;
