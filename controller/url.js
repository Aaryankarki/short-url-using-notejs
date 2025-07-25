const nanoId=require("nanoid");
const URL=require('../model/url')

async function handleGenerateNewShortURL(req,res) {
    const body=req.body;
    if(!body.URL) return res.status(400).json({error:"URL is required"})
const shortId=nanoId();
    await URL.create({
       shortId: shortId,
       redirectURL:body.URL,
       visitHistory:[]
    });
    return res.json({id:shortId,})
} 

module.exports={
    handleGenerateNewShortURL
}