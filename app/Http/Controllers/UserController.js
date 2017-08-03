'use strict'

const Database = use('Database')
const Helpers = use('Helpers')
const User = use('App/Model/User')
const Hash = use('Hash')

class ProfileController {

  * index (request, response) {
	  var authID = yield request.session.get('adonis-auth')
	  const users = yield User.all()
    yield response.sendView('users/users',{ users: users.toJSON() }) 
  }

  * edit (request, response) {
  	const userId = request.param('id')
	  var user = yield User.find(userId)
    if(userId){
    	yield response.sendView('users/edit',{ user: user.toJSON() }) 
    } else{
    	yield response.sendView('users/add')
    }
  }

  * update (request, response) {
	  const userId = request.input('id')
	  const user = {}
    user.firstname = request.input('firstname')
    user.lastname = request.input('lastname')
    user.email = request.input('email')
    user.role = request.input('role')
    if(request.input('password')){
    	user.password = yield Hash.make(request.input('password'))
    }

    var userWithEmail = yield Database.from('users').where('email', user.email).where('id', '!=', userId)
    if(userWithEmail.length > 0){
      yield request.with({error: "User with this email already exist!"}).flash()
      response.redirect('back')
    }

    try {
      yield Database.table('users').where('id', userId).update(user)
      yield request.with({error: "Record updated successfully!"}).flash()
      response.redirect('/users')
    } catch (e) {
      yield request.with({error: e.message}).flash()
      response.redirect('back')
    }
  }

  * add (request, response) {
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
      response.route('/users')
    } catch (e) {
      yield request.with({error: e.message}).flash()
      response.redirect('back')
    }
  }

  * delete (request, response) {
	  const userId = request.param('id')
	  const user = yield User.findBy('id', userId)
		yield user.delete()
    yield request.with({error: "Record deleted successfully!"}).flash()
    response.redirect('/users')
  }

  * statusToggle (request, response) {
    const userId = request.param('id')
    const status = request.param('status')
    const user = {}
    user.active = status
    try {
      yield Database.table('users').where('id', userId).update(user)
      yield request.with({error: "Record updated successfully!"}).flash()
      response.redirect('/users')
    } catch (e) {
      yield request.with({error: e.message}).flash()
      response.redirect('back')
    }
  }

}

module.exports = ProfileController