const jwt = require('jsonwebtoken');

module.exports =  {
  checkJwtToken(req, res, next) {
    const token = req.headers.authorization || req.headers.Authorization;
    if (!token) {
      return res.send({message:'No token provided'}, 404);
    }
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        return res.send({
          success: false,
          message: 'Failed to authenticate token'
        },400);
      }
      req.user = decoded;
      next();
    });
  }
};
