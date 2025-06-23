'use client';

import { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRightLeft, Check, Calculator } from 'lucide-react';
import { cn } from '@/lib/utils';
import { conversionEngine } from '@/lib/units';

export default function UnitConverter() {
  const [value, setValue] = useState('');
  const [category, setCategory] = useState('');
  const [fromUnit, setFromUnit] = useState('');
  const [toUnit, setToUnit] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [fromOpen, setFromOpen] = useState(false);
  const [toOpen, setToOpen] = useState(false);

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
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <h1 className="text-4xl font-bold">Unit Converter</h1>
          <Calculator className="h-8 w-8 text-primary" />
        </div>
        <p className="text-muted-foreground">
          Convert between different units of measurement
        </p>
      </div>

      <Card>
        <CardContent className="p-8 space-y-8">
          <div className="space-y-3">
            <Label htmlFor="value">Enter Value</Label>
            <Input
              id="value"
              placeholder="Enter a number"
              value={value}
              onChange={handleValueChange}
              className="h-12 text-lg"
              autoComplete="off"
            />
          </div>

          <div className="space-y-3">
            <Label>Category</Label>
            <Select value={category} onValueChange={handleCategoryChange}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    <div>
                      <div className="font-medium">{cat.name}</div>
                      {cat.description && (
                        <div className="text-sm text-muted-foreground">
                          {cat.description}
                        </div>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {category && availableUnits.length > 0 && (
            <div className="grid lg:grid-cols-3 gap-6 items-end">
              <div className="space-y-3">
                <Label>From Unit</Label>
                <div className="relative">
                  <Command>
                    <CommandInput
                      placeholder="Search units"
                      className="h-12"
                      value={
                        fromOpen ? undefined : findUnit(fromUnit)?.label || ''
                      }
                      onFocus={() => {
                        setFromOpen(true);
                        setToOpen(false);
                      }}
                      onBlur={() => setTimeout(() => setFromOpen(false), 150)}
                    />
                    {fromOpen && (
                      <div className="absolute top-full left-0 right-0 z-50 mt-1">
                        <CommandList className="max-h-60 border rounded-lg bg-popover shadow-lg">
                          <CommandEmpty className="p-4 text-sm text-muted-foreground">
                            No units found.
                          </CommandEmpty>
                          <CommandGroup>
                            {availableUnits.map((unit) => (
                              <CommandItem
                                key={unit.value}
                                value={`${unit.label} ${unit.symbol}`}
                                onSelect={() => {
                                  setFromUnit(unit.value);
                                  setFromOpen(false);
                                }}
                                className="flex items-center justify-between p-3"
                              >
                                <div className="flex items-center gap-2">
                                  <Check
                                    className={cn(
                                      'h-4 w-4',
                                      fromUnit === unit.value
                                        ? 'opacity-100 text-primary'
                                        : 'opacity-0'
                                    )}
                                  />
                                  <span className="font-medium">
                                    {unit.label}
                                  </span>
                                </div>
                                <span className="text-muted-foreground text-sm font-mono">
                                  {unit.symbol}
                                </span>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </div>
                    )}
                  </Command>
                </div>
              </div>

              <div className="flex justify-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleSwap}
                  disabled={!fromUnit || !toUnit}
                  className="h-12 w-12 rounded-full"
                >
                  <ArrowRightLeft className="h-5 w-5" />
                </Button>
              </div>

              <div className="space-y-3">
                <Label>To Unit</Label>
                <div className="relative">
                  <Command>
                    <CommandInput
                      placeholder="Search units"
                      className="h-12"
                      value={toOpen ? undefined : findUnit(toUnit)?.label || ''}
                      onFocus={() => {
                        setToOpen(true);
                        setFromOpen(false);
                      }}
                      onBlur={() => setTimeout(() => setToOpen(false), 150)}
                    />
                    {toOpen && (
                      <div className="absolute top-full left-0 right-0 z-50 mt-1">
                        <CommandList className="max-h-60 border rounded-lg bg-popover shadow-lg">
                          <CommandEmpty className="p-4 text-sm text-muted-foreground">
                            No units found.
                          </CommandEmpty>
                          <CommandGroup>
                            {availableUnits.map((unit) => (
                              <CommandItem
                                key={unit.value}
                                value={`${unit.label} ${unit.symbol}`}
                                onSelect={() => {
                                  setToUnit(unit.value);
                                  setToOpen(false);
                                }}
                                className="flex items-center justify-between p-3"
                              >
                                <div className="flex items-center gap-2">
                                  <Check
                                    className={cn(
                                      'h-4 w-4',
                                      toUnit === unit.value
                                        ? 'opacity-100 text-primary'
                                        : 'opacity-0'
                                    )}
                                  />
                                  <span className="font-medium">
                                    {unit.label}
                                  </span>
                                </div>
                                <span className="text-muted-foreground text-sm font-mono">
                                  {unit.symbol}
                                </span>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </div>
                    )}
                  </Command>
                </div>
              </div>
            </div>
          )}

          {result !== null && value && fromUnit && toUnit && (
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6 text-center space-y-4">
                <p className="text-sm text-muted-foreground">Result</p>
                <div className="space-y-2">
                  <p className="text-3xl font-bold">
                    {result.toLocaleString(undefined, {
                      maximumFractionDigits: 12,
                      minimumFractionDigits: 0,
                    })}
                  </p>
                  <p className="text-muted-foreground">
                    {findUnit(toUnit)?.symbol}
                  </p>
                </div>

                <div className="text-sm text-muted-foreground border-t pt-3">
                  {value} {findUnit(fromUnit)?.symbol} ={' '}
                  {result.toLocaleString(undefined, {
                    maximumFractionDigits: 12,
                    minimumFractionDigits: 0,
                  })}{' '}
                  {findUnit(toUnit)?.symbol}
                </div>

                {(() => {
                  const conversionFactor = getConversionFactor();
                  if (!conversionFactor) return null;

                  return (
                    <div className="text-xs text-muted-foreground bg-muted/30 rounded p-3">
                      <span className="font-medium">Note:</span> 1{' '}
                      {conversionFactor.fromSymbol} ={' '}
                      {conversionFactor.factor.toLocaleString(undefined, {
                        maximumFractionDigits: 8,
                        minimumFractionDigits: 0,
                      })}{' '}
                      {conversionFactor.toSymbol}
                    </div>
                  );
                })()}
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
