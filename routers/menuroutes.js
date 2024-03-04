let express = require('express');
let router = express.Router();

let MenuItem = require('./../models/menuitem');

router.post("/", async (req,res)=>{
    try{
        let data = req.body // the body parser process the data and store it in request.body

    // create a new document of person data using mongoose module

    let newMenuItem = new MenuItem(data);
   
    // save the new person to database
     let response = await newMenuItem.save();
     console.log('data saved');
     res.status(200).json(response);
    }
    catch(err){
       console.log(err);
       res.status(500).json({error: 'internal server error'});
    }
    
});

router.get('/', async(req,res)=>{
    try{
     let data = await MenuItem.find();
     console.log('data fetched');
     res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'internal server error'});
    }
})

router.get('/:tasteType', async (req,res)=>{
    try{
         let tasteType = req.params.tasteType;
         if(tasteType == 'sweet' || tasteType== 'sour' || tasteType == 'bitter'){
            let response = await MenuItem.find({taste : tasteType});
            console.log('response fetched');
            res.status(200).json(response);
         }
        else{
            res.status(404).json({error: 'invalid tastetype'});
        }

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'internal server error'});
    }
})

router.put('/:id', async(req,res)=>{
    try{
         let MenuId = req.params.id;
         let updatedMenuId = req.body;

         let response = await MenuItem.findByIdAndUpdate(MenuId,updatedMenuId,{
            new : true, // return the updated document
            runValidators: true, // run mongoose validation
         })

         if(!response){
            return res.status(404).json({error: 'item not found'});
         }
          console.log('data updated');
          res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'internal server error'});

    }
})

router.delete('/:id', async (req,res)=>{
    try{
        let MenuId = req.params.id;

        let response = await MenuItem.findByIdAndDelete(MenuId);

        if(!response){
            return res.status(404).json({error: 'item not found'});
         }
          console.log('data deleted');
          res.status(200).json({message:'data successfully deleted'});

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'internal server error'});
    }
})

module.exports = router;