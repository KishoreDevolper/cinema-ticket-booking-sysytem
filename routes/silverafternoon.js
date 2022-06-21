const controllers = require('../controllers/goldafternoon');

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
      app.post('/silver/afternoon/moviepost',[authJwt.isAdmin],controllers.adminmoviepost)

      app.post('/seat/allocation/admin',[authJwt.verifyToken,authJwt.isAdmin],controllers.seatexpand)
     
      //user business

         app.get('/silver/afternoon/showdetails',controllers.showdetails)

         app.post('/silver/afternoon/book',[authJwt.verifyToken],controllers.bookticket);
         
         app.get('/silver/afternoon/view/mytickets',[authJwt.isUser],controllers.userticket);
         
         app.delete('/silver/afternoon/delete/myticket/',[authJwt.isUser],controllers.deleteticket)
         
         app.delete('/silver/afternoon/delete/myticket/specific',[authJwt.isUser],controllers.deletespecificticket)
     
         //super admin business
         app.post('/seat/allocation/superadmin',[authJwt.verifyToken,authJwt.isSuperAdmin],controllers.seatexpand);
         
         app.delete('/silver/afternoon/delete/movie/superadmin',controllers.superadmindelete)
        
      }