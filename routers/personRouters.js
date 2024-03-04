let express = require('express');
let router = express.Router();

let Person= require('./../models/person');

router.post("/", async (req,res)=>{
    try{
        let data = req.body // the body parser process the data and store it in request.body

    // create a new document of person data using mongoose module

    let newPerson = new Person(data);
    /*newPerson.name = data.name;
    newPerson.age = data.age;
    newPerson.mobile = data.mobile;
    newPerson.email = data.email;
    newPerson.address = data.address;
    */
   
    // save the new person to database
     let response = await newPerson.save();
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
     let data = await Person.find();
     console.log('data fetched');
     res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'internal server error'});
    }
})

router.get('/:workType', async (req,res)=>{
    try{
         let workType = req.params.workType;
         if(workType == 'chef' || workType== 'worker' || workType == 'manager'){
            let response = await Person.find({work : workType});
            console.log('response fetched');
            res.status(200).json(response);
         }
        else{
            res.status(404).json({error: 'invalid worktype'});
        }

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'internal server error'});
    }
})

router.put('/:id', async(req,res)=>{
    try{
         let personId = req.params.id;
         let updatedPersonId = req.body;

         let response = await Person.findByIdAndUpdate(personId,updatedPersonId,{
            new : true, // return the updated document
            runValidators: true, // run mongoose validation
         })

         if(!response){
            return res.status(404).json({error: 'person not found'});
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
        let personId = req.params.id;

        let response = await Person.findByIdAndDelete(personId);

        if(!response){
            return res.status(404).json({error: 'person not found'});
         }
          console.log('data deleted');
          res.status(200).json({message:'data successfully deleted'});

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'internal server error'});
    }
})

module.exports = router