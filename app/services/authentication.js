import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class AuthenticationService extends Service {
  @tracked user;
  @service router;

  constructor() {
    super(...arguments);
    let value = localStorage.getItem('user');
    this.user = value ? value : null;
  }

  setUser(user) {
    localStorage.setItem('user', user);
    this.user = user;
  }

  logout() {
    localStorage.removeItem('user');
    this.user = null;
    this.router.transitionTo('home');
  }
}
