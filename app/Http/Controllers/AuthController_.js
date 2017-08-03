'use strict'

const Database = use('Database')

class AuthController {

  * index (request, response) { 
    yield response.sendView('login') 
  }

  * login (request, response) {
    var loginData = {};
    loginData.username = request.input('username');
    loginData.password = request.input('password');
    const user = yield Database.select('*').from('users').where(loginData)
    if(user.length == 1){
      yield request.session.put('user', user)
      yield request.session.put('loggedIn', true)
      response.route('dashboard')
    } else{
      response.send('No user found!!!');
    }
  }

  * signup (request, response) {
    var signupData = {};

    /*Check if user exists*/
    const users = yield Database.select('*').from('users').where({username:request.input('username'),email:request.input('email')})
    if(users.length == 1){
      response.send('Already exists. Please try creating account!!!');
    } else{
      /*If not exist then create new one and redirect to login page*/
      signupData.username = request.input('username');
      signupData.password = request.input('password');
      signupData.firstname = request.input('firstname');
      signupData.lastname = request.input('lastname');
      signupData.email = request.input('email');
      const id = yield Database.insert(signupData).into('users').returning('id');
      response.route('login')
    }
  }

  * logout (request, response) {
    yield request.session.forget('user')
    yield request.session.forget('loggedIn')
    response.route('login')
  }

}

module.exports = AuthController