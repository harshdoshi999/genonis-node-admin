'use strict'

const Database = use('Database')
const Helpers = use('Helpers')
const Category = use('App/Model/Category')
const Hash = use('Hash')

class CategoryController {

  * index (request, response) {
	  var authID = yield request.session.get('adonis-auth')
	  const categories = yield Category.query().where('uid',authID).fetch()
    yield response.sendView('categories/categories',{ categories: categories.toJSON() }) 
  }

  * edit (request, response) {
  	const catId = request.param('id')
	  var category = yield Category.find(catId)
    if(catId){
    	yield response.sendView('categories/edit',{ category: category.toJSON() }) 
    } else{
    	yield response.sendView('categories/add')
    }
  }

  * update (request, response) {
	  const catId = request.input('id')
	  const category = {}
    category.name = request.input('name')
    category.description = request.input('description')

    try {
      yield Database.table('categories').where('id', catId).update(category)
      yield request.with({error: "Record updated successfully!"}).flash()
      response.redirect('/categories')
    } catch (e) {
      yield request.with({error: e.message}).flash()
      response.redirect('back')
    }
  }

  * add (request, response) {
	  const category = new Category()
    var authID = yield request.session.get('adonis-auth')
    category.uid = authID
    category.name = request.input('name')
    category.description = request.input('description')
    try {
      yield category.save()
      response.route('/categories')
    } catch (e) {
      yield request.with({error: e.message}).flash()
      response.redirect('back')
    }
  }

  * delete (request, response) {
	  const catId = request.param('id')
	  const category = yield Category.findBy('id', catId)
		yield category.delete()
    yield request.with({error: "Record deleted successfully!"}).flash()
    response.redirect('/categories')
  }

}

module.exports = CategoryController