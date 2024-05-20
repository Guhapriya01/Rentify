import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class SellerIndexRoute extends Route {
  @service authentication;
  @service router;
  @service propertyStats;

  get userID() {
    return JSON.parse(this.authentication.user).userID;
  }

  @action
  refreshModel() {
    this.refresh();
  }

  async model(params) {
    let data = JSON.parse(this.authentication.user);

    if (data.userID != params.seller_id) {
      this.router.transitionTo('home');
    }

    let url =
      `https://rental-ember.up.railway.app/rentals/seller?id=` + data.userID;
    let response = await fetch(url);
    let properties = await response.json();

    return {
      properties,
      id: data.userID,
    };
  }
}
