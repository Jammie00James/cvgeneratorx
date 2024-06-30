const express = require('express')
const electionController = require('../controllers/election.controller')
const router = express.Router();



router.post('/generate', electionController.generate)



module.exports = router