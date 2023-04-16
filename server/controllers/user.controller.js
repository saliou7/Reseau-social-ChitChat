const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select("-password");
  res.status(200).json(users);
};

module.exports.userInfo = async (req, res) => {
  console.log(req.params); //
  if (!ObjectID.isValid(req.params.id)) // check if the id is valid
    return res.status(400).send("ID unknown : " + req.params.id); // if not valid, send a 400 error
  try {
    const user = await UserModel.findById(req.params.id).select("-password"); // if valid, find the user by id and return all the info except the password
    res.send(user);   // send the user info
  } catch (err) { // if there is an error, send a 500 error
    console.log("ID unknown : " + err); // log the error
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


module.exports.deleteUser = async (req, res) => { // delete a user
  if (!ObjectID.isValid(req.params.id)) // check if the id is valid
    return res.status(400).send("ID unknown : " + req.params.id); // if not valid, send a 400 error
  try {
    const deletedUser = await UserModel.findOneAndDelete({ _id: req.params.id }); // if valid, find the user by id and delete it
    if (!deletedUser) { // if the user is not found, send a 404 error
      return res.status(404).json({ message: "User not found" }); // if not valid, send a 400 error
    }
    res.send(deletedUser); // send the deleted user
  } catch (err) {
    return res.status(500).json({ message: err }); // if there is an error, send a 500 error
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

