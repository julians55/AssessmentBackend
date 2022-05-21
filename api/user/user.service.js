const userModel = require('./user.model');

async function getAllUsers(){
    const users = await userModel.find();
    return (users);
}

async function getUser (id){
    const user = await userModel.findById(id);
    return (user);
}

async function createUser(user) {
    const newUser = await userModel.create(user);
    return newUser;
}
async function getUserByEmail(email) {
    return await userModel.findOne({ email });
  }

module.exports = {
    getUser,
    getAllUsers,
    createUser,
    getUserByEmail
};