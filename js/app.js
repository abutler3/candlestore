var App = Ember.Application.create({
	LOG_TRANSITIONS: true
});

App.Router.map(function() {
  this.resource('about');
  this.resource('bio');
	this.resource('credits', { path: '/thanks' });
	this.resource('products', function() {
		this.resource('product', { path: '/:product_id' });
		this.route('onsale');
		this.route('deals');
	});
  this.resource('contacts', function() {
  	this.resource('contact', { path: '/:contact_id' });
  });
});


App.IndexController = Ember.ArrayController.extend({
	productsCount: Ember.computed.alias('length'),
	logo: 'http://www.ikea.com/PIAimages/0092092_PE228416_S5.JPG',
	onSale: function() {
		return this.filterBy('isOnSale').slice(0,3);
	}.property('@each.isOnSale')
});



App.IndexRoute = Ember.Route.extend({
	model: function() {
		return this.store.findAll('product');
	}
});

App.ContactsIndexController = Ember.ObjectController.extend({
  contactName:  Ember.computed.alias('name'),
  avatar: 'http://upload.wikimedia.org/wikipedia/commons/7/7f/Laptop_multimedia.jpg',
  open: function() {
    return ((new Date()).getDay() === 0) ? "Closed" : "Open";
  }.property()
});

App.ContactsIndexRoute = Ember.Route.extend({
	model: function() {
    return this.store.find('contact', 201);
  }
});


App.ContactDetailsComponent = Ember.Component.extend({
  productsCount: Ember.computed.alias('contact.products.length'),
  isProductive: function() {
    return this.get('productsCount') > 0;
  }.property('productsCount')
	// # BUG - Works if 0, but will only show each maker with 1 candle
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
	},
	{
		id: 3,
		title: 'Birch Bark Shaving',
		price: 3,
		description: 'Easily combustible small sticks or twigs used for starting a fire.',
		isOnSale: true,
		image: 'http://cdn1.feelunique.com/img/products/9829/Elemis_The_Big_Glow_Twilight_Candle_Refill_1367306186.png',
		reviews: [],
		crafter: 200
	},
	{
		id: 4,
		title: 'Bow Drill',
		price: 8,
		description: 'Just keeps going and going',
		isOnSale: true,
		image: 'http://www.ikea.com/PIAimages/0092092_PE228416_S5.JPG',
		reviews: [],
		crafter: 201
	},
	{
		id: 5,
		title: 'Matches',
		price: 7,
		description: 'Orange Organge everywhere',
		isOnSale: false,
		image: 'http://www.thecandleselection.co.uk/media/catalog/product/cache/1/image/5e06319eda06f020e43594a9c230972d/f/i/file_41_44.jpg',
		reviews: [],
		crafter: 200
	},
	{
		id: 6,
		title: 'Tinder',
		price: 5,
		description: 'Yellow Yellow everywhere',
		isOnSale: false,
		image: 'http://www.papstar-shop.fr/papstar/prodpic/Bougie-boule-rond-8-cm-jaune-brosse-15653_b_0.JPG',
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

App.ProductsController = Ember.ArrayController.extend({
	sortProperties: ['title']
});

App.ProductController = Ember.ObjectController.extend({
	text: '',
	actions: {
		createReview: function() {
			var review = this.store.createRecord('review', {
				text: this.get('text'),
				product: this.get('model'),
				reviewedAt: new Date()
			});
			var controller = this;
			review.save().then(function(review){
				controller.set('text', '');
				controller.get('model.reviews').addObject(review);
			});

		}
	}
});

App.ProductsOnsaleRoute = Ember.Route.extend({
  model: function(){
		return this.modelFor('products').filterBy('isOnSale');
  }
});

App.ProductsIndexRoute = Ember.Route.extend({
  model: function(){
    return this.store.findAll('product');
  }
});


App.ProductsDealsRoute = Ember.Route.extend({
  model: function(){
    return this.modelFor('products').filter(function(product){
      return product.get('price') < 4;
    });
  }
});

App.ProductDetailsComponent = Ember.Component.extend({
	reviewsCount: Ember.computed.alias('product.reviews.length'),
	hasReviews: function() {
		return this.get('reviewsCount') > 0;
	}.property('reviewsCount')
});

App.ProductView = Ember.View.extend({
	classNames: ['row'],
	classNameBindings: ['isOnSale'],
	isOnSale: Ember.computed.alias('controller.isOnSale')
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

App.ReviewsController = Ember.ArrayController.extend({
	sortProperties: ['reviewedAt'],
	sortAscending: false
});
