const axios=require('axios')
//For rendering routes




exports.homeRoutes=(req,res)=>{
    //make a get request to api/users
    axios.get('http://localhost:3030/api/users')
    .then(function(response){
        console.log("Response    ------")
        console.log(response.data)
        res.render('index',{users:response.data})
    })
    .catch(err=>{
        res.send(err)
    })
}

exports.add_user=(req,res)=>{
    res.render('add_user')
    console.log("Rendered")
}

exports.update_user=(req,res)=>{
    axios.get('http://localhost:3030/api/users',{params:{id:req.query.id}})
    .then(function(userdata){
        res.render('update_user',{user:userdata.data})
    })
    .catch(err=>{
        res.send(err)
    })
   
}