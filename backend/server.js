const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db/conn')
const cookieParser = require('cookie-parser');
const fileupload = require('express-fileupload');
const cloudinary = require('cloudinary');
const authrouter = require('./routers/auth.router')
const userrouter = require('./routers/user.router')
const airouter  = require('./routers/ai.router')
const blogrouter = require('./routers/blog.router')
const{errormiddleware} = require('./middleware/error')
const app = express();
dotenv.config({path: './config.env'});
const port = process.env.PORT 

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
cloudinary.config({ 
    cloud_name: 'dysapzsm4', 
    api_key: '872647735318549', 
    api_secret: 'guwZRM21cXqj7oUeoc9VHU0ULOo' 
  });
app.use(
    fileupload({
      useTempFiles: true,
      tempFileDir: "/tmp/",
    })
  );
app.use('/api/v1/auth',authrouter);
app.use('/api/v1/user',userrouter);
app.use('/api/v1/blog',blogrouter);
app.use('/api/v1/ai',airouter)

connectDB();

app.use(errormiddleware);
app.listen(port, (req,res) => {
    console.log(`Server is running on port ${port}`);
});