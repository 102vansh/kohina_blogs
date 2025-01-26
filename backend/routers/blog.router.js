const express  = require('express');
const { createblog, likeblog, commentblogs, incrementViewCount, getallblogs, myblogs, getblogbyid, deleteblog } = require('../controller/blog.controller');
const { isauthenticated } = require('../middleware/auth');
const router = express.Router();

router.route('/createblog').post(isauthenticated,createblog);
router.route('/getallblogs').get(isauthenticated,getallblogs);
router.route('/likeblog/:id').post(isauthenticated,likeblog);
router.route('/commentblog/:id').post(isauthenticated,commentblogs);
router.route('/increaseview/:id').post(isauthenticated,incrementViewCount);
router.route('/myblogs').get(isauthenticated,myblogs)
router.route('/getblog/:id').get(isauthenticated,getblogbyid)
router.route('/deleteblog/:id').delete(isauthenticated,deleteblog);
module.exports = router;