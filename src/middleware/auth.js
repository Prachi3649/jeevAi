

const jwt =  require("jsonwebtoken")
var log4js = require("log4js");

var logger = log4js.getLogger('Auth/Middleware'); 

logger.level = "info";

const authentication = async (req,res,next) => {
    logger.info('Under Authentication')
    let token = req.header("x-api-key")
    if (!token) {
        logger.error('Provide Token')
        return res.status(401).send({ status: false, msg: "token must be present" })};

   let decodedtoken = jwt.verify(token, "thisismysecrutekey");
   if (!decodedtoken) return res.status(400).send ({staus : false, message: "token is invalid"})

   req.decodedToken = decodedtoken

   next()
}

module.exports.authentication = authentication



