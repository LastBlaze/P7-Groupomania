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
      const typeLikes = publication.likes; //valeur numérique attendue ?
      const user = publication.user;
      let indexLike = publication.usersLiked.findIndex((us) => us == user);
      let indexDislike = publication.usersDisliked.findIndex(
        (us) => us == user
      );
      if (publication.usersLiked.find((us) => us == user)) {
        publication.likes -= 1;
        publication.usersLiked.splice(indexLike, 1);
      } else {
        publication.likes++;
        publication.usersLiked.push(user);
      }

      if (publication.usersDisliked.find((us) => us == user)) {
        publication.dislikes -= 1;
        publication.usersDisliked.splice(indexDislike, 1);
      } else {
        publication.dislikes++;
        publication.usersDisliked.push(user);
      }

      // else

      // if (publication.usersLiked.find((us) => us == user) && publication.likes >= 0) {
      //     publication.likes -= 1;
      //     publication.usersLiked.filter(function(f) { return f !== user });

      // }else

      // if (!publication.usersDisliked.find((us) => us == user)){
      //     publication.dislikes += 1;
      //     publication.likes -= 1;
      //     publication.usersDisliked.push(user);
      //     publication.usersLiked.filter(function(f) { return f !== user });
      // }

      // case publication.usersDisliked.find((us) => us == user):

      //   // if (publication.usersDisliked.find((us) => us == user)) {
      //     publication.dislikes += 1;
      //     publication.likes -= 1;
      //     publication.usersDisliked.push(user);
      //     publication.usersLiked.filter(function(f) { return f !== user });

      //   break;
      // case 0:
      //   let index = publication.usersLiked.findIndex((us) => us == user);
      //   if (index != -1) {
      //     publication.usersLiked.splice(index, 1);
      //     publication.likes--;
      //   } else {
      //     index = publication.usersDisliked.findIndex((us) => us == user);

      //     publication.usersDisliked.splice(index, 1);
      //     publication.dislikes--;
      //   }
      //   break;
      // default:
      //   break;
      // }
      publication
        .save()
        .then(() => {
          res.status(200).json({ message: "ok", publication });
        })
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => {
      console.error(error);
      res.status(400).json({ error });
    });
};
