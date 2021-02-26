const express = require("express");
const { getAccessToRoute } = require("../middlewares/authorization/auth");
const {
    addNewAnswerToQuestion,
    getAllAnswersByQuestion,
    getSingleAnswer,
    editAnswer,
    deleteAnswer,
    likeAnswer,
    undoLikeAnswer,
} = require("../controllers/answer");
const {
    checkQuestionAndAnswerExists,
} = require("../middlewares/database/databaseErrorHelpers");

const { getAnswerOwnerAccess } = require("../middlewares/authorization/auth");

const router = express.Router({ mergeParams: true });

router.post("/", getAccessToRoute, addNewAnswerToQuestion);
router.get("/", getAllAnswersByQuestion);
router.get("/:answer_id", checkQuestionAndAnswerExists, getSingleAnswer);
router.get("/:answer_id/like", [checkQuestionAndAnswerExists, getAccessToRoute], likeAnswer);
router.get("/:answer_id/undo_like", [checkQuestionAndAnswerExists, getAccessToRoute], undoLikeAnswer);
router.put("/:answer_id/edit", [checkQuestionAndAnswerExists, getAccessToRoute, getAnswerOwnerAccess], editAnswer);
router.delete("/:answer_id/delete", [checkQuestionAndAnswerExists, getAccessToRoute, getAnswerOwnerAccess], deleteAnswer);

module.exports = router;
