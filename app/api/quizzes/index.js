const { Router } = require('express')

const { Quiz } = require('../../models')
const QuestionRouter = require('./questions')

const router = new Router()

// Récup liste Quiz
router.get('/', (req, res) => {
  try {
    res.status(200).json(Quiz.get())
  } catch (err) {
    res.status(500).json(err)
  }
})

// Créer un Quiz
router.post('/', (req, res) => {
  try {
    const quiz = Quiz.create({ ...req.body })
    res.status(201).json(quiz)
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})

// Récup un seul quiz
router.get('/:quizId', (req, res) => {
  try {
    res.status(200).json(Quiz.getById(req.params.quizId))
  } catch (err) {
    res.status(500).json(err)
  }
})

// Supprimer un Quiz
router.delete('/:quizId', (req, res) => {
  try {
    res.status(200).json(Quiz.delete(req.params.quizId))
  } catch (err) {
    res.status(500).json(err)
  }
})

// Modifier un Quiz
router.put('/:quizId', (req, res) => {
  try {
    const updateQuiz = Quiz.update(req.params.quizId, { ...req.body })
    res.status(200).json(updateQuiz)
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err)
    }
    res.status(500).json(err)
  }
})

router.use('/:quizId/question', QuestionRouter)

module.exports = router
