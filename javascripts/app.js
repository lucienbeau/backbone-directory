var app=app||{};app.init=function(){app.employees=new app.Employees,app.router=new app.Router,app.appView=new app.EmployeesView,Backbone.history.start()},$(document).ready(function(){app.init()});