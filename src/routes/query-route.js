const Joi = require('joi');
const express = require('express');
const router = express.Router();
const Query = require('../database/models/query-model.js');


//POST A QUERY

router.post('/queries', async(req, res)=>{
    const query = new Query({
        lastName: req.body.firstName,
        firstName: req.body.lastName,
        email: req.body.email,
        message: req.body.message
    });
    
    
    try{
    const savedQuery = await query.save();
    res
    .status(201)
    .json(savedQuery);
    }catch(err){
    res
    .status(400)
    .json(err.message);
    }
    })

    //GET ALl QUERIES
router.get('/queries', async(req, res)=>{
   try{
   const queries = await Query.find();
   res
   .status(200)
   .json(queries);
   }catch(err){
  res
  .status(404)
  .json(err.message);
   }
    });

//GET SPECIFIC QUERY


    module.exports = router;
