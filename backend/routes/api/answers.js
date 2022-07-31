const express = require("express");
const asyncHandler = require("express-async-handler");
const { Question, Answer } = require("../../db/models");
const router = express.Router();

//GET ALL ANSWERS FOR SPECIFIC QUESTION
router.get('/', asyncHandler(async(req, res) => {
    const questionId = req.params.id
    const answers = await Answer.findAll(
        {
            where: {
                questionId
            }
        }
    )
    return res.json(answers)
}))
module.exports = router;
