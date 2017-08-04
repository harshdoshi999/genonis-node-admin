'use strict'

const Schema = use('Schema')

class CategoriesTableSchema extends Schema {

  up () {
  	this.drop('categories')
    this.create('categories', (table) => {
      table.increments()
      table.string('uid', 60)
      table.string('name', 60)
      table.string('description', 60)
      table.timestamps()
      table.softDeletes()
    })
  }

  down () {
    this.drop('categories')
  }

}

module.exports = CategoriesTableSchema
