const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan") 
const app = express();
const logger = require('./customMiddleware/logger');
app.use(express.json())

app.use(logger)
app.use(express.urlencoded({extended : true}));
app.use(express.static('public'))

app.use(helmet())
app.use(morgan('tiny'))

app.use(function(req,res,next){
	console.log('Authenticationn...');
	next();
})

const courses = [
	{id:1,name:'Course1'},

	{id:2,name:'Course2'},

	{id:3,name:'Course3'},
]

app.get('/',(req,res)=>{
	res.send("Hello World")
})

app.get('/api/courses',(req,res)=>{
	res.send(courses)
})

app.get('/api/courses/:id',(req,res)=>{
	const course = courses.filter(x=>x.id === parseInt(req.params.id))
	if(!course.length) res.status(404).send("Not avaiable")
	res.send(course)
})

app.get('/api/courses/:year/:month',(req,res)=>{
	res.send(req.query)
})

const port = process.env.PORT || 3000;
app.post('/api/courses',(req,res)=>{
	const cousre={
		id:courses.length + 1,
		name:req.body.name
	}
	courses.push(course)
	res.send(course)
})
app.put('/api/courses/:id',(req,res)=>{
	const course = courses.filter(x=>x.id === parseInt(req.params.id))
	if(!course.length) res.status(404).send("Not avaiable ID")
	
	course[0].name = req.body.name;
	res.send(course)
})

app.delete('/api/courses/:id',(req,res)=>{
	const course = courses.find(x=>x.id === parseInt(req.params.id))
	console.log(course)
	if(!course) res.status(404).send("Not avaiable ID")
	
	const index = courses.indexOf(course);
	courses.splice(index,1)
	res.send(course)
})

app.listen(port,()=> console.log(`Listening port number ${port}`))