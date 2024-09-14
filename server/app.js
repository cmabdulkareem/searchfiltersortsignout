import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import fileUpload from 'express-fileupload';
import './config/db.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT

const corsPolicy = {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
};


app.use(cookieParser());
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, 
  }));

app.use(express.static("public"))
app.use(fileUpload())
app.use(cors(corsPolicy))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/', userRoutes)

app.listen(PORT, ()=>{
    console.log(`listening on http://localhost:${PORT}`);
})