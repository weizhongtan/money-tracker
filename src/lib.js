export const toMoney = number => number.toFixed(2);

export const toPercent = number => `${(Math.abs(number) * 100).toFixed(2)}%`;
