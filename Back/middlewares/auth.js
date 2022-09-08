const jwt = require('jsonwebtoken');
 
module.exports = (req, res, next) => {
   try {
    if(!req.cookies.token) {
        res.status(400).json({message: 'Token manquant !'})
    } 
        const token = req.cookies.token;
    
        const decodedToken = jwt.verify(token, process.env.APP_SECRET);

        req.auth = {
            user: decodedToken.userId,
            role: decodedToken.role
        }

	next();

   } catch(error) {
        console.log(error);
       res.status(401).json({ error });
   }
};
