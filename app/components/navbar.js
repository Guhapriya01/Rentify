import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class NavbarComponent extends Component {
  @service authentication;

  @action
  logout() {
    this.authentication.logout();
  }

  get seller() {
    if (
      this.authentication.user != null &&
      this.authentication.user != undefined &&
      this.authentication.user != 'undefined'
    ) {
      let d = JSON.parse(this.authentication.user);
      if (d.userType == 'Seller') return parseInt(d.userID);
    }

    return null;
  }
}
