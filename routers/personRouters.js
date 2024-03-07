let express = require('express');
let router = express.Router();

let Person= require('./../models/person');

let {jwtAuthMiddleware, generateToken} = require('./../jwt');

router.post("/signup", async (req,res)=>{
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

     let payload ={
        id: response.id,
        username: response.username
     }

     let token = generateToken(payload);
     console.log('token is: ', token);

     res.status(200).json({response: response,token: token  });
    }
    catch(err){
       console.log(err);
       res.status(500).json({error: 'internal server error'});
    }
    
});

//profile route
router.get('/profile',jwtAuthMiddleware, async(req,res) =>{
    try{
        let userData = req.user;
        console.log("user data: ",userData);

        let userId = userData.id;
        let user = await Person.findById(userId);

        res.status(200).json({user});
    }catch(err){
        console.error(err);
        res.status(500).json({error: 'internal server error'});
    }
})

router.post('/login', async(req,res)=>{
    try{
        //extract username and password from request body
        let {username,password} = req.body;

        let user = await Person.findOne({username: username});
        if(!user || !(await user.comparePassword(password))){
            return res.status(404).json({error:'invalid username and password'});
        }
        //generate tokens
        let payload = {
            id : user.id,
            username : user.username
        }

        let token = generateToken(payload);

        //return token as response
        res.json({token});

    }catch(err){
             console.error(err);
             res.status(500).json({error:'invalid'});
    }  
})

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