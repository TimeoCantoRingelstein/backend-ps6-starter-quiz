const { Router } = require('express')

const { Question } = require('../../../models')

const router = new Router({ mergeParams: true })

router.get('/', (req, res) => {
  try {
    const allQuestions = Question.get()
    const quizQuestions = allQuestions.filter((q) => q.quizId === parseInt(res.params.questionId, 10))

    res.status(200).json(quizQuestions)
  } catch (err) {
    res.status(500).json(err)
  }
})


module.exports = router
