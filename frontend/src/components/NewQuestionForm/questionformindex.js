import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addQuestionThunk } from '../../store/questions'

function NewQuestionForm() {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state?.session?.user?.id)
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("")
    const [errors, setErrors] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const validationErrors = [];
        if (!title.length) validationErrors.push("Title is required");
        if (title.length > 100) validationErrors.push("Title must be 100 characters or less");
        if (!description.length) validationErrors.push("Description is required");
        setErrors(validationErrors);
    }, [title, description]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formValues = {
            userId,
            title,
            description
        }
        dispatch(addQuestionThunk(formValues))
        console.log(formValues)
        history.push('/home')
    }

    return (
        <form
            className="questions-form"
            onSubmit={handleSubmit}
        >
            <h2>New Question</h2>
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
            <label>
                Description
                <input
                    type="text"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </label>
            <button
                type="submit"
                disabled={errors.length > 0}
                onClick={(e) => handleSubmit(e)}
            >
                Ask this Question
            </button>
        </form>
    );
}

export default NewQuestionForm;
