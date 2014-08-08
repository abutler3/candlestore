var App = Ember.Application.create({
	LOG_TRANSITIONS: true
});

App.Router.map(function() {
  this.resource('about');
  this.resource('bio');
});


App.IndexController = Ember.Controller.extend({
	productsCount: 6,
	logo: 'http://www.ikea.com/PIAimages/0092092_PE228416_S5.JPG',
	time: function() {
		return (new Date()).toDateString()
	}.property()
});
