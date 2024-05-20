import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class SellerIndexController extends Controller {
  @service router;

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
  async add() {
    const formData = new FormData(document.getElementById('add-form'));

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
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok)
      this.myAlert('Unable to add! Try again later.', '#ee1f1f');
    else this.myAlert('Added successfully!', '#3fc235');
    document.getElementById('add-form').reset();

    // refresh model
    await this.send('refreshModel');
  }

  @action
  async delete(id) {
    let data = await fetch(
      'https://rental-ember.up.railway.app/rentals/seller/' + id,
      {
        method: 'DELETE',
      }
    ).then((response) => {
      if (!response.ok)
        this.myAlert('Unable to delete ! Try again later.', '#ee1f1f');
      else this.myAlert('Deleted successfully!', '#3fc235');
    });

    // refresh model
    await this.send('refreshModel');
  }
}
