'use strict'

const Database = use('Database')
const Helpers = use('Helpers')
const Post = use('App/Model/Post')
const Hash = use('Hash')

class PostController {

  * index (request, response) {
	  var authID = yield request.session.get('adonis-auth')
	  const posts = yield Post.query().where('uid',authID).fetch()
    yield response.sendView('posts/posts',{ posts: posts.toJSON() }) 
  }

  * edit (request, response) {
  	const postId = request.param('id')
	  var post = yield Post.find(postId)
    if(postId){
      console.log(post);
    	yield response.sendView('posts/edit',{ post: post.toJSON() }) 
    } else{
    	yield response.sendView('posts/add')
    }
  }

  * update (request, response) {
	  const catId = request.input('id')
	  const post = {}
    post.name = request.input('title')
    post.content = request.input('content')

    try {
      yield Database.table('posts').where('id', catId).update(post)
      yield request.with({error: "Record updated successfully!"}).flash()
      response.redirect('/posts')
    } catch (e) {
      yield request.with({error: e.message}).flash()
      response.redirect('back')
    }
  }

  * add (request, response) {
	  const post = new Post()
    var authID = yield request.session.get('adonis-auth')
    post.uid = authID
    post.name = request.input('title')
    post.content = request.input('content')
    try {
      yield post.save()
      response.route('/posts')
    } catch (e) {
      yield request.with({error: e.message}).flash()
      response.redirect('back')
    }
  }

  * delete (request, response) {
	  const postId = request.param('id')
	  const post = yield Post.findBy('id', postId)
		yield post.delete()
    yield request.with({error: "Record deleted successfully!"}).flash()
    response.redirect('/posts')
  }

}

module.exports = PostController