var app = app || {};

(function() {
  'use strict';

  app.EmployeeView = Backbone.View.extend({

    tagName: 'li',

    className: 'employee-item',

    template: Handlebars.compile($("#contacts").html()),

    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.destroy);
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));

      return this;
    },

    destroy: function() {
      this.remove();
    }

  });

})();
