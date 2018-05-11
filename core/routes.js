const util = require('util');
const isEmpty = require('lodash/isEmpty');
const isUndefined = require('lodash/isUndefined');

module.exports = function (app, multer) {

	app.get('/', function (req, res, next) {
		console.log('index page');
		res.render('index', { isAuthenticated : req.app.locals.isAuthenticated });
	});

	app.get('/welcome', function (req, res, next) {
		console.log('welcome res.locals', req.app.locals);
		const userName = req.app.locals.username ? req.body.username : 'visitor'
		res.render('welcome', { user: userName });
	});

	app.get('/secure', function (req, res, next) {
		console.log('secure section res.locals', res.locals);
		res.render('secure');
	});

	app.get('/signin', function (req, res, next) {
		console.log('signin section', res.locals);
		res.render('signin');
	});
	

	app.get('/unauthorised', function (req, res, next) {
		console.log('signin section', res.locals);
		res.render('unauthorised');
	});
	

	app.post('/signin', function (req, res, next) {
		const credentialsAreOkay = req.body.username === 'tony' && req.body.password === 'stark';
		
		// you might like to do a database look-up or something more scalable here
		if (credentialsAreOkay) {
			req.app.locals.authenticated = true;
			req.app.locals.username = req.body.username;
			
			console.log('set req.app.locals.authenticated', req.app.locals.authenticated)
			console.log('set req.app.locals.username', req.body.username)
			
			const options = {
				isAuthenticated: req.app.locals.authenticated,
				user : req.app.locals.username
			}
			
			res.render('welcome', options);
			res.redirect(301, '/secure');
		} else {
			res.redirect('/login');
		}

	});

	app.get('/login', function (req, res, next) {
		console.log('login section', res.locals);
		res.render('login');
	});

	app.post('/login', function (req, res, next) {
		const credentialsAreOkay = req.body.username === 'ugo' && req.body.password === 'aze';
		
		// you might like to do a database look-up or something more scalable here
		if (credentialsAreOkay) {
			req.app.locals.authenticated = true;
			req.app.locals.username = req.body.username;
			
			console.log('set req.app.locals.authenticated', req.app.locals.authenticated)
			console.log('set req.app.locals.username', req.body.username)
			
			const options = {
				isAuthenticated: req.app.locals.authenticated,
				user : req.app.locals.username
			}
			
			// res.render('welcome', options);
			res.redirect('/secure');
		} else {
			console.log('nope, credentials are not okay')
			res.redirect('/login');
		}

	});

	app.post('/profile', multer.array(), function (req, res, next) {
		console.log('Multer body', req.body);
		res.json(req.body);
	});
	  
	app.get('/logout', function (req, res, next) {
		req.app.locals.authenticated = false;
		delete req.app.locals.username;
		res.render('logout');
	});

	app.get('/files/:name', function (req, res, next) {
		const fileName = req.params.name;
		console.log(`Downloading a file ${fileName}`)
		const options = {
			root: '/files/',
			dotfiles: 'deny',
			headers: {
				'x-timestamp': Date.now(),
				'x-sent': true
			}
		};
		
		res.sendFile(`${fileName}.txt`, options, function (err) {
			if (err) next(err);
			console.log('Sent:', fileName);
		});
	  
	  });

};
