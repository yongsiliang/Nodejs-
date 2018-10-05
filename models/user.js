
var mongoose =  require('mongoose')

//连接数据库
mongoose.connect('mongodb://localhost/test')

var Schema = mongoose.Schema

var userSchema = new Schema({
	email:{
		type:String,
		required:true
	},
	nickname:{
		type:String,
		required:true
	},
	password:{
		type:String,
		required:true
	},
	created_time:{
		type:Date,
		//这里不要写Data.now() 因为会即刻调用
		//这里直接给了一个方法Date.now
		//当你去 new model 的时候，如果你没有传递create——time,
		//则mongoose 就会调用default 指定的Date.now()方法，使用其返回值作为默认值
		default:Date.now
	},
	last_modified_time:{
		type:String,
		default:Date.now
	},
	//avater 头像
	avatar:{
		type:String,
		default:'/public/img/avatar-default.png'
	},
	//个人介绍
	bio:{
		type:String,
		default:''
	},
	//性别
	gender:{
		type:Number,
		enum:[-1,0,1],
		default:-1
	},
	birthday:{
		type:Date
	},
	status:{
		type:Number,
		//0 没有权限限制
		//1 不可以评论
		//2 不可以登录
		enum:[0,1,2],
		default:0
	}


}) 

module.exports = mongoose.model('User',userSchema)