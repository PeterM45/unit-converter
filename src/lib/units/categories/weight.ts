import type { UnitCategory } from '../types';

export const weightCategory: UnitCategory = {
  id: 'weight',
  name: 'Weight & Mass',
  description: 'Mass and weight measurements',
  baseUnit: 'kg',
  units: {
    // Metric system
    kg: { symbol: 'kg', name: 'Kilogram', factor: 1 },
    g: { symbol: 'g', name: 'Gram', factor: 0.001 },
    mg: { symbol: 'mg', name: 'Milligram', factor: 0.000001 },
    μg: { symbol: 'μg', name: 'Microgram', factor: 0.000000001 },
    t: { symbol: 't', name: 'Metric Ton', factor: 1000 },

    // Imperial system
    lb: { symbol: 'lb', name: 'Pound', factor: 0.453592 },
    oz: { symbol: 'oz', name: 'Ounce', factor: 0.0283495 },
    st: { symbol: 'st', name: 'Stone', factor: 6.35029 },
    ton: { symbol: 'ton', name: 'US Ton', factor: 907.185 },
    uk_ton: { symbol: 'uk_ton', name: 'UK Ton', factor: 1016.05 },

    // Precious metals and jewelry
    troy_oz: { symbol: 'troy oz', name: 'Troy Ounce', factor: 0.0311035 },
    carat: { symbol: 'ct', name: 'Carat', factor: 0.0002 },
  },
};
