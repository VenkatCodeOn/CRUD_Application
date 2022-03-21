const express=require('express')
const dotenv=require('dotenv')
const morgan=require('morgan')
const bodyparser=require('body-parser')
const path=require('path')
//const { route } = require('express/lib/application')

const connectDB=require('./server/database/connection')

const app=express()

dotenv.config({path:'config.env'})      //To specify env file
const PORT=process.env.PORT || 8080

//App log request
app.use(morgan('tiny'))

//Mongo DB connection
connectDB()

//Parse request to body-parser
app.use(bodyparser.urlencoded({extended:true}))

//Set View engine
app.set('view engine','ejs')
//app.set('views',path.resolve(__dirname,'views/ejs'))

//Load asset
app.use('/css',express.static(path.resolve(__dirname,'assets/css')))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))

//Load routers
app.use('/',require('./server/routes/router'))

app.listen(PORT,()=>{console.log(`server is running on http://localhost:${PORT}`)})