const jwt = require('jsonwebtoken');

module.exports =  {
  checkJwtToken(req, res, next) {
    const token = req.headers.authorization || req.headers.Authorization;
    if (!token) {
      return res.status(404).send({ message:'No token provided' });
    }
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        return res.status(400).send({
          success: false,
          message: 'Failed to authenticate token'
        },400);
      }
      req.user = decoded;
      next();
    });
  }
};
