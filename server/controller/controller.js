var UserDb=require('../model/model')

//Create and save new user ---API
exports.create=(req,res)=>{
//validate request
if(!req.body){
    res.status(400).send({message:"content can not be empty"});
return;
}
//new user
const user =new UserDb({
    name:req.body.name,
    email:req.body.email,
    gender:req.body.gender,
    status:req.body.status
})
//Save user in the db
user
.save(user)
.then(data=>{
    //res.send(data)
    res.redirect('/add-user')
})
.catch(err=>{
    res.send(500).send({
        message:err.message||"Some err occured"
    });
});
}
//Retrive and Return all users / retrive and return a single user
exports.find=(req,res)=>{
    if(req.query.id){
        const id = req.query.id;
        UserDb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found user with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving user with id " + id})
            })

    }
else{
  UserDb.find()         //To get the db
  .then(user=>{
      res.send(user)
  })  
  .catch(err=>{
      res.status(500).send({message:err.message || "Error while retrieving data"})
  })
}
}
//Update a new identified user by user id
exports.update=(req,res)=>{
 if(!req.body){
     return res
     .status(400)
     .send({message:"Data to update can not be empty"})
 }  
 const id=req.params.id ;
 UserDb.findByIdAndUpdate(id,req.body,{userFinAndModify:false})
 .then(data=>{
     if(!data){
         res.status(404).send({message:`Cannot update user with ${id}. May be user not found`})
     }else{
         res.send(data)
     }
 })
 .catch(err=>{
     res.send(500).send({message:"Not updated due to error"})
 })

}
//Delete a user with specified user id in the request
exports.delete=(req,res)=>{
    const id=req.params.id;

    UserDb.findByIdAndDelete(id)
    .then(data=>{
        if(!data){
            res.status(404).send({message:`cannot delete with the ${id} ,May be id will be wrong`})
    
        }
        else{
            res.send({
                message:"user was deleted successfully !"
            })
        }
    })
    .catch(err=>{
        res.send(500).send({
            message:"could not delete user with id = "+id
        })
    })

}