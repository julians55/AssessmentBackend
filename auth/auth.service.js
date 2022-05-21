const composable = require('composable-middleware');
const jwt = require('jsonwebtoken');
const { getUserByEmail } = require('../api/user/user.service');

function isAuth() {
  return composable().use(async (req, res, next) => {
    try {
      const { authorization } = req.headers;
      if (!authorization) { return res.status(401).json('Unauthorized').end(); }

      const [, token] = authorization.split(' ');
      const payload = await jwt.verify(token, process.env.JWT_SECRET_KEY);

      const user = await getUserByEmail(payload.email);
      if (!user) { return res.status(401).json('Unauthorized').end(); }

      req.user = user;
      next();
      return null;
    } catch (error) {
      return res.status(401).json('Unauthorized').end();
    }
  });
}

module.exports = { isAuth };