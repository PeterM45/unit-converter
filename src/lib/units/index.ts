import { ConversionEngine } from './conversion-engine';
import { lengthCategory } from './categories/length';
import { weightCategory } from './categories/weight';
import { temperatureCategory } from './categories/temperature';
import { volumeCategory } from './categories/volume';
import { energyCategory } from './categories/energy';

const categories = [
  lengthCategory,
  weightCategory,
  temperatureCategory,
  volumeCategory,
  energyCategory,
];

export const conversionEngine = new ConversionEngine(categories);

export type { UnitCategory, Unit } from './types';
export {
  lengthCategory,
  weightCategory,
  temperatureCategory,
  volumeCategory,
  energyCategory,
};
