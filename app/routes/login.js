import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class LoginRoute extends Route {
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
        this.router.transitionTo('seller.index', data.userID);
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
  async login() {
    const formData = new FormData(document.getElementById('add-form'));

    let password = document.getElementById('pwd').value;
    let email = document.getElementById('email').value;

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

    let data = await fetch('https://rental-ember.up.railway.app/login', {
      method: 'POST',
      body: formData,
    }).then((response) => {
      if (response.ok) {
        let data = response.json();
        this.myAlert('Logged In Successfully!', '#3fc235');
        return data;
      } else {
        let r = response;

        if (r.status == 401) {
          this.myAlert('Invalid credentials provided!', '#ee1f1f');
          this.router.transitionTo('login');
        } else if (r.status == 404) {
          this.myAlert(
            'User does not exists! Create an account to login!',
            '#ee1f1f'
          );
          this.router.transitionTo('signup');
        } else {
          this.myAlert('Failed to Login!', '#ee1f1f');
          this.router.transitionTo('home');
        }
      }
    });

    if (data) {
      this.authentication.setUser(JSON.stringify(data));
      if (data.userType == 'Buyer') {
        this.router.transitionTo('rentals');
      } else {
        this.router.transitionTo('seller', data.userID);
      }
    }
  }
}
