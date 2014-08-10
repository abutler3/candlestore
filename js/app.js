var App = Ember.Application.create({
	LOG_TRANSITIONS: true
});

App.Router.map(function() {
  this.resource('about');
  this.resource('bio');
	this.resource('credits', { path: '/thanks' });
	this.resource('products', function() {
		this.resource('product', { path: '/:product_id' });
	});
  this.resource('contacts', function() {
  	this.resource('contact', { path: '/:contact_id' });
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

App.ApplicationAdapter = DS.FixtureAdapter.extend();


App.Product = DS.Model.extend({
  title: DS.attr('string'),
  price: DS.attr('number'),
  description: DS.attr('string'),
  isOnSale: DS.attr('boolean'),
  image: DS.attr('string'),
  reviews: DS.hasMany('review', { async: true }),
  crafter: DS.belongsTo('contact')
});

App.Product.FIXTURES = [
	{
		id: 1,
		title: 'Flint',
		price: 4,
		description: 'Flint is a hard, sedimentary cryptocrystalline form of the mineral quartz, categorized as a variety of chert.',
		isOnSale: true,
		image: 'http://img1.sunset.timeinc.net/sites/default/files/image/2000/11/candles-carved-m.jpg',
		reviews: [100,101],
		crafter: 200
	},
	{
		id: 2,
		title: 'Kindling',
		price: 6,
		description: 'Easily combustible small sticks or twigs used for starting a fire.',
		isOnSale: false,
		image: 'http://www.pkgreenshop.co.uk/ekmps/shops/123pravi/images/real-flame-colour-changing-mood-candle-[3]-804-p.jpg',
		reviews: [],
		crafter: 201
	}
];


App.Contact = DS.Model.extend({
	name: DS.attr('string'),
  about: DS.attr('string'),
  avatar: DS.attr('string'),
	products: DS.hasMany('product', { async: true })
});

App.Contact.FIXTURES = [
  {
		id: 200,
    name: 'Giamia',
    about: 'Although Giamia came from a humble spark of lightning, he quickly grew to be a great craftsman, providing all the warming instruments needed by those close to him.',
    avatar: 'http://upload.wikimedia.org/wikipedia/commons/7/7f/Laptop_multimedia.jpg',
		products: [1]
  },
  {
		id: 201,
    name: 'Anostagia',
    about: 'Knowing there was a need for it, Anostagia drew on her experience and spearheaded the Flint & Flame storefront. In addition to coding the site, she also creates a few products available in the store.',
    avatar: 'http://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_bw.jpg',
		products: [2]
  }
];


App.ProductsRoute = Ember.Route.extend({
	model: function() {
		return this.store.findAll('product');
	}
});

App.ContactsRoute = Ember.Route.extend({
  model: function() {
    return this.store.findAll('contact');
  }
});



App.ContactRoute = Ember.Route.extend({
  model: function(params) {
     return this.store.find('contact', params.contact_id);;
  }
});

App.Review = DS.Model.extend({
	text: DS.attr('string'),
	reviewedAt: DS.attr('date'),
	product: DS.belongsTo('product')
});

App.Review.FIXTURES = [
	{ id: 100,
		product: 1,
		text: "Great long-lasting scent!"
	},
	{ id: 101,
		product: 1,
		text: "The wick fell apart on mine and it was replaced at no charge."
	}
];
