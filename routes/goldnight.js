const controllers = require('../controllers/goldnight');

const {authJwt} = require("../middleware")

module.exports=function(app){
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });

      //admin work
      app.post('/gold/night/moviepost',[authJwt.isAdmin],controllers.adminmoviepost)

      app.post('/seat/allocation/admin',[authJwt.verifyToken,authJwt.isAdmin],controllers.seatexpand)
     
      //user business

         app.get('/gold/night/showdetails',controllers.showdetails)

         app.post('/gold/night/book',[authJwt.verifyToken],controllers.bookticket); 
         
         app.get('/gold/night/view/mytickets',[authJwt.verifyToken,authJwt.isUser],controllers.userticket);
         
         app.delete('/gold/night/delete/myticket/',[authJwt.isUser],controllers.deleteticket)
         
         app.delete('/gold/night/delete/myticket/specific',[authJwt.isUser],controllers.deletespecificticket)
     
         //super admin business
         app.post('/seat/allocation/superadmin',[authJwt.verifyToken,authJwt.isSuperAdmin],controllers.seatexpand);
         
         app.delete('/gold/night/delete/movie/superadmin',controllers.superadmindelete)
        
      }