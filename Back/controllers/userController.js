const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
    try {
        const hash = await bcrypt.hash(req.body.password, 10)
        const user = new User ({
            email: req.body.email,
            password: hash,
            lastName: req.body.lastName,
            firstName: req.body.firstName,
            role: req.body.role
  
        });
        user.save()
        res.status(201).json({ message: 'Utilisateur créé !', data: user })
    } catch (error) {
        console.log("test");
        console.trace(error)
        res.status(400).json({error});
    }
}

exports.login = (req, res, next) => {

    User.findOne({ email: req.body.email })
        
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)
                
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }

                    const token = jwt.sign(
                        { userId: user._id },
                        process.env.APP_SECRET,
                        { expiresIn: '24h' }
                    )
                    res.status(200).cookie("token", token).json();
                })
                
                .catch(error => res.status(500).json({ error }));
        })
        
        .catch(error => res.status(500).json({ error }));
 };

 exports.getUserProfile = async (req, res) => {
        const personId = req.user;
        try {
            const reqDb = await User.findById(personId);
            
            res.status(200).json({data: reqDb});
        } catch (error) {
            res.status(400).json({data: [], error});
        }
};

 exports.logout = async (req,res) => {
    try {
        console.log(req.user);

        res.clearCookie("token");
        res.status(200).send("vous êtes bien déconnecté ")
       
    } catch (error) {
        res.status(500).send(error);
    }
 }