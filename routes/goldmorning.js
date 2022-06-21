const controllers = require('../controllers/goldmorning');

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
        app.post('/gold/morning/moviepost',[authJwt.verifyToken,authJwt.isAdmin],controllers.adminmoviepost)

      app.post('/seat/allocation/admin',[authJwt.verifyToken,authJwt.isAdmin],controllers.seatexpand)
     
      //user business
 
         app.get('/gold/morning/showdetails',controllers.showdetails)

         app.post('/gold/morning/book',[authJwt.verifyToken],controllers.bookticket);
         
         app.get('/gold/morning/view/mytickets',[authJwt.verifyToken,authJwt.isUser],controllers.userticket);
         
         app.delete('/gold/morning/delete/myticket/',[authJwt.verifyToken,authJwt.isUser],controllers.deleteticket)
         
         app.delete('/gold/morning/delete/myticket/specific',[authJwt.verifyToken,authJwt.isUser],controllers.deletespecificticket)
     
         //super admin business
         app.post('/seat/allocation/superadmin',[authJwt.verifyToken,authJwt.isSuperAdmin],controllers.seatexpand);
         
         app.delete('/gold/morning/delete/movie/superadmin',controllers.superadmindelete)
        
      } 