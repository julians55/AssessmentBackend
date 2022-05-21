const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UsersSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  lists: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'favs',
  },
}, { versionKey: false });

UsersSchema.pre('save', async function (next) {
  const user = this;
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);

    user.password = hash;
    next();
  } catch (error) {
    next(error);
  }
});

UsersSchema.pre('findOneAndUpdate', async function (next) {
  const { _update } = this;
  try {
    if (_update.password) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(_update.password, salt);
      _update.password = hash;
    }
    next();
  } catch (error) {
    next(error);
  }
});

UsersSchema.virtual('profile').get(function () {
  const { _id, email } = this;
  return { _id, email };
});

UsersSchema.methods.confirmPassword = async function (incomingPassword) {
  const user = this;
  return await bcrypt.compare(incomingPassword, user.password);
};

module.exports = mongoose.model('User', UsersSchema);
