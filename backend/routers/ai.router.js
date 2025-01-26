const express = require('express');
const { generateContent } = require('../controller/ai-controller');
const { isauthenticated } = require('../middleware/auth');
const router  = express.Router();

router.route('/generatecontent').post(isauthenticated,generateContent)

module.exports = router 