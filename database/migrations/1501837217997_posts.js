'use strict'

const Schema = use('Schema')

class PostsTableSchema extends Schema {

	up () {
		this.drop('posts')
		this.create('posts', (table) => {
			table.string('uid', 60)
      table.string('name', 60)
      table.string('content')
			table.increments()
			table.timestamps()
		})
	}

	down () {
		this.drop('posts')
	}

}

module.exports = PostsTableSchema
