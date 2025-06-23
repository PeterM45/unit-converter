import type { UnitCategory } from '../types';

export const temperatureCategory: UnitCategory = {
  id: 'temperature',
  name: 'Temperature',
  description: 'Temperature measurements',
  baseUnit: 'C',
  units: {
    C: {
      symbol: '°C',
      name: 'Celsius',
      toBase: (value) => value,
      fromBase: (value) => value,
    },
    F: {
      symbol: '°F',
      name: 'Fahrenheit',
      toBase: (value) => (value - 32) * (5 / 9),
      fromBase: (value) => value * (9 / 5) + 32,
    },
    K: {
      symbol: 'K',
      name: 'Kelvin',
      toBase: (value) => value - 273.15,
      fromBase: (value) => value + 273.15,
    },
    R: {
      symbol: '°R',
      name: 'Rankine',
      toBase: (value) => (value - 491.67) * (5 / 9),
      fromBase: (value) => value * (9 / 5) + 491.67,
    },
  },
};
