const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;

//pour avoir les infos de tous les utilisateurs : 
module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select('-password'); // pour ne pas renvoyer et faire transiter le password lorsqu'on fait un get sur l'utilisateur 
  res.status(200).json(users);
}

//pour n'avoir les infos que d'un seul utilisateur : 

module.exports.getUser = async (req, res) => {

  if (!ObjectID.isValid(req.params.id)) { //req.params désignent parametres du l'url
    return res.status(400).send('ID unknown :' + req.params.id);
  }
  try {
    UserModel.findById(req.params.id).select("-password").then(docs => {
      res.send(docs);
    });
  } catch (err) {
    console.log(err);
  }
}

module.exports.deleteUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown: " + req.params.id);

  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await UserModel.deleteOne({ _id: req.params.id }).exec();
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports.updateUser = async (req, res) => { // update a user
  if (!ObjectID.isValid(req.params.id)) // check if the id is valid
    return res.status(400).send("ID unknown : " + req.params.id); // if not valid, send a 400 error

  try {
    const updatedUser = await UserModel.findOneAndUpdate( // if valid, find the user by id and update it
      { _id: req.params.id }, // find the user by id
      {
        $set: { // update the user info
          bio: req.body.bio, // update the bio
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    return res.send(updatedUser); // send the updated user
  } catch (err) { // if there is an error, send a 500 error
    return res.status(500).json({ message: err }); // log the error
  }
};

module.exports.follow = async (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) || // check if the id is valid
    !ObjectID.isValid(req.body.idToFollow)
  )
    return res.status(400).send("ID unknown : " + req.params.id); // if not valid, send a 400 error

  try {
    // add to the follower list
    await UserModel.findByIdAndUpdate( // if valid, find the user by id and update it
      req.params.id, // find the user by id
      { $addToSet: { following: req.body.idToFollow } }, // update the user info
      { new: true, upsert: true },
    );

    // add to following list
    await UserModel.findByIdAndUpdate(
      req.body.idToFollow,
      { $addToSet: { followers: req.params.id } },
      { new: true, upsert: true },
    );

    res.status(201).json({ message: 'User followed successfully' });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports.unfollow = async (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.idToUnfollow)
  )
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await UserModel.findByIdAndUpdate(
      req.params.id,
      { $pull: { following: req.body.idToUnfollow } },
      { new: true, upsert: true },
    );
    // remove to following list
    await UserModel.findByIdAndUpdate(
      req.body.idToUnfollow,
      { $pull: { followers: req.params.id } },
      { new: true, upsert: true },
    );
    return res.status(201).json({ message: 'User unfollowed successfully' });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

