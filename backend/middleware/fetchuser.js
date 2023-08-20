const jwt = require("jsonwebtoken");
const JWT_SECRET = '$13$^&*(^$#$12'
const fetchuser = (req, res, next) => {
  //get the suer from the jwt token and id to the req object
  const token = req.header('auth-token');
  if(!token){
    res.status(401).send({error: "please autenticate with valid token"})
  }
  try {
    
      const data= jwt.verify(token,JWT_SECRET)
      req.user = data.user;
      next();
    } catch (error) {
        res.status(401).send({error: "please autenticate with valid token"})
    }
};

module.exports = fetchuser;
