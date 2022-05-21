const jwt = require('jsonwebtoken');
const { getUserByEmail } = require('../../api/user/user.service');

async function handlerUserLogin(req, res) {
    const { email, password } = req.body;
    console.log(req.body);
    const user = await getUserByEmail(email);
    console.log(user);
  try {
    
    if (!user) { return res.status(404).json('Login failed'); }

    const isSuccess = await user.confirmPassword(password);
    if (!isSuccess) { return res.status(401).json('Login failed'); }

    const token = jwt.sign(user.profile, process.env.JWT_SECRET_KEY);
    return res.status(200).json(token);
  } catch (error) {
    return res.status(401).json('Login failed');
  }
}

module.exports = { handlerUserLogin };