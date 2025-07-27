const shortid = require('shortid'); 
const URL = require('../model/url');

//controller used to handle the url

async function handleGenerateNewShortURL(req, res) {
    const body = req.body;

    console.log(body.url);
    
    if (!body.url) {
        return res.status(400).json({ error: "URL is required" });
    }

    const generatedShortId = shortid.generate(); 

    await URL.create({
        shortId: generatedShortId,
        redirectURL: body.url,
        visitHistory:[]
    });

   return res.render('home', {
    id: generatedShortId
});

    // return res.json({ id: generatedShortId });
}

module.exports = {
    handleGenerateNewShortURL
};
