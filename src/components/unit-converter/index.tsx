'use client';

import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { conversionEngine } from '@/lib/units';

// Import our new smaller components
import ConverterHeader from './converter-header';
import ValueInput from './value-input';
import CategorySelector from './category-selector';
import UnitSelector from './unit-selector';
import SwapButton from './swap-button';
import ConversionResult from './conversion-result';

export default function UnitConverter() {
  const [value, setValue] = useState('');
  const [category, setCategory] = useState('');
  const [fromUnit, setFromUnit] = useState('');
  const [toUnit, setToUnit] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const categories = useMemo(() => conversionEngine.getAllCategories(), []);

  const availableUnits = useMemo(() => {
    if (!category) return [];
    const cat = conversionEngine.getCategory(category);
    if (!cat) return [];

    return Object.entries(cat.units).map(([key, unit]) => ({
      value: key,
      label: unit.name,
      symbol: unit.symbol,
      category: cat.name,
    }));
  }, [category]);

  useEffect(() => {
    const numValue = parseFloat(value);
    if (
      !isNaN(numValue) &&
      numValue >= 0 &&
      category &&
      fromUnit &&
      toUnit &&
      fromUnit !== toUnit
    ) {
      try {
        const converted = conversionEngine.convert(
          numValue,
          fromUnit,
          toUnit,
          category
        );
        setResult(converted);
      } catch {
        setResult(null);
      }
    } else {
      setResult(null);
    }
  }, [value, category, fromUnit, toUnit]);

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    setFromUnit('');
    setToUnit('');
    setResult(null);
  };

  const handleSwap = () => {
    if (fromUnit && toUnit) {
      setFromUnit(toUnit);
      setToUnit(fromUnit);
    }
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    // Only allow numeric input with optional decimal point
    if (inputValue === '' || /^[0-9]*\.?[0-9]*$/.test(inputValue)) {
      setValue(inputValue);
    }
  };

  const findUnit = (unitValue: string) => {
    return availableUnits.find((unit) => unit.value === unitValue);
  };

  const getConversionFactor = () => {
    if (!category || !fromUnit || !toUnit || fromUnit === toUnit) return null;

    try {
      // Calculate how many "to" units equal 1 "from" unit
      const factor = conversionEngine.convert(1, fromUnit, toUnit, category);
      const fromUnitData = findUnit(fromUnit);
      const toUnitData = findUnit(toUnit);

      if (!fromUnitData || !toUnitData) return null;

      return {
        factor,
        fromSymbol: fromUnitData.symbol,
        toSymbol: toUnitData.symbol,
        fromName: fromUnitData.label,
        toName: toUnitData.label,
      };
    } catch {
      return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <ConverterHeader />

      <Card>
        <CardContent className="p-8 space-y-8">
          <ValueInput value={value} onChange={handleValueChange} />

          <CategorySelector
            categories={categories}
            value={category}
            onValueChange={handleCategoryChange}
          />

          {category && availableUnits.length > 0 && (
            <div className="grid lg:grid-cols-3 gap-6 items-end">
              <UnitSelector
                label="From Unit"
                units={availableUnits}
                selectedUnit={fromUnit}
                onUnitSelect={setFromUnit}
              />

              <SwapButton onSwap={handleSwap} disabled={!fromUnit || !toUnit} />

              <UnitSelector
                label="To Unit"
                units={availableUnits}
                selectedUnit={toUnit}
                onUnitSelect={setToUnit}
              />
            </div>
          )}

          {result !== null && value && fromUnit && toUnit && (
            <ConversionResult
              result={result}
              value={value}
              fromUnit={fromUnit}
              toUnit={toUnit}
              findUnit={findUnit}
              conversionFactor={getConversionFactor()}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
