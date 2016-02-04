var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');


var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({
	extended: true
}));


var usersArray = [];


fs.readFile('./../users.json', function(error, data) {

	if (error) {
		console.log(error);
	}

	var parsedData = JSON.parse(data);
	usersArray = parsedData;

});

//VANAF HIER, ROUTES

app.get('/', function(request, response) {

	response.render('index');

});


app.get('/allUsers', function(request, response) {


	response.render('index', {users: usersArray});

});

app.get('/search', function(request, response) {


	response.render('form');

});

app.get('/addNewUser', function(request, response) {


	response.render('form2');

});



app.post('/searchResults', function(request, response) {

	var array = [];
	var query = ''
	var answer = []
	
	for(i in request.body){

		query += i;
	}

	console.log(query);
	var list = []

	for(i = 0; i < usersArray.length; i++){

		if(usersArray[i].firstname.includes(query) || usersArray[i].lastname.includes(query)){

			
			list.push(usersArray[i].firstname + ' ' + usersArray[i].lastname + ' ' + '(' + usersArray[i].email + ')');
						
		}


		
	}
	
	console.log(list);
	response.send(list);

});

app.post('/searchTest', function(request, response){



});


app.post('/redirect', function(request, response) {

	var newUser = {}

	newUser.firstname = request.body.firstname;
	newUser.lastname = request.body.lastname;
	newUser.email = request.body.email;

	usersArray.push(newUser);

	var stringedArray = JSON.stringify(usersArray);

	//console.log(stringedArray);

	fs.writeFile('./../users.json', stringedArray, function(err, data) {
		if (err) {
			return (err);
		}
		console.log("File has been updated:");
	});


	response.redirect('/allusers');


});

var server = app.listen(3000);