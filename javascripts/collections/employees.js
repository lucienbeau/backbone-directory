var app = app || {};

(function() {
  'use strict';

  app.Employees = Backbone.Collection.extend({
    model: app.Employee,

    localStorage: new Backbone.LocalStorage('employees-backbone')
  });

})();
