const express=require('express')
const router=express.Router();
const {handleUserSignUp}=require('../controller/user')

router.post('/',handleUserSignUp)

module.exports=router;