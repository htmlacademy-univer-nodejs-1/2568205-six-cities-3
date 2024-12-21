
export const CreateOfferValidationMessage = {
  name: {
    minLength: 'Minimum title length must be 10',
    maxLength: 'Maximum title length must be 100',
  },
  description: {
    minLength: 'Minimum description length must be 20',
    maxLength: 'Maximum description length must be 1024',
  },
  publicationDate: {
    invalidFormat: 'publicationDate must be a valid ISO date',
  },
  previewUrl: {
    maxLength: 'Must be url',
  },
  photoUrls: {
    invalid: 'Must be array of urls'
  },

  accomodationType: {
    invalid: 'type must be value of accomodationType enum',
  },
  facility: {
    invalid: 'type must be value of facility enum',
  },
  city: {
    invalid: 'type must be value of city enum',
  },
  isFavourite: {
    invalid: 'must be true or false',
  },
  isPremium: {
    invalid: 'must be true or false',
  },
  cost: {
    invalidFormat: 'cost must be an integer',
    minValue: 'Minimum cost is 100',
    maxValue: 'Maximum cost is 100000',
  },
  rating: {
    invalidFormat: 'rating must be a float',
    minValue: 'Minimum rating is 1',
    maxValue: 'Maximum rating is 5',
  },
  guestCount: {
    invalidFormat: 'Guest count must be an integer',
    minValue: 'Minimum guest count is 100',
    maxValue: 'Maximum guest count is 100000',
  },
  roomsCount: {
    invalidFormat: 'Rooms count must be an integer',
    minValue: 'Minimum rooms count is 1',
    maxValue: 'Maximum rooms count is 8',
  },
  coordinates: {
    invalid: 'Must be an object with longitude and latitude',
  },

  userId: {
    invalidId: 'userId field must be a valid id',
  },
} as const;
