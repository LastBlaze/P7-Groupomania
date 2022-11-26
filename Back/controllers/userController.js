const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  try {
    const verifyEmail = await User.findOne({ email: req.body.email });
    if (verifyEmail != null) {
      return res.status(401).json("Addresse mail déjà utilisée !");
    }
    const hash = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      email: req.body.email,
      password: hash,
      lastName: req.body.lastName,
      firstName: req.body.firstName,
    });
    user.save();
    res.status(201).json({ message: "Utilisateur créé !", data: user });
  } catch (error) {
    console.trace(error);
    res.status(400).json({ error });
  }
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)

        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }

          const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.APP_SECRET,
            { expiresIn: "24h" }
          );

          // res.status(200).cookie("token", token).json({
          //   userId: user._id,
          //   role: user.role,
          // });
          res
            .status(200)
            .cookie("token", token, {
              httpOnly: true,
              sameSite: "None",
              secure: true,
              maxAge: 7 * 24 * 60 * 60 * 1000, //7 jours
            })
            .json({
              userId: user._id,
              role: user.role,
            });
        })

        .catch((error) => res.status(500).json({ error }));
    })

    .catch((error) => res.status(500).json({ error }));
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).send("vous êtes bien déconnecté ");
  } catch (error) {
    res.status(500).send(error);
  }
};
