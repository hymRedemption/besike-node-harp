module.exports = rewriteUrl;

function rewriteUrl(req, res, next){
    if(req.url === "/"){
        req.url = req.url + "index.html";
    }
    next();

}
