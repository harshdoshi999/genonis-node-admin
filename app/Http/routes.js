'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')

// Demo Routes
// Route.on('/').render('welcome')

/*Default Routes*/
Route.get('/','IndexController.index').middleware('toDashboard')
Route.get('/dashboard','DashboardController.index').middleware('toLogin')

/*Account Routes*/
Route.get('/login','AuthController.index').middleware('toDashboard')
Route.post('/login','AuthController.login').middleware('toDashboard')
Route.on('/signup').render('signup').middleware('toDashboard')
Route.post('/signup','AuthController.signup')
Route.on('/reset').render('reset').middleware('toDashboard')
Route.post('/reset','AuthController.reset')
Route.get('/logout','AuthController.logout')

/*Profile Routes*/
Route.get('/profile','ProfileController.view').middleware('toLogin')
Route.on('/profile/edit').render('profile/edit').middleware('toLogin')
Route.post('/profile/save','ProfileController.save').middleware('toLogin')
Route.post('/profile/changeavatar','ProfileController.changeavatar').middleware('toLogin')

/*Users module Routes*/
Route.get('/users','UserController.index').middleware('toLogin')
Route.get('/user/edit/:id','UserController.edit').middleware('toLogin')
Route.post('/user/update','UserController.update').middleware('toLogin')
Route.get('/user/add','UserController.edit').middleware('toLogin')
Route.post('/user/add','UserController.add').middleware('toLogin')
Route.get('/user/delete/:id','UserController.delete').middleware('toLogin')
Route.get('/user/status/:id/:status','UserController.statusToggle').middleware('toLogin')

/*Categories module Routes*/
Route.get('/categories','CategoryController.index').middleware('toLogin')
Route.get('/category/edit/:id','CategoryController.edit').middleware('toLogin')
Route.post('/category/update','CategoryController.update').middleware('toLogin')
Route.get('/category/add','CategoryController.edit').middleware('toLogin')
Route.post('/category/add','CategoryController.add').middleware('toLogin')
Route.get('/category/delete/:id','CategoryController.delete').middleware('toLogin')

/*Posts module Routes*/
Route.get('/posts','PostController.index').middleware('toLogin')
Route.get('/post/edit/:id','PostController.edit').middleware('toLogin')
Route.post('/post/update','PostController.update').middleware('toLogin')
Route.get('/post/add','PostController.edit').middleware('toLogin')
Route.post('/post/add','PostController.add').middleware('toLogin')
Route.get('/post/delete/:id','PostController.delete').middleware('toLogin')

/*Posts module Routes*/
Route.get('/todos','TodoController.index').middleware('toLogin')
// Route.get('/post/edit/:id','PostController.edit').middleware('toLogin')
// Route.post('/post/update','PostController.update').middleware('toLogin')
// Route.get('/post/add','PostController.edit').middleware('toLogin')
// Route.post('/post/add','PostController.add').middleware('toLogin')
// Route.get('/post/delete/:id','PostController.delete').middleware('toLogin')

/*Misc Routes*/
Route.on('/inprogress').render('comingsoon')