var app = app || {};

(function() {
  'use strict';

  app.EmployeeDetailView = Backbone.View.extend({

    id: 'employee-detail',

    events: {
      'click #btn-back'   : 'close',
      'click #btn-delete' : 'destroy',
      'dblclick span'     : 'edit',
      'keypress input'    : 'updateOnEnter',
      'keydown input'     : 'revert',
      'blur input'        : 'update'
    },

    template: Handlebars.compile($('#employee-details').html()),

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));

      return this;
    },

    edit: function(e) {
      var $target = $(e.target);
      $target.parent().addClass('editing');
      $target.next().focus();
    },

    updateOnEnter: function(e) {
      if (e.which === 13) this.update(e);
    },

    update: function(e) {
      var $target = $(e.target);
      var value = $target.val().trim() || '<null>';
      var input = $target.attr('id');

      if (value === this.model.get(input)) {
        $target.parent().removeClass('editing');
        return;
      }

      this.model.save(input, value);
      $target.parent().removeClass('editing');
      this.render();
      Toast.alert('<span style="color: yellow">Updated</span> ' + input);
    },

    revert: function(e) {
      var $target = $(e.target);

      if (e.which === 27) {
        $target.parent().removeClass('editing');
        $target.val(this.model.get($target.attr('id')));
      }
    },

    close: function() {
      app.router.navigate('/');
      this.remove();
    },

    destroy: function() {
      Toast.alert('<span style="color: red">Deleted</span> ' 
                    + this.model.get('name'));
      this.model.destroy();
      app.router.navigate('/');
      this.remove();
    }

  });

})();
