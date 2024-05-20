import AuthenticatedRoute from '../authenticated-route';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class RentalsRentalRoute extends AuthenticatedRoute {
  @service authentication;

  async model(params) {
    let propertyId = params.rental_id;

    // set View count

    let data = JSON.parse(this.authentication.user);
    let response = await fetch(
      `https://rental-ember.up.railway.app/rentals/${propertyId}/views`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: parseInt(data.userID) }),
      },
    );
    let viewCount = await response.json();

    let url = `https://rental-ember.up.railway.app/rentals/${propertyId}`;
    response = await fetch(url);
    let properties = await response.json();

    let seller_id = properties.sellerID;

    // seller details

    url = `https://rental-ember.up.railway.app/users/${seller_id}`;
    response = await fetch(url);
    let seller = await response.json();

    return {
      ...seller,
      ...properties,
    };
  }

  setupController(controller, model) {
    super.setupController(controller, model);
    controller.set('model', model);
    // Call the action defined in the controller
    controller.send('sendEmail');
  }
}
