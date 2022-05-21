const {
    getAllFavs, getOneFav, createFav, updateFav, deleteFav,
  } = require('./favs.service');
  
  async function handlerAllFavs(req, res) {
    try {
      const favs = await getAllFavs(req.user);
      res.status(200).json(favs);
    } catch (error) {
      res.status(401).json({message:'User not authenticated'})
    }
    
  }
  
  async function handlerOneFav(req, res) {
    const { id } = req.params;
    const fav = await getOneFav(id);
  
    if (!fav) {
      res.status(404).json({ message: `Fav not found with ID: ${id}` });
    } else {
      res.json(fav);
    }
  }
  
  async function handlerCreateFav(req, res) {
    try {
      const { _id } = req.user;
      console.log(_id)
      const newList = await createFav({ refUser: _id, ...req.body });
      res.status(201).json(newList);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  
  async function handlerUpdateFav(req, res) {
    try {
      const { _id } = req.user;
      const list = await getOneFav(req.params.id);
      if (list.refUser.toString() === _id.toString()) {
        const updatedList = await updateFav(req.params.id, req.body);
        res.status(200).json(updatedList);
      } else {
        res.status(403).json('Fav not updated');
      }
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  
  async function handlerDeleteFav(req, res) {
    const { id } = req.params;
    await deleteFav(id);
    res.status(204).send({});
  }
  
  module.exports = {
    handlerAllFavs,
    handlerOneFav,
    handlerCreateFav,
    handlerUpdateFav,
    handlerDeleteFav,
  };