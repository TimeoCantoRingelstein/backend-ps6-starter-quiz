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

router.post('/', (req, res) => {
  try {
    const quizId = parseInt(req.params.quizId, 10)
    const questionPayload = {
      ...req.body,
      quizId,
    }

    const question = Question.create(questionPayload)

    res.status(200).json(question)
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    }
    res.status(500).json(err)
  }
})

router.get('/:questionId', (req, res) => {
  try {
    const question = Question.getById(req.params.questionId)

    res.status(200).json(question)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.put('/:questionId', (req, res) => {
  try {
    const allQuestions = Question.get()
    const questionExistsInQuiz = allQuestions.filter(
      (q) => q.quizId === parseInt(req.params.quizId, 10)
          && q.quizId === parseInt(req.params.questionId, 10),
    )

    if (!questionExistsInQuiz) {
      res.status(404).json({ error: 'Question introuvable pour ce quiz' })
    }

    const updatedQuestion = Question.update(req.params.questionId, { ...req.body })
    res.status(200).json(updatedQuestion)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.delete('/:questionId', (req, res) => {
  try {
    const allQuestions = Question.get()
    const questionExistsInQuiz = allQuestions.filter(
      (q) => q.quizId === parseInt(req.params.quizId, 10)
          && q.quizId === parseInt(req.params.questionId, 10),
    )

    if (!questionExistsInQuiz) {
      res.status(404).json({ error: 'Question introuvable pour ce quiz' })
    }

    const deletedQuestion = Question.delete(req.params.questionId)
    res.status(200).json(deletedQuestion)
  } catch (err) {
    res.status(500).json(err)
  }
})


module.exports = router
