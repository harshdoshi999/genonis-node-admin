'use strict'

class RedirectDashboard {
  * handle (request, response, next) {
    const loggedIn = yield request.session.get('loggedIn');
		if(loggedIn){
			response.route('dashboard')
		}
		yield next
  }
}
module.exports = RedirectDashboard