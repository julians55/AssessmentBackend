const crypto = require('crypto');
const { getUser, getAllUsers, createUser } = require('./user.service');

async function handlerAllUsers(req, res){
 try {
  const users = await getAllUsers();
  res.status(200).json(users)
 } catch (error) {
   res.status(400).json({message:'Unable to retrieve users'})
 }
}

async function handlerGetUser(req, res) {
  const { id } = req.params;
  try {
    const user = await getUser(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: 'User does not exist' });
  }
}


async function handlerCreateUser(req, res) {
    const newUser = req.body;
    try {
      const hash = crypto.createHash('sha256')
      .update(newUser.email)
      .digest('hex');
      newUser.passwordResetToken = hash;
      newUser.passwordResetExpires = Date.now() + 3600000 * 24;
      const user = newUser && await createUser(newUser);
      res.status(201).json(user);
    } catch (error) {
      res.status(404).json({ message: JSON.stringify(error) });
    }
}

module.exports = { handlerAllUsers, handlerGetUser, handlerCreateUser};