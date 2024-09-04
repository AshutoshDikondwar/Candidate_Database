const express = require('express')
const router = express.Router()
const { createUser, loginUser } = require('../controller/user/UserController')
const { createCandidate, getCandidates, updateCandidate, deleteCandidate } = require('../controller/candidate/CandidateController')

router.post('/user', createUser)
router.post('/user/login', loginUser)

router.post('/candidate', createCandidate)
router.get('/candidate', getCandidates)
router.put('/candidate/:id', updateCandidate)
router.delete('/candidate/:id', deleteCandidate)

module.exports = router;