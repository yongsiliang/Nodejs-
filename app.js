
var express = require("express")
var path = require('path')
var bodyParser = require('body-parser')
var router = require('./router')
var session = require('express-session')

var app=express()

app.use('/public/',express.static(path.join(__dirname,'./public/')))
app.use('/node_modules',express.static(path.join(__dirname,'./node_modules/')))

//在node 中，有很多第三方模板引擎都可以使用，不是只有art-template
app.engine('html',require('express-art-template'))
app.set('views',path.join(__dirname,'./views'))//默认就是./views目录

//配置解析表单 post 请求体插件 ，必须在app.use(router)路由之前
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//在express 这个框架中，默认不支持 Session 和 Cookie
//但是我们可以使用第三方中间件：express-session 来解决
//1、npm i expression-session
//2、配置（）一定要在路由之前
//3、使用    https://www.npmjs.com/
//		当把这个插件配置好之后，就可以通过 req.session 来访问和配置 Session 成员了
//		添加session 数据   req.session.foo = 'bar'
//		访问session数据	  req.session.foo

app.use(session({
	//配置加密字符串，他会在原有的加密字符串上和这个字符串拼起来加密
	//目的是为了增加安全性，防止客户端伪造
  secret: 'placeholder',
  resave: false,
  //无论你是否使用 Session ，我们都直接给你分配一把钥匙
  saveUninitialized: true
}))



//把路由挂载到app中
app.use(router)

app.listen(3000,function(){
	console.log("running myblog...")
})
