const express = require('express');
const { generateContent } = require('../controller/ai-controller');
const router  = express.Router();

router.route('/generatecontent').post(generateContent)

module.exports = router 