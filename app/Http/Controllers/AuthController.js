'use strict'

const Database = use('Database')
const User = use('App/Model/User')
const Hash = use('Hash')

class AuthController {

  * index (request, response) { 
    yield response.sendView('login') 
  }

  * login (request, response) {
    var loginData = {};
    loginData.username = request.input('username');
    loginData.password = request.input('password');
    try {
      const authCheck = yield request.auth.attempt(loginData.username, loginData.password)
      if(authCheck){
        yield request.session.put('loggedIn', true)
        response.route('dashboard')
      } else{
        response.send('No user found!!!');
      }
    } catch (e) {
      yield request.with({error: "Username/Password mismatch!"}).flash()
      response.redirect('back')
    }
  }

  * signup (request, response) {
    const user = new User()
    user.firstname = request.input('firstname')
    user.lastname = request.input('lastname')
    user.username = request.input('username')
    user.email = request.input('email')
    user.password = yield Hash.make(request.input('password'))
    user.imgUrl = 'user.png'
    user.role = 'Admin'
    user.active = 'Y'
    try {
      yield user.save()
      response.route('login')
    } catch (e) {
      yield request.with({error: "Seems like email/username already exist!"}).flash()
      response.redirect('back')
    }
  }

  * logout (request, response) {
    yield request.session.forget('loggedIn')
    yield request.auth.logout()
    response.route('login')
  }

  * reset (request, response) {
    var loginData = {};
    loginData.email = request.input('email');
    yield request.with({error: "Under Progress!!!"}).flash()
    response.redirect('back')
  }

}

module.exports = AuthController