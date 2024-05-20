import EmberRouter from '@ember/routing/router';
import config from 'my-app/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('login');
  this.route('rentals', function () {
    this.route('rental', { path: '/:rental_id' });
  });
  this.route('signup');
  this.route('seller', function () {
    this.route('index', { path: '/:seller_id' });
    this.route('update', { path: 'update/:rental_id' });
  });
  this.route('home');
});
