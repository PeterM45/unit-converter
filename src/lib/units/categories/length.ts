import type { UnitCategory } from '../types';

export const lengthCategory: UnitCategory = {
  id: 'length',
  name: 'Length',
  description: 'Distance and length measurements',
  baseUnit: 'm',
  units: {
    // Metric system
    m: { symbol: 'm', name: 'Meter', factor: 1 },
    km: { symbol: 'km', name: 'Kilometer', factor: 1000 },
    cm: { symbol: 'cm', name: 'Centimeter', factor: 0.01 },
    mm: { symbol: 'mm', name: 'Millimeter', factor: 0.001 },
    μm: { symbol: 'μm', name: 'Micrometer', factor: 0.000001 },
    nm: { symbol: 'nm', name: 'Nanometer', factor: 0.000000001 },

    // Imperial system
    in: { symbol: 'in', name: 'Inch', factor: 0.0254 },
    ft: { symbol: 'ft', name: 'Foot', factor: 0.3048 },
    yd: { symbol: 'yd', name: 'Yard', factor: 0.9144 },
    mi: { symbol: 'mi', name: 'Mile', factor: 1609.34 },

    // Nautical
    nmi: { symbol: 'nmi', name: 'Nautical Mile', factor: 1852 },
    fathom: { symbol: 'fathom', name: 'Fathom', factor: 1.8288 },

    // Astronomical
    au: { symbol: 'AU', name: 'Astronomical Unit', factor: 149597870700 },
    ly: { symbol: 'ly', name: 'Light Year', factor: 9460730472580800 },
    pc: { symbol: 'pc', name: 'Parsec', factor: 30856775814913672.789 },
  },
};
