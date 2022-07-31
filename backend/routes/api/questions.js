const express = require("express");
const asyncHandler = require("express-async-handler");
const { Question, Answer } = require("../../db/models");
const router = express.Router();

//get all questions for every user
router.get('/', asyncHandler(async(req, res) => {
    // const userId = req.params.userId;
    const questions = await Question.findAll()
    return res.json(questions)
}))

// //get all notes for specific notebook
// router.get('/:notebookId/notes', asyncHandler(async(req,res) => {
//     const notebookId = req.params.notebookId;

//     const notes = await Note.findAll ({
//         where: { notebookId: notebookId },
//         order: [["updatedAt", "DESC"],]
//     });
//     console.log(notes)
//     return res.json(notes)
// }))

//get one specific question
router.get('/:questionId', asyncHandler(async(req, res) => {
    const questionId = req.params.questionId

    const question = await Question.findByPk(questionId)
    return res.json(question)
}))

//CREATE A QUESTION
router.post('/new', asyncHandler(async(req, res) => {
    const { userId, title, description } = req.body;
    const createdQuestion = await Question.create({
        userId: userId,
        title: title,
        description: description,
        createdAt: new Date(),
        updatedAt: new Date(),
    })
    return res.json(createdQuestion)
}))

//EDIT A QUESTION
router.put(
    '/:id/edit',
    asyncHandler(async (req, res) => {
        const {
            userId,
            id,
            title,
            description,
        } = req.body

        // console.log(note, "hello joon")

        const editedQuestion = await Question.update(
            {
                userId,
                id,
                title,
                description
            },
            {
                where: { id },
            }
            )
        const question = await Question.findByPk(id)
        return res.json(question);
        // return res.send(':)')
    })
    );

// //DELETE A NOTEBOOK
// router.delete(
//     "/:notebookId",
//     asyncHandler(async (req, res) => {
//       const notebookId = req.params.notebookId;

//       const notebook = await NoteBook.findByPk(notebookId);
//       console.log(notebook, "this is what we want to delete")
//       await notebook.destroy();
//       return res.json(notebook);
//     })
//   );;


module.exports = router;
