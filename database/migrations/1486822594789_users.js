'use strict'

const Schema = use('Schema')

class UsersTableSchema extends Schema {

  up () {
  	// this.drop('users')
    this.create('users', (table) => {
      table.increments()
      table.string('firstname', 60)
      table.string('lastname', 60)
      table.string('username').unique()
      table.string('email').unique()
      table.string('password', 60)
      table.string('imgUrl')
      table.string('role', 60)
      table.string('active', 1)
      table.timestamps()
      table.softDeletes()
    })
  }

  down () {
    this.drop('users')
  }

}

module.exports = UsersTableSchema
