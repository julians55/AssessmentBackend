const { ObjectId } = require('mongoose').Types;
const favModel = require('./favs.model');

async function getAllFavs(user) {
  const favs = await favModel.find({ userId: new ObjectId(user._id)});
  return (favs);
}

async function getOneFav(_id) {
  const fav = await favModel.findById({userId: {_id}});
  return (fav);
}

async function createFav(fav) {
  const newFav = await favModel.create(fav);
  return (newFav);
}

async function updateFav(id, fav) {
  const FavUpdated = await favModel.findByIdAndUpdate(id, fav);
  return (FavUpdated);
}

async function deleteFav(id) {
  const favDeleted = await favoModel.findByIdAndDelete(id);
  return (favDeleted);
}

module.exports = {
    getAllFavs, getOneFav, createFav, updateFav, deleteFav
};