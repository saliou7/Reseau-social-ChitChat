const UserModel = require("../models/user.model");
const { uploadErrors } = require("./errors");
const ObjectID = require("mongoose").Types.ObjectId;
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `${__dirname}/../../../client/public/uploads/profil/`)
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = req.body.name + ".jpg";
        cb(null, uniqueSuffix)
    }
});
const upload = multer({ storage: storage });

module.exports.uploadProfil = async (req, res) => {
    if (req.file !== null && req.file !== undefined) {
        try {
            if (
                req.file.mimetype != "image/jpg" &&
                req.file.mimetype != "image/png" &&
                req.file.mimetype != "image/jpeg"
            )
                throw Error("invalid file");

            if (req.file.size > 1000000) throw Error("max size");
        } catch (err) {
            const errors = uploadErrors(err);
            return res.status(201).json({ errors });
        }
    }

    await upload.single('file')(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ message: "Une erreur s'est produite lors de l'envoi du fichier." });
        } else if (err) {
            return res.status(400).json({ message: err.message });
        }

    });
    if (!ObjectID.isValid(req.body.userId)) // check if the id is valid
        return res.status(400).send("ID unknown : " + req.body.userId); // if not valid, send a 400 error

    const fileName = req.body.name + ".jpg";
    try {
        const update = await UserModel.findByIdAndUpdate(
            req.body.userId,
            {
                $set: {
                    profile_picture: "./uploads/profil/" + fileName
                }
            },
            { new: true, upsert: true, setDefaultsOnInsert: true })
        return res.send(update); // send the updated user

    } catch (err) {
        return res.status(440).send({ message: err });
    }
};



const storageCover = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `${__dirname}/../../../client/public/uploads/cover/`)
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = req.body.name + ".jpg";
        cb(null, uniqueSuffix)
    }
});

const UploadCover = multer({ storage: storageCover });

module.exports.uploadCover = async (req, res) => {

    if (req.file !== null && req.file !== undefined) {
        try {
            if (
                req.file.mimetype != "image/jpg" &&
                req.file.mimetype != "image/png" &&
                req.file.mimetype != "image/jpeg"
            )
                throw Error("invalid file");

            if (req.file.size > 500000) throw Error("max size");
        } catch (err) {
            const errors = uploadErrors(err);
            return res.status(201).json({ errors });
        }
    }

    await UploadCover.single('file')(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ message: "Une erreur s'est produite lors de l'envoi du fichier." });
        } else if (err) {
            return res.status(400).json({ message: err.message });
        }

    });
    const fileName = req.body.name + ".jpg";
    if (!ObjectID.isValid(req.body.userId)) // check if the id is valid
        return res.status(400).send("ID unknown : " + req.body.userId); // if not valid, send a 400 error

    try {
        const update = await UserModel.findByIdAndUpdate(
            req.body.userId,
            {
                $set: {
                    cover_picture: "./uploads/cover/" + fileName
                }
            },
            { new: true, upsert: true, setDefaultsOnInsert: true })
        return res.send(update); // send the updated user

    } catch (err) {
        return res.status(500).send({ message: err });
    }
};
