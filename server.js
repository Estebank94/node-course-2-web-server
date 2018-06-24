const express = require('express');
const hbs = require('hbs');

var app = express();


hbs.registerPartials(__dirname + '/views/partials');
// set se usa para settear configuraciones de express k, v
// le digo a express que view engine quiero usar
app.set('view engine', 'hbs');
// le paso el absoult path
// dirname tiene el path a mi project directory
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
	var now = new Date().toString();
	console.log(`${now}: ${req.method} ${req.url}`);
	next(); //si no le pongo next nunca le aviso que termine
});

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		welcomeMessage: 'Bienvenido'
	});
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page'
	});
});


app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'Unable to handle request'
	});
});


app.listen(3000, () => {
	console.log('Server is running on port 3000');
});