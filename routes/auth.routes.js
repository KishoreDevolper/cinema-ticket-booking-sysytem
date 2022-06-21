const controllers = require('../controllers/auth.controllers');

const {authJwt} = require("../middleware")

const verifySignUp = require("../middleware/verifysignup")

module.exports=function(app){
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });

      //signup
         app.post('/register',[verifySignUp.checkDuplicateUsernameOrEmail],controllers.register);
      //signin 
         app.post('/signin',controllers.signin)


}