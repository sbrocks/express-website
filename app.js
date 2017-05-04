var express=require('express');
var path=require('path');
var favicon=require('serve-favicon');
var logger=require('morgan');
var cookieParser=require('cookie-parser');
var bodyParser=require('body-parser');
var nodemailer=require('nodemailer');
var port = process.env.PORT || 3000;

//var routes=require('./routes/index');
//var about=require('./routes/about');
//var contact=require('./routes/contact');

var app=express();

//view engine setup
app.set('views',path.join(__dirname,'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


//uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'views')));

//var router=express.Router();

//GET Home page 
app.get('/',function(req,res,next){
	res.render('index.html');
});
 
app.get('/about',function(req,res,next){
	res.render('about.html');
});

app.get('/contact',function(req,res,next){
	res.render('contact.html');
});

//send mail to a specified person with deails filled out in the website form by other users
//nodemailer sends the information about users who have filled a form
app.post('/contact/send',function(req,res,next){
	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL
        //auth should have the email and password of the person to whom the email would be send
        //the person to whom mails would be send needs to be logged in (isn't necessary)
		auth: {
			user: 'shaury29.baranwal@gmail.com',
			pass: 'shaury1234'
		}
	});

	var mailOptions = {
		from: 'John Doe <johndoe@outlook.com>',
		to: 'shaury29.baranwal@gmail.com',
		subject: 'Website Submission',
		text: 'You have a new submission with the following details... Name:'+req.body.name+' ,Email:'+req.body.email+'with message'+req.body.msg,
		html: '<p>You got a new submission with the following details</p><ul><li>Name:'+req.body.name+'</li><li>Email:'+req.body.email+'</li><li>Message:'+req.body.msg+'</li></ul>'
	};

	transporter.sendMail(mailOptions,function(error,info){
		if(error){
			console.log(error);
			res.redirect('/');
		} else{
			console.log('Message Sent: '+ info.response);
			res.redirect('/');
		}
	});
});

//app.get('/',routes);
//app.get('/about',about);
//app.get('/contact',contact);

//catch 404 and forward to error handler
app.use(function(req,res,next){
	var err = new Error('Not Found');
	err.status = 404;
	console.log(err);
	next(err);

});


//error handlers

//development error handler
//will print stacktrace
if(app.get('env')==='development'){
	app.use(function(err,req,res,next){
        res.status(err.status || 500);
        console.log(err);
        res.render('error',{
        	message:err.message,
        	error:err
        });
	});
}

//production error handler
//no stacktraces leaked to user
app.listen(port,function(){
	console.log('server running on port ' + port);
});

