const usersMongoDB = require ("../daos/users/UsersDaoMongoDb")
const bcrypt = require('bcrypt');
const saltRounds = 10;
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy

const users = new usersMongoDB();

//Sign up
passport.use("local-signup", new LocalStrategy({
  usernameField:"username",
  passwordField:"password",
  passReqToCallback:true
}, async(req, username, password, done)=>{
  //Valido el usuario
    let user = await users.getByUser(username)
    const hash = bcrypt.hashSync(password, saltRounds);

    if(user){
        console.log("El usuario ya existe")
        return done(null, false)
    }
    let userNew = await users.save({email: username, password:hash})
    return done(null,userNew)
  }))

//Sign in
passport.use("local-login", new LocalStrategy(async (username, password, done)=>{
    //Validacion a la base de datos
    let user = await users.getByUser(username);
    
    if(user){
      if (bcrypt.compareSync(password, user.password)){
        return done(null, user);
      }
    }
    return done(null, false)
    })
  )

//Serializacion
passport.serializeUser((user, done)=>{
    done(null, user.id)
})

//Deserializacion
passport.deserializeUser(async(id, done)=>{
    //Validacion a la base de datos
    let user = await users.getById(id)
    done(null, user)
})
  

module.exports = passport;