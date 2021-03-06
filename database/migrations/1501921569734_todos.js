'use strict'

const Schema = use('Schema')

class TodosTableSchema extends Schema {

  up () {
    this.create('todos', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('todos')
  }

}

module.exports = TodosTableSchema
