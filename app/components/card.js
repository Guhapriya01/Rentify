import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class CardComponent extends Component {
  @tracked likeCount = 0;
  @tracked viewCount = 0;

  @service propertyStats;
  @service authentication;
  @service router;

  constructor() {
    super(...arguments);
    this.loadLikeCount();
    this.loadViewCount();
  }

  async loadLikeCount() {
    this.likeCount = await this.propertyStats.fetchLikeCount(
      this.args.property.propertyID
    );
  }

  async loadViewCount() {
    this.viewCount = await this.propertyStats.fetchViewCount(
      this.args.property.propertyID
    );
  }

  @action
  async toggleLike() {
    let data = JSON.parse(this.authentication.user);

    if (!data) {
      this.router.transitionTo('login');
    }
    this.likeCount = await this.propertyStats.toggleLike(
      this.args.property.propertyID,
      data.userID
    );
  }
}
