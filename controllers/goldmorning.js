const goldmorning = require('../db/models/gold_morning');

const jwt = require("jsonwebtoken");

const user = require('../db/models/user');

const config = require("../config/auth.config");


const Joi = require('joi');

const movie_schema = Joi.object({
  movie_name:Joi.string().required()
})

exports.adminmoviepost = async(req,res)=>{
  try {
    const screendata = ({
      movie_name:req.body.movie_name,
    })    
    const {error} = movie_schema.validate(screendata )
    if(error){
       res.status(404).json({message:error})
    }
    else{ 
    let result =  await goldmorning.query().update(screendata)
    res.status(200).json({message:"Movie Name Created Sucessfully",data:result})
    }
  } 
  catch (error) {
    return res.status(500).json({message:"Something Wrong Please Try after Some Time",err:error})
  }
}
exports.seatexpand = async(req,res)=>{

  try{  
    const seatnumber = req.query.seat_number

    const movie_name = req.query.movie_name

    const fieldlist =seatnumber.split(",") 
    
      const final = fieldlist
  
       const fieldsToInsert = final.map(field => 
            ({ movie_name:movie_name,seat_number:field,seat_availability:'available'})); 
              let result= await goldmorning.query().insert(fieldsToInsert);
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
      const result = await user.query().withGraphFetched('Screen_Gold_Morning').findById(value)
       .then(specific=>{
         res.json({
           name:specific.name,
           movie_name:specific.Screen_Gold_Morning[0].movie_name,
           seat_number:specific.Screen_Gold_Morning[0].seat_number,
           show_time:'morning',
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
           await goldmorning.query().findOne('seat_number',seat_number).then(async hello =>{ 
      if(hello.seat_availability == "available"){
        const result = await goldmorning.query().where({seat_number:req.query.seat_number}).update(screendata)
         return res.status(201).json({message:"Ticket Booked Sucessfully",Data:result})
      } 
      else{
        return res.status(404).json({message:"Sorry Ticket Already Taken",})    
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
      await goldmorning.query().findOne('seat_number',seat_number).then(async value =>{
        if(value.Gold_users == userId){
          
          const result = await goldmorning.query().where({seat_number:req.query.seat_number}).update(seatdata);
          
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

            await goldmorning.query().where({ Gold_users: userId}).patch({seat_availability:"available",Gold_users:null},['Gold_users','seat_availability','Gold_users'])
                 
            res.status(200).json({message:"all Tickets Cancelled Sucessfully"})
  }) 
  } catch (error) { 
    return res.status(500).json({message:"Something Wron Please Try after Some Time",err:error})
  }
}
exports.showdetails = async (req,res)=> { 
    try {  
    
       let result = await goldmorning.query().column('movie_name','seat_number','seat_availability')

       res.status(200).json({message:"Show Details and Seat Availability",data:result})
          
    } catch (error) {
      return res.status(500).json({message:"Something Wrong Please Try after Some Time",error:err})
    }
  }

  exports.superadmindelete = async(req,res)=>{
    try {
        const {movie_name} = req.query;
        if(movie_name == null ){
           goldmorning.query().update(movie_name)
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
        goldmorning.query().update(movie_name)
        res.status(200).json({message:"Movie Updation Sucessfull!!.."})
      }       
  } catch (error) {
      return res.status(500).json({message:"SomeThing Went Wrong Please Try Again",error:err});
  }
}
