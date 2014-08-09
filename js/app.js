var App = Ember.Application.create({
	LOG_TRANSITIONS: true
});

App.Router.map(function() {
  this.resource('about');
  this.resource('bio');
	this.resource('credits', { path: '/thanks' });
	this.resource('products', { path: '/items' });
});


App.IndexController = Ember.Controller.extend({
	productsCount: 6,
	logo: 'http://www.ikea.com/PIAimages/0092092_PE228416_S5.JPG',
	time: function() {
		return (new Date()).toDateString()
	}.property()
});

App.AboutController = Ember.Controller.extend({
  contactName: 'Amber',
  avatar: 'http://upload.wikimedia.org/wikipedia/commons/7/7f/Laptop_multimedia.jpg',
  open: function() {
    return ((new Date()).getDay() === 0) ? "Closed" : "Open";
  }.property()
});

App.PRODUCTS = [
	{
		title: 'Flint',
		price: 4,
		description: 'Flint is',
		isOnSale: true,
		image: 'http://img1.sunset.timeinc.net/sites/default/files/image/2000/11/candles-carved-m.jpg'
	},
	{
		title: 'Kindling',
		price: 6,
		description: 'Easily...',
		isOnSale: false,
		image: 'http://www.pkgreenshop.co.uk/ekmps/shops/123pravi/images/real-flame-colour-changing-mood-candle-[3]-804-p.jpg'
	}
];

App.ProductsRoute = Ember.Route.extend({
	model: function() {
		return App.PRODUCTS;
	}
});
