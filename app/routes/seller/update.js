import Route from '@ember/routing/route';

export default class SellerUpdateRoute extends Route {
  async model(params) {
    let propertyId = params.rental_id;
    let url = `https://rental-ember.up.railway.app/rentals/${propertyId}`;
    let response = await fetch(url);
    let properties = await response.json();

    return properties;
  }
}
