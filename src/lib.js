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
      // TODO: the category view should expose this information directly
      isSub: cat.name.includes(':'),
    }));
  }
  get() {
    return this.categories;
  }
  getName(id) {
    return this.categories.find(({ id: _id }) => _id === id)?.name;
  }
  getId(name) {
    return this.categories.find(({ name: _name }) => _name === name)?.id;
  }
}
