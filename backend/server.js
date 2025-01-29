const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db/conn')
const cors = require('cors')
const cookieParser = require('cookie-parser');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
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
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use(cors({
  origin:"http://localhost:5173",
  methods:["GET","POST","PUT","DELETE"],
  credentials:true,

}));


app.use(
  session({
    secret: '123456789',
    resave: false,
    saveUninitialized: true,
  })
);

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Passport Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CLIENT_CALLBACK,
    },
    (accessToken, refreshToken, profile, done) => {
      // Save or retrieve user from your database
      const user = {
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
      };
      return done(null, user);
    }
  )
);

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});


app.use(cookieParser());
cloudinary.config({ 
    cloud_name:'dysapzsm4', 
    api_key: '872647735318549', 
    api_secret: 'guwZRM21cXqj7oUeoc9VHU0ULOo' 
  });
// app.use(
//     fileupload({
//       useTempFiles: true,
//       tempFileDir: "/tmp/",
//     })
//   );
app.use('/api/v1/auth',authrouter);
app.use('/api/v1/user',userrouter);
app.use('/api/v1/blog',blogrouter);
app.use('/api/v1/ai',airouter)

connectDB();

app.use(errormiddleware);
app.listen(port, (req,res) => {
    console.log(`Server is running on port ${port}`);
});