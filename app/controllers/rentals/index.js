// import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

// export default class RentalsIndexController extends Controller {
//   queryParams = [
//     'propertyType',
//     'minPrice',
//     'maxPrice',
//     'minBedrooms',
//     'maxBedrooms',
//   ];

//   @tracked propertyType = null;
//   @tracked minPrice = null;
//   @tracked maxPrice = null;
//   @tracked minBedrooms = null;
//   @tracked maxBedrooms = null;

//   // Temporary variables for holding input values
//   @tracked tempPropertyType = null;
//   @tracked tempMinPrice = null;
//   @tracked tempMaxPrice = null;
//   @tracked tempMinBedrooms = null;
//   @tracked tempMaxBedrooms = null;

//   @action
//   applyFilters() {
//     this.propertyType = this.tempPropertyType;
//     this.minPrice = this.tempMinPrice;
//     this.maxPrice = this.tempMaxPrice;
//     this.minBedrooms = this.tempMinBedrooms;
//     this.maxBedrooms = this.tempMaxBedrooms;
//   }
// }
import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default class RentalsIndexController extends Controller {
  @service router;

  queryParams = [
    'propertyType',
    'minPrice',
    'maxPrice',
    'minBedrooms',
    'maxBedrooms',
    'page',
    'address',
    'perPage',
  ];
  // propertyType = '';
  // minPrice = '';
  // maxPrice = '';
  // minBedrooms = '';
  // maxBedrooms = '';

  @tracked propertyType = null;
  @tracked minPrice = null;
  @tracked maxPrice = null;
  @tracked minBedrooms = null;
  @tracked maxBedrooms = null;
  @tracked address = null;
  page = 1;
  perPage = 5;

  // Temporary variables for holding input values
  @tracked tempPropertyType = null;
  @tracked tempMinPrice = null;
  @tracked tempMaxPrice = null;
  @tracked tempMinBedrooms = null;
  @tracked tempMaxBedrooms = null;
  @tracked tempAddress = null;

  @computed('model', 'page', 'perPage')
  get paginatedRentals() {
    let start = (this.page - 1) * this.perPage;
    let end = start + this.perPage;
    return this.model.slice(start, end);
  }

  @computed('model.length', 'perPage')
  get totalPages() {
    return Math.ceil(this.model.length / this.perPage);
  }

  @computed('page', 'totalPages')
  get isFirstPage() {
    return this.page <= 1;
  }

  @computed('page', 'totalPages')
  get isLastPage() {
    return this.page >= this.totalPages;
  }

  @action
  applyFilters() {
    this.set('page', 1);
    this.propertyType = this.tempPropertyType;
    this.minPrice = this.tempMinPrice;
    this.maxPrice = this.tempMaxPrice;
    this.minBedrooms = this.tempMinBedrooms;
    this.maxBedrooms = this.tempMaxBedrooms;
    this.address = this.tempAddress;

    this.router.transitionToRoute({
      queryParams: {
        propertyType: this.propertyType,
        minPrice: this.minPrice,
        maxPrice: this.maxPrice,
        minBedrooms: this.minBedrooms,
        maxBedrooms: this.maxBedrooms,
        address: this.address,
        page: this.page,
        perPage: this.perPage,
      },
    });
  }

  @action
  clearFilters() {
    this.set('page', 1);
    this.propertyType = null;
    this.minPrice = null;
    this.maxPrice = null;
    this.minBedrooms = null;
    this.maxBedrooms = null;
    this.address = null;

    this.tempPropertyType = null;
    this.tempMinPrice = null;
    this.tempMaxPrice = null;
    this.tempMinBedrooms = null;
    this.tempMaxBedrooms = null;
    this.tempAddress = null;

    this.router.transitionToRoute({
      queryParams: {
        propertyType: this.propertyType,
        minPrice: this.minPrice,
        maxPrice: this.maxPrice,
        minBedrooms: this.minBedrooms,
        maxBedrooms: this.maxBedrooms,
        address: this.address,
        page: this.page,
        perPage: this.perPage,
      },
    });
  }

  @action
  nextPage() {
    if (!this.isLastPage) {
      this.incrementProperty('page');
    }
  }

  @action
  previousPage() {
    if (!this.isFirstPage) {
      this.decrementProperty('page');
    }
  }
}
