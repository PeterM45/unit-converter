export interface Unit {
  symbol: string;
  name: string;
  factor?: number; // Linear conversion factor to base unit
  toBase?: (value: number) => number; // Complex conversion to base unit
  fromBase?: (value: number) => number; // Complex conversion from base unit
}

export interface UnitCategory {
  id: string;
  name: string;
  description?: string;
  units: Record<string, Unit>;
  baseUnit: string;
}

export interface ConversionEngine {
  convert(value: number, from: string, to: string, categoryId: string): number;
  getCategory(id: string): UnitCategory | undefined;
  getAllCategories(): UnitCategory[];
}
