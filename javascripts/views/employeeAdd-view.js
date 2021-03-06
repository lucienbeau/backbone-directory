var app = app || {};

(function() {
  'use strict';

  app.EmployeeAddView = Backbone.View.extend({

    id: 'employee-add',

    template: Handlebars.compile($('#employee-add').html()),

    events: {
      'click #e-submit' : 'create',
      'click #e-back'   : 'close'
    },

    render: function() {
      this.$el.html(this.template());

      return this;
    },

    create: function() {
      app.employees.create(this.getAttrs());
      Toast.alert('Employee <span style="color:#00FF00">added</span> to contacts!');
      this.close();
    },

    close: function() {
      app.router.navigate('/');
      this.remove();
    },

    getAttrs: function(){
      return {
        name: this.$('#e-name').val().trim() || '<null>',
        title: this.$('#e-title').val().trim() || '<null>',
        office: this.$('#e-office').val().trim() || '<null>',
        cell: this.$('#e-cell').val().trim() || '<null>',
        email: this.$('#e-email').val().trim() || '<null>',
        description: this.$('#e-description').val().trim() || '<null>'
      };
    }

  });

})();
