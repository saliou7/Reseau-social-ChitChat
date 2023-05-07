const PostModel = require("../models/post.model");
const UserModel = require("../models/user.model");
const { uploadErrors } = require("./errors");
const ObjectID = require("mongoose").Types.ObjectId;
const multer = require("multer");

module.exports.getPosts = (req, res) => {
    PostModel.find()
        .sort({ createdAt: -1 })
        .then((docs) => {
            res.send(docs);
        })
        .catch((err) => {
            console.log("Error to get data : " + err);
            res.status(500).send({ message: "Error to get data" });
        });
};

const date = Date.now()
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `${__dirname}/../../../client/public/uploads/posts/`)
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = req.body.posterId + date + ".jpg";
        cb(null, uniqueSuffix)
    }
});
const upload = multer({ storage: storage });

module.exports.createPost = function (req, res, next) {
    if (req.file !== null && req.file !== undefined) {
        try {
            if (
                req.file.mimetype != "image/jpg" &&
                req.file.mimetype != "image/png" &&
                req.file.mimetype != "image/jpeg"
            )
                throw Error("invalid file");

            if (req.file.size > 5000000) throw Error("max size");
        } catch (err) {
            const errors = uploadErrors(err);
            return res.status(201).json({ errors });
        }
    }

    upload.single('file')(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ message: "Une erreur s'est produite lors de l'envoi du fichier." });
        } else if (err) {
            return res.status(400).json({ message: err.message });
        }

        const fileName = req.body.posterId + date + ".jpg";

        const newPost = new PostModel({
            posterId: req.body.posterId,
            message: req.body.message,
            picture: req.file !== undefined ? "./uploads/posts/" + fileName : "",
            likers: [],
            comments: [],
        });

        newPost.save()
            .then(post => {
                return res.status(201).json(post);
            })
            .catch(err => {
                return res.status(400).send(err);
            });
    });
};

module.exports.updatePost = (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(400).send("Invalid ID: " + id);
    }

    const { message } = req.body;

    PostModel.findByIdAndUpdate(id, { message }, { new: true })
        .then((updatedPost) => {
            if (!updatedPost) {
                return res.status(404).send("Failed to update post");
            }
            res.status(200).send(updatedPost);
        })
        .catch((error) => {
            console.log("Update error:", error);
            res.status(500).send({ message: "Failed to update post" });
        });
};

module.exports.deletePost = async (req, res) => {
    try {
        if (!ObjectID.isValid(req.params.id)) {
            return res.status(400).send("ID unknown: " + req.params.id);
        }

        const deletedPost = await PostModel.findByIdAndRemove(req.params.id);
        res.send(deletedPost);
    } catch (err) {
        console.log("Delete error: " + err);
        res.status(500).send("Delete error");
    }
};

module.exports.likePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        const post = await PostModel.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { likers: req.body.id } },
            { new: true },
        );
        const user = await UserModel.findByIdAndUpdate(
            req.body.id,
            { $addToSet: { likes: req.params.id } },
            { new: true },
        );
        res.send(user);
    } catch (err) {
        return res.status(400).send(err);
    }
};

module.exports.unlikePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        const post = await PostModel.findByIdAndUpdate(
            req.params.id,
            { $pull: { likers: req.body.id } },
            { new: true },
        );
        const user = await UserModel.findByIdAndUpdate(
            req.body.id,
            { $pull: { likes: req.params.id } },
            { new: true },
        );
        res.send(user);
    } catch (err) {
        return res.status(400).send(err);
    }
};

module.exports.commentPost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        return PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    comments: {
                        commenterId: req.body.commenterId,
                        commenterPseudo: req.body.commenterPseudo,
                        text: req.body.text,
                        timestamp: new Date().getTime(),
                    },
                },
            },
            { new: true })
            .then((post) => {
                if (!post) {
                    return res.status(404).send("Failed to comment post");
                }
                res.status(200).send(post);
            })
    } catch (err) {
        return res.status(400).send(err);
    }
};

module.exports.editCommentPost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        const post = await PostModel.findById(req.params.id); // find the post by id
        const comment = post.comments.find((comment) =>
            comment._id.equals(req.body.commentId)
        );

        if (!comment) return res.status(404).send("Comment not found");
        comment.text = req.body.text;

        await post.save(); // save the post

        return res.status(200).send(post); // send the updated post
    } catch (err) {
        console.log("ID unknown : " + err); // log the error
        return res.status(500).send(err); // send a 500 error
    }
};

module.exports.deleteCommentPost = async (req, res) => {

    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        const post = await PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $pull: {
                    comments: {
                        _id: req.body.commentId,
                    },
                },
            },
            { new: true }
        );
        if (!post) return res.status(404).send("Post not found");
        return res.status(200).send(post);
    } catch (err) {
        console.log("Delete error: " + err);
        return res.status(500).send("Delete error");
    }
};
