import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class SignupRoute extends Route {
  @service router;
  @service authentication;

  beforeModel() {
    if (
      this.authentication.user != null &&
      this.authentication.user != undefined &&
      this.authentication.user != 'undefined'
    ) {
      let data = JSON.parse(this.authentication.user);

      if (data.userType == 'Buyer') {
        this.router.transitionTo('rentals');
      } else {
        this.router.transitionTo('seller', data.userID);
      }
    }
  }

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
  async register() {
    const formData = new FormData(document.getElementById('registerForm'));

    let password = document.getElementById('password').value;
    let fname = document.getElementById('FirstName').value;
    let lname = document.getElementById('LastName').value;
    let PhoneNumber = document.getElementById('PhoneNumber').value;
    let email = document.getElementById('email').value;
    let buyer = document.getElementById('buyer').checked;
    let seller = document.getElementById('builder').checked;

    // Check if the password field is empty
    if (password == '') {
      this.myAlert('Please enter a password.', '#ee1f1f');
      return false;
    }

    if (email == '') {
      this.myAlert('Please enter a email.', '#ee1f1f');
      return false;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(email)) {
      this.myAlert('Please enter valid email.', '#ee1f1f');
      return false;
    }

    if (!buyer && !seller) {
      this.myAlert('Please select type of user.', '#ee1f1f');
      return false;
    }

    // Check if the password length is at least 8 characters
    if (password.length < 8) {
      this.myAlert('Password must be at least 8 characters long.', '#ee1f1f');
      return false;
    }

    // Check if the password contains at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
      this.myAlert(
        'Password must contain at least one uppercase letter.',
        '#ee1f1f'
      );
      return false;
    }

    // Check if the password contains at least one lowercase letter
    if (!/[a-z]/.test(password)) {
      this.myAlert(
        'Password must contain at least one lowercase letter.',
        '#ee1f1f'
      );
      return false;
    }

    // Check if the password contains at least one digit
    if (!/\d/.test(password)) {
      this.myAlert('Password must contain at least one digit.', '#ee1f1f');
      return false;
    }

    // Check if the password contains at least one special character
    if (!/[^a-zA-Z0-9]/.test(password)) {
      this.myAlert(
        'Password must contain at least one special character.',
        '#ee1f1f'
      );
      return false;
    }

    var regex = /^[A-Za-z]+$/;

    if (fname == '') {
      this.myAlert('Enter First name.', '#ee1f1f');
      return false;
    }

    if (fname.length > 20) {
      this.myAlert('First name should not exceed 20 characters.', '#ee1f1f');
      return false;
    }

    if (!regex.test(fname)) {
      this.myAlert('First name should contain only characters.', '#ee1f1f');
      return false;
    }

    if (lname == '') {
      this.myAlert('Enter Last name.', '#ee1f1f');
      return false;
    }

    if (!regex.test(lname)) {
      this.myAlert('Last name should contain only characters.', '#ee1f1f');
      return false;
    }

    if (lname.length > 20) {
      this.myAlert('Last name should not exceed 20 characters.', '#ee1f1f');
      return false;
    }

    if (PhoneNumber.length < 7 || PhoneNumber.length > 15) {
      this.myAlert('Enter valid phone number.', '#ee1f1f');
      return false;
    }

    await fetch('https://rental-ember.up.railway.app/register', {
      method: 'POST',
      body: formData,
    }).then((response) => {
      if (response.ok) {
        let data = response.json();
        this.myAlert('Registered Successfully!', '#3fc235');
        this.router.transitionTo('login');
      } else {
        let r = response;

        if (r.status == 409) {
          this.myAlert('User already Exists ! Please login !', '#ee1f1f');
          this.router.transitionTo('login');
        } else {
          this.myAlert('Failed to Login!', '#ee1f1f');
          this.router.transitionTo('home');
        }
      }
    });
  }
}
