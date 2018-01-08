var app = app || {};

(function() {
  'use strict';

  app.Employee = Backbone.Model.extend({
    
    defaults: {
      name: '<null>',
      title: '<null>',
      office: '<null>',
      cell: '<null>',
      email: '<null>',
      description: '<null>',
      img: 'placeholder.gif'
    },

    toJSON: function() {
      var json = Backbone.Model.prototype.toJSON.apply(this, arguments);
      json.cid = this.cid;
      return json;
    }

  });

})();
