import express from 'express';
import dotenv from 'dotenv';
import logger from 'morgan';
import userRouter from './routes/userRouter';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';


dotenv.config();
const app = express();


mongoose.connect(`${process.env.MONGO_URI}`).then(()=>{
    console.log(`Database Connected Successfully`)
}).catch(err=>{
    console.log('Error', err)
})


app.use(cors());
app.use(bodyParser.json());
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use('/users', userRouter);



const port = process.env.PORT || 3005;
app.listen(3005, () => {
    console.log('Server listening on port 3000');
});