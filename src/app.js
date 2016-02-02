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

	var query = request.body.query
	console.log(query);
	response.render('page3', {users: usersArray, search: query});
	

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