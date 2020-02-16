import React from 'react';

export const toMoney = (number, compact = true) =>
  new Intl.NumberFormat('en-EN', {
    style: 'currency',
    currency: 'GBP',
    ...(compact ? { notation: 'compact' } : {}),
  }).format(number);

export const toPercent = number => `${(Math.abs(number) * 100).toFixed(2)}%`;

export class CategoriesList {
  constructor(categories) {
    this.categories = categories.map(cat => ({
      ...cat,
      isSub: !!cat.parentCategoryName,
    }));
  }
  get() {
    return this.categories;
  }
  getName(id) {
    return this.categories.find(({ id: _id }) => _id === id)?.fullName;
  }
}

export const BaseDataContext = React.createContext({});
