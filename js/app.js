var App = Ember.Application.create({
	LOG_TRANSITIONS: true
});

App.Router.map(function() {
  this.resource('about');
  this.resource('bio');
	this.resource('credits', { path: '/thanks' });
	this.resource('products', function() {
		this.resource('product', { path: '/:title' });
	});
  this.resource('contacts', function() {
  	this.resource('contact', { path: '/:name' });
  });
});


App.IndexController = Ember.Controller.extend({
	productsCount: 6,
	logo: 'http://www.ikea.com/PIAimages/0092092_PE228416_S5.JPG',
	time: function() {
		return (new Date()).toDateString()
	}.property()
});

App.ContactsIndexController = Ember.Controller.extend({
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
		description: 'Flint is a hard, sedimentary cryptocrystalline form of the mineral quartz, categorized as a variety of chert.',
		isOnSale: true,
		image: 'http://img1.sunset.timeinc.net/sites/default/files/image/2000/11/candles-carved-m.jpg'
	},
	{
		title: 'Kindling',
		price: 6,
		description: 'Easily combustible small sticks or twigs used for starting a fire.',
		isOnSale: false,
		image: 'http://www.pkgreenshop.co.uk/ekmps/shops/123pravi/images/real-flame-colour-changing-mood-candle-[3]-804-p.jpg'
	}
];

App.CONTACTS = [
  {
    name: 'Giamia',
    about: 'Although Giamia came from a humble spark of lightning, he quickly grew to be a great craftsman, providing all the warming instruments needed by those close to him.',
    avatar: 'http://upload.wikimedia.org/wikipedia/commons/7/7f/Laptop_multimedia.jpg'
  },
  {
    name: 'Anostagia',
    about: 'Knowing there was a need for it, Anostagia drew on her experience and spearheaded the Flint & Flame storefront. In addition to coding the site, she also creates a few products available in the store.',
    avatar: 'http://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_bw.jpg'
  }
];


App.ProductsRoute = Ember.Route.extend({
	model: function() {
		return App.PRODUCTS;
	}
});

App.ContactsRoute = Ember.Route.extend({
  model: function() {
    return App.CONTACTS;
  }
});

App.ProductRoute = Ember.Route.extend({
	model: function(params) {
		return App.PRODUCTS.findBy('title', params.title);
	}
});

App.ContactRoute = Ember.Route.extend({
  model: function(params) {
    return App.CONTACTS.findBy('name', params.name);
  }
});
