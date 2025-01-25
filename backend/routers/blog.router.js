const express  = require('express');
const { createblog, likeblog, commentblogs, incrementViewCount } = require('../controller/blog.controller');
const { isauthenticated } = require('../middleware/auth');
const router = express.Router();

router.route('/createblog').post(isauthenticated,createblog);
router.route('/likeblog/:id').post(isauthenticated,likeblog);
router.route('/commentblog/:id').post(isauthenticated,commentblogs);
router.route('/increaseview/:id').post(isauthenticated,incrementViewCount);
module.exports = router;