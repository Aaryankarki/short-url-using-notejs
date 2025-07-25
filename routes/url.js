const express=require('express');
const {handleGenerateNewShortURL}=require('../controller/url');
const router=express.Router();

//handling the new url
router.post("/",handleGenerateNewShortURL)

module.exports=router;
