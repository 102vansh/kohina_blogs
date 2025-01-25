const express = require('express');
const { getallusers, updateuser, deleteuser, getmyprofile } = require('../controller/users.controller');
const { isauthenticated } = require('../middleware/auth');
const router = express.Router();


router.route('/getallusers').get(isauthenticated,getallusers);
router.route('/updateuser/:id').post(isauthenticated,updateuser);
router.route('/deleteuser/:id').delete(isauthenticated,deleteuser);
router.route('/getmyprofile').get(isauthenticated,getmyprofile);


module.exports = router;