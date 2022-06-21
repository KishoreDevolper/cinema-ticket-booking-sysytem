const goldafternoon = require('../db/models/gold_afternoon');

const jwt = require("jsonwebtoken");

const user = require('../db/models/user');

const config = require("../config/auth.config");


const Joi = require('joi');

const schema = Joi.object({
  movie_name:Joi.string().required(),
  seat_name:Joi.string().required()
})

exports.adminmoviepost = async(req,res)=>{
  try {
    const screendata = ({
      movie_name:req.body.movie_name,
    })
    
    const {error} = {schema}.mo.validate(screendata )
    if(error){
       res.status(404).json({message:error})
    }
    else{ 
    let result =  await goldafternoon.query().update(screendata)
    res.status(200).json({message:"Movie Name Created Sucessfully",data:result})
    }
  } 
  catch (error) {
    return res.status(500).json({message:"Something Wrong Please Try after Some Time",err:error})
  }
}
exports.seatexpand = async(req,res)=>{

  try{
    const seat_number_schema = Joi.object({
      movie_name:Joi.string().required(),
    })
    const {er} = movie_name_schema.validate(screendata )
    if(seat_error){
      res.status(404).json({message:error})
   } 
    const seat_number = req.query.seat_number

    const {errors} = seat_number.validate(screendata )
    
    if(errors){
       res.status(404).json({message:errors})
    }
    
    const moviename = req.query.movie_name

    const {error} = movie_name.validate(screendata )
    
    if(error){
       res.status(404).json({message:error})
    }
      const fieldlist =seat_number.split(",") 
    
      const final = fieldlist
  
       const fieldsToInsert = final.map(field => 
            ({ movie_name:moviename,seat_number:field,seat_availability:'available'})); 
              let result= await goldafternoon.query().insert(fieldsToInsert);
              res.json(result)

  } catch (error) {
    return res.status(500).json({message:"Something Wrong Please Try after Some Time",err:error})
  }
}
exports.userticket = async(req,res)=>{
  try {
    let token = req.headers["x-access-token"];
    if (!token) {
      return res.status(403).send({
        message: "No token provided!" 
      });
    }
    jwt.verify(token, config.secret, async(err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!"
        });
         
      }
      req.userId = decoded.id
      let value = req.userId
      const result = await user.query().withGraphFetched('Screen_Gold_Afternoon').findById(value)
       .then(specific=>{
         res.json({
          name:specific.name,
          movie_name:specific.Screen_Gold_Morning[0].movie_name,
          seat_number:specific.Screen_Gold_Morning[0].seat_number,
          show_time:'afternoon',
          screen_name:"Gold"

         })
       })
      res.json(result)
    })
   
  } catch (error) {
    return res.status(500).json({message:"Something Wrong Please Try after Some Time",err:error})
  }
}

exports.bookticket = async (req,res,next)=> {
  try {
    let token = req.headers["x-access-token"];
    if (!token) {
      return res.status(403).send({
        message: "No token provided!"
      });
    }
    jwt.verify(token, config.secret, async(err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!"
        });
         
      }
      req.userId = decoded.id
      let value = req.userId
    const screendata = ({
        Gold_users :  value, 
        seat_availability:'booked'
     
    })
    const {seat_number} = req.query
           await goldafternoon.query().findOne('seat_number',seat_number).then(async hello =>{ 
      if(hello.seat_availability == "available"){
        const result = await goldafternoon.query().where({seat_number:req.query.seat_number}).update(screendata)
         return res.status(201).json({message:"Ticket Booked Sucessfully",Data:result})
      } 
      else{
        return res.status(404).json({message:"Sorry Ticket Already Taken",err:error})    
      } 
      
    })   
    }) 
  } catch (error) { 
    return res.status(500).json({message:"Something Wron Please Try after Some Time",err:error})
  }
}
exports.deletespecificticket = async(req,res)=>{
  try {
    let token = req.headers["x-access-token"];
    if (!token) {
      return res.status(403).send({
        message: "No token provided!"
      });
    }
    jwt.verify(token, config.secret, async(err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!"
        });
         
      }
      const userId = decoded.id
      const seatdata = ({
        Gold_users:null,
        seat_availability:"available"
      })
      const {seat_number} = req.query
      await goldafternoon.query().findOne('seat_number',seat_number).then(async value =>{
        if(value.Gold_users == userId){
          const result = await goldafternoon.query().where({seat_number:req.query.seat_number}).update(seatdata);
          return res.status(200).json({message:"Ticket Cancelled Sucessfully",Data:result})
        }
        else{
          return res.status(404).json({message:"You are not Authorized to Perform This Action"})
        }
      })
    })
  } catch (error) {
    
  }
}
exports.deleteticket = async(req,res)=>{
  try {
    let token = req.headers["x-access-token"];
    if (!token) {
      return res.status(403).send({
        message: "No token provided!"
      });
    }
    jwt.verify(token, config.secret, async(err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!"
        });
         
      }
           const userId = decoded.id

            await goldafternoon.query().where({ Gold_users: userId}).patch({seat_availability:"available",Gold_users:0},['Gold_users','seat_availability','Gold_users'])
                 
            res.status(200).json({message:"Tickets Cancelled Sucessfully"})
  }) 
  } catch (error) { 
    return res.status(500).json({message:"Something Wron Please Try after Some Time",err:error})
  }
}
exports.showdetails = async (req,res)=> { 
    try {  
    
       let result = await goldafternoon.query().column('movie_name','seat_number','seat_availability')

       res.status(200).json({message:"Show Details and Seat Availability",data:result})
          
    } catch (error) {
      return res.status(500).json({message:"Something Wrong Please Try after Some Time",error:err})
    }
  }

  exports.superadmindelete = async(req,res)=>{
    try {
        const {movie_name} = req.query;
        if(movie_name == null){
           goldafternoon.query().update(movie_name)
          res.status(200).json({message:"Requested Sucess"})
        }
        else{
          res.status(404).json({message:"Invalid input please try again"})
        }       
    } catch (error) {
        return res.status(500).json({message:"SomeThing Went Wrong Please Try Again",error:err});
    }
}

exports.superadminupdate = async(req,res)=>{
  try {
    
      const {movie_name} = req.query;
      if(movie_name == null){
        res.status(404).json({message:"Invalid input please try again"})
      }
      else{
        goldafternoon.query().update(movie_name)
        res.status(200).json({message:"Movie Updation Sucessfull!!.."})
      }       
  } catch (error) {
      return res.status(500).json({message:"SomeThing Went Wrong Please Try Again",error:err});
  }
}
