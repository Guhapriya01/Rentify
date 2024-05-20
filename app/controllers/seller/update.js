import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class SellerUpdateController extends Controller {
  @service router;
  @service authentication;

  showSuccessToast(color, text) {
    var x = document.getElementById('snackbar');
    x.className = 'show';
    x.innerHTML = text;
    x.style.backgroundColor = color;
    setTimeout(function () {
      x.className = x.className.replace('show', '');
    }, 3000);
  }

  myAlert(text, color) {
    this.showSuccessToast(color, text);
  }

  @action
  async update() {
    let data = JSON.parse(this.authentication.user);
    const formData = new FormData(document.getElementById('update-form'));

    var numberOfBathrooms = document.getElementById(
      'number_of_bathrooms'
    ).value;

    var numberOfBedrooms = document.getElementById('number_of_bedrooms').value;
    var price = document.getElementById('price').value;

    if (
      !numberOfBathrooms ||
      numberOfBathrooms < 0 ||
      !numberOfBedrooms ||
      numberOfBedrooms < 0
    ) {
      this.myAlert(
        'Enter valid number for number of bathrooms and bedrooms.',
        '#ee1f1f'
      );
      return false;
    }

    if (!price || price < 0) {
      this.myAlert('Enter valid value for price.', '#ee1f1f');
      return false;
    }

    var address = document.getElementById('address').value;
    var areaSqFt = document.getElementById('area_sq_ft').value;
    var description = document.getElementById('description').value;
    var nearbyLandmarks = document.getElementById('nearby_landmarks').value;
    var propertyType = document.getElementById('property_type').value;
    var title = document.getElementById('title').value;

    if (
      !description ||
      !address ||
      !areaSqFt ||
      !nearbyLandmarks ||
      !propertyType ||
      !title
    ) {
      this.myAlert('Please enter all the details !', '#ee1f1f');
      return false;
    }
    let response = await fetch(
      'https://rental-ember.up.railway.app/rentals/seller',
      {
        method: 'PUT',
        body: formData,
      }
    );
    if (!response.ok)
      this.myAlert('Unable to update! Try again later.', '#ee1f1f');
    else this.myAlert('Updated successfully!', '#3fc235');

    this.router.transitionTo('seller.index', data.userID);
  }
}
