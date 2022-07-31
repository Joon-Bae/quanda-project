const express = require("express");
const asyncHandler = require("express-async-handler");
const { Question, Answer } = require("../../db/models");
const router = express.Router();

//GET ALL ANSWERS FOR SPECIFIC QUESTION
router.get('/:questionId', asyncHandler(async(req, res) => {
    const questionId = req.params.questionId
    const answers = await Answer.findAll({
        where:{ questionId : questionId}
    })
    return res.json(answers)
}))

//POST ANSWER
router.post('/new', asyncHandler(async(req, res) => {
    const { userId, questionId, answer } = req.body;
    const createdAnswer = await Answer.create({
        userId: userId,
        questionId: questionId,
        answer: answer,
        createdAt: new Date(),
        updatedAt: new Date(),
    })
    return res.json(createdAnswer)
}))

//DELETE ANSWER
router.delete('/:id',
asyncHandler(async(req, res) => {
const id = req.params.id;
const answer = await Answer.findByPk(id)

await answer.destroy();

return res.json(Answer)
})
);

module.exports = router;
