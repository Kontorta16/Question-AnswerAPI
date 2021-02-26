const express = require("express");
const answer = require("./answer");
const Question = require("../models/Question");

const {
  getSingleQuestion,
  getAllQuestions,
  askNewQuestion,
  editQuestion,
  deleteQuestion,
  likeQuestion,
  undoLikeQuestion,
} = require("../controllers/question");
const {
  checkQuestionExists,
} = require("../middlewares/database/databaseErrorHelpers");
const {
  getAccessToRoute,
  getQuestionOwnerAccess,
} = require("../middlewares/authorization/auth");
const questionQueryMiddleware = require("../middlewares/query/questionQueryMiddleware");
const answerQueryMiddleware = require("../middlewares/query/answerQueryMiddleware");

const router = express.Router();

router.get(
  "/",
  questionQueryMiddleware(Question, {
    population: {
      path: "user",
      select: "name profile_image",
    },
  }),
  getAllQuestions
);
router.get("/:id/like", [getAccessToRoute, checkQuestionExists], likeQuestion);
router.get(
  "/:id/undo_like",
  [getAccessToRoute, checkQuestionExists],
  undoLikeQuestion
);
router.get(
  "/:id",
  checkQuestionExists,
  answerQueryMiddleware(Question, {
    population: [
      {
        path: "user",
        select: "name profile_image",
      },
      {
        path: "answers",
        select: "content",
      },
    ],
  }),
  getSingleQuestion
);
router.post("/ask", getAccessToRoute, askNewQuestion);
router.put(
  "/:id/edit",
  [getAccessToRoute, checkQuestionExists, getQuestionOwnerAccess],
  editQuestion
);
router.delete(
  "/:id/delete",
  [getAccessToRoute, checkQuestionExists, getQuestionOwnerAccess],
  deleteQuestion
);
router.use("/:question_id/answers", checkQuestionExists, answer);

module.exports = router;
