// import Route from '@ember/routing/route';

// export default class RentalsIndexRoute extends Route {
//   queryParams = {
//     propertyType: { refreshModel: true },
//     minPrice: { refreshModel: true },
//     maxPrice: { refreshModel: true },
//     minBedrooms: { refreshModel: true },
//     maxBedrooms: { refreshModel: true },
//   };

//   async model(params) {
//     let url = `https://rental-ember.up.railway.app/rentals`;
//     let response = await fetch(url);
//     let properties = await response.json();

//     if (params.propertyType) {
//       properties = properties.filter(
//         (property) => property.propertyType === params.propertyType,
//       );
//     }

//     if (params.minPrice) {
//       properties = properties.filter(
//         (property) => property.price >= params.minPrice,
//       );
//     }

//     if (params.maxPrice) {
//       properties = properties.filter(
//         (property) => property.price <= params.maxPrice,
//       );
//     }

//     if (params.minBedrooms) {
//       properties = properties.filter(
//         (property) => property.numberOfBedrooms >= params.minBedrooms,
//       );
//     }

//     if (params.maxBedrooms) {
//       properties = properties.filter(
//         (property) => property.numberOfBedrooms <= params.maxBedrooms,
//       );
//     }

//     return properties;
//   }
// }
import Route from '@ember/routing/route';

export default class RentalsIndexRoute extends Route {
  queryParams = {
    propertyType: { refreshModel: true },
    minPrice: { refreshModel: true },
    maxPrice: { refreshModel: true },
    minBedrooms: { refreshModel: true },
    maxBedrooms: { refreshModel: true },
    address: { refreshModel: true },
    page: { refreshModel: true },
    perPage: { refreshModel: true },
  };

  async model(params) {
    let url = `https://rental-ember.up.railway.app/rentals`;
    let response = await fetch(url);
    let properties = await response.json();

    // Apply filters
    if (params.propertyType) {
      properties = properties.filter(
        (property) => property.propertyType === params.propertyType
      );
    }
    if (params.minPrice) {
      properties = properties.filter(
        (property) => property.price >= params.minPrice
      );
    }
    if (params.maxPrice) {
      properties = properties.filter(
        (property) => property.price <= params.maxPrice
      );
    }
    if (params.minBedrooms) {
      properties = properties.filter(
        (property) => property.numberOfBedrooms >= params.minBedrooms
      );
    }
    if (params.maxBedrooms) {
      properties = properties.filter(
        (property) => property.numberOfBedrooms <= params.maxBedrooms
      );
    }

    if (params.address) {
      properties = properties.filter((property) =>
        property.address.toLowerCase().includes(params.address.toLowerCase())
      );
    }

    return properties;
  }
}
