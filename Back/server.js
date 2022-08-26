const express = require('express');
const app = express();
const dotenv = require("dotenv");
const cors = require('cors')
const port = process.env.PORT ||'3000';
const userRouter = require('./routes/userRoute');
const mongoose = require('mongoose');
const msgRouter = require('./routes/msgRoute');
const path = require('path');
const cookiesParser = require('cookie-parser');

dotenv.config();
app.use(cors());
app.use(cookiesParser());
app.use(express.json());

//app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/v1/user', userRouter)
app.use('/api/v1/msg', msgRouter)


mongoose.connect(process.env.MONGODB,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.listen(port)



