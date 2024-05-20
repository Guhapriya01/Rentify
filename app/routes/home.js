import Route from '@ember/routing/route';

import { inject as service } from '@ember/service';

export default class HomeRoute extends Route {
  @service router;
  beforeModel(transition) {
    // console.log(transition.to.name);
    if (transition.to.name === 'home') {
      this.router.transitionTo('rentals');
    }
  }
}
