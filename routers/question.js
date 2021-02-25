const express = require("express");
const { getSingleQuestion, getAllQuestions, askNewQuestion, editQuestion, deleteQuestion, likeQuestion, undoLikeQuestion } = require("../controllers/question");
const { checkQuestionExists } = require("../middlewares/database/databaseErrorHelpers");
const { getAccessToRoute, getQuestionOwnerAccess } = require("../middlewares/authorization/auth");
const router = express.Router();


router.get("/", getAllQuestions);
router.get("/:id/like", [getAccessToRoute, checkQuestionExists], likeQuestion);
router.get("/:id/undo_like", [getAccessToRoute, checkQuestionExists], undoLikeQuestion);
router.get("/:id", checkQuestionExists, getSingleQuestion);
router.post("/ask", getAccessToRoute, askNewQuestion);
router.put("/:id/edit", [getAccessToRoute, checkQuestionExists, getQuestionOwnerAccess], editQuestion);
router.delete("/:id/delete", [getAccessToRoute, checkQuestionExists, getQuestionOwnerAccess], deleteQuestion);

module.exports = router;
