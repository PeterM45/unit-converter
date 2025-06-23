import type {
  UnitCategory,
  ConversionEngine as IConversionEngine,
} from './types';

class ConversionEngine implements IConversionEngine {
  private categories = new Map<string, UnitCategory>();

  constructor(categories: UnitCategory[]) {
    this.initialize(categories);
  }

  private initialize(categories: UnitCategory[]) {
    categories.forEach((category) => {
      this.categories.set(category.id, category);
    });
  }

  convert(
    value: number,
    fromKey: string,
    toKey: string,
    categoryId: string
  ): number {
    const category = this.categories.get(categoryId);
    if (!category) throw new Error(`Category ${categoryId} not found`);

    const fromUnit = category.units[fromKey];
    const toUnit = category.units[toKey];

    if (!fromUnit || !toUnit) {
      throw new Error(`Unit not found in category ${categoryId}`);
    }

    // Complex conversions (e.g., temperature with offset)
    if (fromUnit.toBase && toUnit.fromBase) {
      const baseValue = fromUnit.toBase(value);
      return toUnit.fromBase(baseValue);
    }

    // Linear conversions (most units)
    if (fromUnit.factor && toUnit.factor) {
      const baseValue = value * fromUnit.factor;
      return baseValue / toUnit.factor;
    }

    throw new Error('Invalid conversion configuration');
  }

  getCategory(id: string): UnitCategory | undefined {
    return this.categories.get(id);
  }

  getAllCategories(): UnitCategory[] {
    return Array.from(this.categories.values());
  }
}

export { ConversionEngine };
