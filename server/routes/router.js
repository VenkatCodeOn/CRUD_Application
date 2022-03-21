const express=require('express')
const route=express.Router()
const services=require('../services/render')
const controller=require('../controller/controller')
//These are the routers
// route.get('/',function(req,res){
//     res.render('index')
// })
/**
 *  @description Root Route
 *  @method GET /
 */
//Instead of this method --
route.get('/',services.homeRoutes)

// route.get('/add-user',function(req,res){
//     res.render('add_user')
// })

/**
 *  @description Add users
 *  @method GET /add-user
 */
route.get('/add-user',services.add_user)

/**
 *  @description update users
 *  @method GET /update-user
 */
route.get('/update-user',services.update_user)

//API - crud
route.post('/api/users',controller.create)
route.get('/api/users',controller.find)
route.put('/api/users/:id',controller.update)       //URL paramter
route.delete('/api/users/:id',controller.delete)
//To Exports these routes
module.exports=route