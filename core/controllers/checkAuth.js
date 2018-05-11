const isEmpty = require('lodash/isEmpty')

/**
 * Check if user is authenticated for reserved routes
 * @param {object} req 
 * @param {object} res 
 * @param {function} next 
 */
const checkAuth  = (req, res, next)  => {
	console.log('Analysing for', req.url)
	const locals = req.app.locals;

	if(!locals.authenticated){
		res.redirect(401, 'unauthorised');
		console.log('check the locals', locals)
		return;
	}
	
	// don't serve /secure to those not logged in
	// you should add to this list, for each and every secure url
	const options = {
		user : req.body.username,
		isAuthenticated: locals.authenticated,
		status: 200
	}
	
	console.log('User authorised')
	res.render('welcome', options);
}

module.exports = checkAuth