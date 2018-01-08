var app = app || {};

(function() {
  'use strict';

  app.EmployeesView = Backbone.View.extend({

    el: '#page',

    events: {
      'click #add-employee'   : 'renderAddEmployee',
      'click #reset-employee' : 'resetEmployees'
    },

    initialize: function() {
      this.$app = this.$('#app');
      this.$list = this.$('#employee-list');

      this.listenTo(app.employees, 'add', this.renderView);
      this.listenTo(app.router, 'route:readEmployee', this.renderDetail);

      this.resetCollection();
    },

    renderAll: function() {
      app.employees.each(this.renderView, this);
    },

    renderView: function(employee) {
      var view = new app.EmployeeView({ model: employee });
      this.$list.append(view.render().el);
    },

    renderDetail: function(id) {
      var employee = app.employees.get(id);
      this.employeeDetailView = new app.EmployeeDetailView({ model: employee });
      this.$app.prepend(this.employeeDetailView.render().el);
    },

    renderAddEmployee: function() {
      if (this.employeeDetailView) this.employeeDetailView.remove();

      this.employeeAddView = new app.EmployeeAddView();
      this.$app.prepend(this.employeeAddView.render().el);
    },

    resetCollection: function() {
      app.employees.fetch({reset: true});

      var length = app.employees.models.length;
      if (!length) this.resetEmployees();
      else this.renderAll();
    },

    // If this is the first time visiting the page, or
    // if all employees deleted, application will
    // populate localstorage with dummy data
    resetEmployees: function() {
      if (this.employeeDetailView) this.employeeDetailView.remove();
      if (this.employeeAddView) this.employeeAddView.remove();

      var length = app.employees.models.length;
      for (var i = 0; i < length; i++) {
        app.employees.at(0).destroy();
      }
      
      app.employees.create({ name: 'John Jacobs', title: 'Chief Executive Officer', office: '555-2312', cell: '555-1882', email: 'johnjacobs@test.com', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.', img: 'male01.jpg' }
      ); 
      app.employees.create({ name: 'Lisa Distefano', title: 'Lead Programmer', office: '555-1111', cell: '555-9199', email: 'lisa.distefano@test.com', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', img: 'female01.jpg' }); 
      app.employees.create({ name: 'Bob Lee Weiner', title: 'Sales Executive', office: '555-5777', cell: '555-3274', email: 'bobweiner@test.com', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', img: 'male02.jpg' }); 
      app.employees.create({ name: 'Sarah DeLorean', title: 'Human Resources', office: '555-4717', cell: '555-7571', email: 'sarah.delorean@test.com', description: 'Lorem ipsum dolor sit amet.', img: 'female02.jpg' });
      
      app.router.navigate('/');
    }

  });

})();
