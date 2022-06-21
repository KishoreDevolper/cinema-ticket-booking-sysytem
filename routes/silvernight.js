const controllers = require('../controllers/silvernight');

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
      app.post('/silver/night/moviepost',[authJwt.isAdmin],controllers.adminmoviepost)

      app.post('/seat/allocation/admin',[authJwt.verifyToken,authJwt.isAdmin],controllers.seatexpand)
     
      //user business

         app.get('/silver/night/showdetails',controllers.showdetails)

         app.post('/silver/night/book',[authJwt.verifyToken],controllers.bookticket);
         
         app.get('/silver/night/view/mytickets',[authJwt.isUser],controllers.userticket);
         
         app.delete('/silver/night/delete/myticket/',[authJwt.isUser],controllers.deleteticket)
         
         app.delete('/silver/night/delete/myticket/specific',[authJwt.isUser],controllers.deletespecificticket)
     
         //super admin business
         app.post('/seat/allocation/superadmin',[authJwt.verifyToken,authJwt.isSuperAdmin],controllers.seatexpand);
         
         app.delete('/silver/night/delete/movie/superadmin',controllers.superadmindelete)
        
      }