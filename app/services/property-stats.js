import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class PropertyStatsService extends Service {
  @tracked likeCount = 0;
  @tracked viewCount = 0;

  async fetchLikeCount(propertyId) {
    let response = await fetch(
      `https://rental-ember.up.railway.app/rentals/${propertyId}/likes`,
    );
    let likeCount = await response.json();
    this.likeCount = likeCount;
    return this.likeCount;
  }

  async fetchViewCount(propertyId) {
    let response = await fetch(
      `https://rental-ember.up.railway.app/rentals/${propertyId}/views`,
    );
    let viewCount = await response.json();
    this.viewCount = viewCount;
    return this.viewCount;
  }

  async toggleLike(propertyId, userId) {
    let response = await fetch(
      `https://rental-ember.up.railway.app/rentals/${propertyId}/likes`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: parseInt(userId) }),
      },
    );
    let likeCount = await response.json();
    this.likeCount = likeCount;
    return this.likeCount;
  }
}
