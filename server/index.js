const express=require('express');
const dotenv=require('dotenv');
const mongoose=require('mongoose');
const cookieParser=require('cookie-parser');
const cors=require('cors');
const createUsers = require('./controllers/createUsers');
const userRouter = require('../server/routes/userRouter')
const notesRouter = require('../server/routes/noteListRouter');
const userListRouter = require('./routes/userListRouter')
dotenv.config();
const corsOptions = {
    exposedHeaders: 'auth-token',
};
  
const app=express();
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

mongoose.set('runValidators', true);

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Connected to DB'))
    .catch(err => console.log('Error:', err));

app.get('/create-user', createUsers);
app.get('/', (req, res) => {
    res.send('Home')
})
app.use('/', userRouter)
app.use('/notes', notesRouter)
app.use('/admin', userListRouter)

app.listen(5000, () => console.log('Listening on port 5000'))