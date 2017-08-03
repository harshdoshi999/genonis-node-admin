'use strict'
const Helpers = use('Helpers')

class DashboardController {

  * index (request, response) {
    yield response.sendView('dashboard') 
  }

}

module.exports = DashboardController