'use strict'
const User = use('App/Model/User')

class RedirectLogin {
  * handle (request, response, next) {
    var loggedIn = yield request.session.get('loggedIn');
		if(!loggedIn){
			response.route('login')
		} else{
			var authID = yield request.session.get('adonis-auth')
  		var authUser = yield User.find(authID)
  		if(!authUser){
  			response.route('logout')
  		} else if(authUser.active == 'N'){
  			response.route('logout')
  		}
		}
		yield next
  }
}

module.exports = RedirectLogin