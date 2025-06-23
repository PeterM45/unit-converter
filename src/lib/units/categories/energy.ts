import type { UnitCategory } from '../types';

export const energyCategory: UnitCategory = {
  id: 'energy',
  name: 'Energy',
  description: 'Energy and work measurements',
  baseUnit: 'J',
  units: {
    // SI units
    J: { symbol: 'J', name: 'Joule', factor: 1 },
    kJ: { symbol: 'kJ', name: 'Kilojoule', factor: 1000 },
    MJ: { symbol: 'MJ', name: 'Megajoule', factor: 1000000 },
    GJ: { symbol: 'GJ', name: 'Gigajoule', factor: 1000000000 },

    // Calories
    cal: { symbol: 'cal', name: 'Calorie (small)', factor: 4.184 },
    kcal: { symbol: 'kcal', name: 'Kilocalorie (food calorie)', factor: 4184 },

    // Electrical energy
    Wh: { symbol: 'Wh', name: 'Watt-hour', factor: 3600 },
    kWh: { symbol: 'kWh', name: 'Kilowatt-hour', factor: 3600000 },
    MWh: { symbol: 'MWh', name: 'Megawatt-hour', factor: 3600000000 },

    // Imperial/US
    BTU: { symbol: 'BTU', name: 'British Thermal Unit', factor: 1055.06 },
    therm: { symbol: 'therm', name: 'Therm', factor: 105506000 },

    // Atomic scale
    eV: { symbol: 'eV', name: 'Electronvolt', factor: 1.602176634e-19 },
    keV: { symbol: 'keV', name: 'Kiloelectronvolt', factor: 1.602176634e-16 },
    MeV: { symbol: 'MeV', name: 'Megaelectronvolt', factor: 1.602176634e-13 },
  },
};
