'use strict';

const adapt = (item) => {
    return {
        productNumber: +item.productNumber,
        model: item.model,
        licencePlate: item.licencePlate,
        rating: item.rating,
        year: +item.year
    }
}

module.exports = { adapt }