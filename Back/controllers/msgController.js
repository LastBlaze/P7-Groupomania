const Publication = require("../models/msgModels");
// const infoPublication = require("../models/userModel");
const fs = require("fs");
const User = require("../models/userModel");

exports.createPublication = (req, res) => {
  const publicationObject = req.body;
  delete publicationObject._id;
  delete publicationObject._userId;
  if (req.file) {
    const publication = new Publication({
      ...publicationObject,
      user: req.auth.user,
      imageUrl: `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`,
      likes: 0,
      dislikes: 0,
      userLiked: [],
      usersDisliked: [],
    });
    publication
      .save()
      .then(() => {
        res.status(201).json({ message: "publication postée !" });
      })
      .catch((error) => {
        console.trace(error);
        res.status(400).json({ error });
      });
  } else {
    const publication = new Publication({
      ...publicationObject,
      user: req.auth.user,
      likes: 0,
      dislikes: 0,
      userLiked: [],
      usersDisliked: [],
    });
    publication
      .save()
      .then(() => {
        res.status(201).json({ message: "publication postée !" });
      })
      .catch((error) => {
        console.trace(error);
        res.status(400).json({ error });
      });
  }
};

exports.getOnePublication = (req, res) => {
  Publication.findOne({
    _id: req.params.id,
  })
    .then((publication) => {
      res.status(200).json(publication);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

exports.modifyPublication = (req, res, next) => {
  const userId = req.auth.user;
  const role = req.auth.role;

  Publication.findOne({ _id: req.params.id }).then((publication) => {
    if (userId == publication.user || role) {
      if (req.file) {
        // Si l'image est modifiée, on supprime l'ancienne image dans /image
        if (publication.imageUrl) {
          const filename = publication.imageUrl.split("/images/")[1];
          fs.unlink(`images/${filename}`, (err) => {
            console.log(err);
          });
        }

        const publicationObject = {
          ...req.body,
          imageUrl: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`,
        };
        Publication.updateOne(
          { _id: req.params.id },
          { ...publicationObject, _id: req.params.id }
        )
          .then(() =>
            res
              .status(200)
              .json({ message: "Publication modifiée avec succès !" })
          )
          .catch((error) =>
            res.status(400).json({
              error,
              msg: "vous n'avez pas l'autorisation pour cette modification !",
            })
          );
      } else {
        // Si l'image n'est pas modifée
        const publicationObject = { ...req.body };
        Publication.updateOne(
          { _id: req.params.id },
          { ...publicationObject, _id: req.params.id }
        )
          .then(() =>
            res
              .status(200)
              .json({ message: "Publication modifiée avec succès !" })
          )
          .catch((error) =>
            res.status(400).json({
              error,
              msg: "vous n'avez pas l'autorisation pour cette modification !",
            })
          );
      }
    } else {
      res
        .status(400)
        .json("vous n'avez pas l'autorisation pour cette modification !");
    }
  });
};

exports.deletePublication = (req, res) => {
  const userId = req.auth.user;
  const role = req.auth.role;

  Publication.findOne({ _id: req.params.id })
    .then((publication) => {
      if (userId == publication.user || role) {
        if (publication.imageUrl) {
          const filename = publication.imageUrl.split("/images/")[1];
          fs.unlink(`images/${filename}`, (err) => {
            console.log(err);
          });
        }
        publication
          .deleteOne({ _id: req.params.id })
          .then(() => {
            res.status(200).json({ message: "Publication supprimé !" });
          })
          .catch((error) => res.status(401).json({ error }));
      } else {
        res.status(401).json({
          message: "vous n'avez pas l'autorisation de supprimer ce post",
        });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error });
    });
};

exports.getAllPublication = (req, res) => {
  Publication.find()
    .sort({ createdAt: -1 })
    .populate("user", "lastName firstName _id")

    .then((publication) => {
      res.status(200).json(publication);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.likePublication = (req, res) => {
  Publication.findOne({ _id: req.params.id })
    .then((publication) => {
      const typeLikes = req.body.type;
      const numberLike = req.body.number;
      const user = req.auth.user;
      let indexLike = publication.usersLiked.findIndex((us) => us == user);
      let indexDislike = publication.usersDisliked.findIndex((us) => us == user);
   
      if (numberLike == 0) {
        if (indexLike !== -1 || indexDislike !== -1) {
          if (typeLikes == "like") {
            //retiré utilisateur de la liste like
            publication.usersLiked.splice(indexLike, 1);
            // like -1
            publication.likes -= 1;
            publication.save();
            res.status(200).json(publication.usersLiked);
          } else {
            //retiré l'utilisateur de la liste dislike
            publication.usersDisliked.splice(indexDislike, 1);
            // dislike -1
            publication.dislikes -= 1;
            publication.save();
            res.status(200).json(publication.usersDisliked);
          }
        } else {
          res.status(400).json({ message: "ça bloque !" });
        }
      } else if (numberLike == 1) {
        if (indexLike == -1) {
          // ajout de l'utilisateur dans la liste like
          publication.usersLiked.push(user);
          // like +1
          publication.likes++;
          // res.status(200).json({"message":"ok"})
          publication.save();
          res.status(200).json(publication.usersLiked);
        } else {
          res.status(400).json({ message: "ça bloque !" });
        }
      } else {
        //ajout de l'utilisateurdans la liste dislike
        if (indexDislike == -1) {
          publication.usersDisliked.push(user);
          // dislike +1
          publication.dislikes++;
          publication.save();
          res.status(200).json(publication.usersDisliked);
        } else {
          res.status(400).json({ message: "ça bloque !" });
        }
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(400).json({ error });
    });
};
