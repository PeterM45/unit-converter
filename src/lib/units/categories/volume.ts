import type { UnitCategory } from '../types';

export const volumeCategory: UnitCategory = {
  id: 'volume',
  name: 'Volume',
  description: 'Volume and capacity measurements',
  baseUnit: 'L',
  units: {
    // Metric system
    L: { symbol: 'L', name: 'Liter', factor: 1 },
    mL: { symbol: 'mL', name: 'Milliliter', factor: 0.001 },
    kL: { symbol: 'kL', name: 'Kiloliter', factor: 1000 },
    m3: { symbol: 'm³', name: 'Cubic Meter', factor: 1000 },
    cm3: { symbol: 'cm³', name: 'Cubic Centimeter', factor: 0.001 },

    // US liquid measurements
    gal: { symbol: 'gal', name: 'US Gallon', factor: 3.78541 },
    qt: { symbol: 'qt', name: 'US Quart', factor: 0.946353 },
    pt: { symbol: 'pt', name: 'US Pint', factor: 0.473176 },
    cup: { symbol: 'cup', name: 'US Cup', factor: 0.236588 },
    fl_oz: { symbol: 'fl oz', name: 'US Fluid Ounce', factor: 0.0295735 },
    tbsp: { symbol: 'tbsp', name: 'Tablespoon', factor: 0.0147868 },
    tsp: { symbol: 'tsp', name: 'Teaspoon', factor: 0.00492892 },

    // Imperial measurements
    uk_gal: { symbol: 'uk gal', name: 'Imperial Gallon', factor: 4.54609 },
    uk_qt: { symbol: 'uk qt', name: 'Imperial Quart', factor: 1.13652 },
    uk_pt: { symbol: 'uk pt', name: 'Imperial Pint', factor: 0.568261 },
    uk_fl_oz: {
      symbol: 'uk fl oz',
      name: 'Imperial Fluid Ounce',
      factor: 0.0284131,
    },
  },
};
