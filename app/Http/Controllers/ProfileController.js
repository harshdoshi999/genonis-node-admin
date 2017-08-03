'use strict'

const Database = use('Database')
const Helpers = use('Helpers')
const User = use('App/Model/User')
const Hash = use('Hash')

class ProfileController {

  * view (request, response) {
	  // var user={}
	  var authID = yield request.session.get('adonis-auth')
	  var authUser = yield User.find(authID)
	  // console.log(authUser.id);return false;
	  const storagePath = Helpers.storagePath()
    yield response.sendView('profile/view') 
  }

  * save (request, response) {
  	var authID = yield request.session.get('adonis-auth')
    const user = {}
    user.firstname = request.input('firstname')
    user.lastname = request.input('lastname')
    user.email = request.input('email')
    if(request.input('password')){
    	user.password = yield Hash.make(request.input('password'))
    }
    yield Database.table('users').where('id', authID).update(user)
    try {
      yield Database.table('users').where('id', authID).update(user)
      response.route('/profile')
    } catch (e) {
      yield request.with({error: e.message}).flash()
      response.redirect('back')
    }
  }

  * changeavatar (request, response) {
  	var authID = yield request.session.get('adonis-auth')
    const avatar = request.file('file', {
      maxSize: '2mb',
      allowedExtensions: ['jpg', 'png', 'jpeg']
    })
    var id = new Date().getTime()
    const fileName = `${id}.${avatar.extension()}`
    // console.log(Helpers.storagePath().replace('storage', 'public/uploads'));return false;
    yield avatar.move(Helpers.storagePath().replace('storage', 'public/images/uploads'), fileName)
    if (!avatar.moved()) {
      response.badRequest(avatar.errors())
      return
    }
    var user = {}
    user.imgUrl = fileName
    yield Database.table('users').where('id', authID).update(user)
    // response.route('/profile')
    yield request.with({error: "Updated successfully!"}).flash()
    response.redirect('/profile')
  }

}

module.exports = ProfileController