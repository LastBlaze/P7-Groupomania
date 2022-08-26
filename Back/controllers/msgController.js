const Publication = require('../models/msgModels');
const infoPublication = require('../models/userModel');
const fs = require('fs');

exports.createPublication = (req, res) => {
  const publicationObject = req.body;
  delete publicationObject._id;
  delete publicationObject._userId;
  const publication = new Publication({
      ...publicationObject,
      userId: req.user,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      likes: 0,
      dislikes: 0,
      userLiked: [],
      usersDisliked: [],
  });

    publication.save()
      .then(() => {(publication); console.log(publication); res.status(201).json({message: 'publication postée !'})})
      .catch(error => { console.trace(error); res.status(400).json( { error })}) 
};

exports.getOnePublication = (req, res) => {
  Publication.findOne({
    _id: req.params.id
  }).then((publication) => {
      res.status(200).json(publication);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};


exports.modifyPublication = (req, res, next) => {
  const userId = req.user
    if(req.file) { // Si l'image est modifiée, on supprime l'ancienne image dans /image
        Publication.findOne({ _id: req.params.id })
            .then(publication => {
                const filename = publication.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    const publicationObject = 
                    {   
                        ...req.body,
                        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                    }
                    Publication.updateOne({userId}, { ...publicationObject, _id: req.params.id })
                        .then(() => res.status(200).json({ message: 'Publication modifiée avec succès !' }))
                        .catch(error => res.status(400).json({ error, msg:"vous n'avez pas l'autorisation pour cette modification !" }))
                });
            });
    } else { // Si l'image n'est pas modifée
        const publicationObject = { ...req.body }  
        Publication.updateOne({ userId }, { ...publicationObject, _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Publication modifiée avec succès !' }))
            .catch(error => res.status(400).json({ error,  msg:"vous n'avez pas l'autorisation pour cette modification !"}))
    }
};


exports.deletePublication = (req, res) => {
  Publication.findOne({ _id: req.params.id})
      .then(publication => {
          if (publication.userId != req.user) {
              res.status(401).json({message: "vous n'avez pas l'autorisation pour cette modification "});
          } else {
              const filename = publication.imageUrl.split('/images/')[1];
              fs.unlink(`images/${filename}`, () => {
                  publication.deleteOne({_id: req.params.id})
                      .then(() => { res.status(200).json({message: 'Publication supprimé !'})})
                      .catch(error => res.status(401).json({ error }));
              });
          }
      })
      .catch( error => {
          res.status(500).json({ error });
      });
};


exports.getAllPublication = (req, res) => {
  Publication.find().then(
    (publication) => {
      res.status(200).json(publication);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.likePublication = (req,res) => {
  Publication.findOne({_id: req.params.id})
    .then(publication => {
      const typeLikes = req.body.likes
      const user = req.body.userId
      switch (typeLikes) {
        case 1: 
            if(!sauce.usersLiked.find(us => us == user)) {
              publication.likes++
              publication.usersLiked.push(user)
            }
            console.log("likes");
            break
        case -1: 
            if (!publication.usersDisliked.find(us => us == user)) {
              publication.dislikes++
              publication.usersDisliked.push(user)
            }
            console.log("dislikes");
            break
        case 0:
            let index = publication.usersLiked.findIndex(us => us == user)
            if (index != -1) {
                console.log(index)
                publication.usersLiked.splice(index, 1)
                publication.likes--
                }
                else {
                index = publication.usersDisliked.findIndex(us => us == user)
                console.log(index)
                publication.usersDisliked.splice(index, 1)
                publication.dislikes--
            }
            break
        default:
          console.log("problem")
          break
      }
      publication.save()
                .then(() => {res.status(200).json({ message: "ok" }); console.log(res);})
                .catch(error => res.status(400).json({ error }))
        })
        .catch(error => {
          console.log(error)
          res.status(400).json({ error })
    })
}