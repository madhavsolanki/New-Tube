const express = require('express')
const app = express();
const cookieParser = require('cookie-parser')
require('dotenv').config();
require('./Config/db')
const port = process.env.PORT;
const cors = require('cors');

app.use(cors({
    origin: ['https://youtube-ejazul.netlify.app', 'http://localhost:5173'],
    credentials: true
}))

//middleware
app.use(express.json()) // middleware to parse json
app.use(cookieParser())  // middleware to parse cookies

const authRoute = require('./Routes/user');
const videoRoute = require('./Routes/video')
const commentRoute = require('./Routes/comment')


//routes
app.use('/auth', authRoute);
app.use('/video', videoRoute);
app.use('/comment',commentRoute)

// Starts the server
app.listen(port, ()=>{
    console.log("Server Started on port:",port);
})