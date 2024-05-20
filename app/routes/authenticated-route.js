import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  authentication: service(),
  router: service(),

  beforeModel() {
    if (!this.authentication.user) {
      this.router.transitionTo('login');
    }
  },
});
