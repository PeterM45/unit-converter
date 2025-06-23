import { useState } from 'react';
import { Label } from '@/components/ui/label';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UnitOption {
  value: string;
  label: string;
  symbol: string;
  category: string;
}

interface UnitSelectorProps {
  label: string;
  units: UnitOption[];
  selectedUnit: string;
  onUnitSelect: (unitValue: string) => void;
  placeholder?: string;
}

export default function UnitSelector({
  label,
  units,
  selectedUnit,
  onUnitSelect,
  placeholder = 'Search units',
}: UnitSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const findUnit = (unitValue: string) => {
    return units.find((unit) => unit.value === unitValue);
  };

  return (
    <div className="space-y-3">
      <Label>{label}</Label>
      <div className="relative">
        <Command>
          <CommandInput
            placeholder={placeholder}
            className="h-12"
            value={isOpen ? undefined : findUnit(selectedUnit)?.label || ''}
            onFocus={() => setIsOpen(true)}
            onBlur={() => setTimeout(() => setIsOpen(false), 150)}
          />
          {isOpen && (
            <div className="absolute top-full left-0 right-0 z-50 mt-1">
              <CommandList className="max-h-60 border rounded-lg bg-popover shadow-lg">
                <CommandEmpty className="p-4 text-sm text-muted-foreground">
                  No units found.
                </CommandEmpty>
                <CommandGroup>
                  {units.map((unit) => (
                    <CommandItem
                      key={unit.value}
                      value={`${unit.label} ${unit.symbol}`}
                      onSelect={() => {
                        onUnitSelect(unit.value);
                        setIsOpen(false);
                      }}
                      className="flex items-center justify-between p-3"
                    >
                      <div className="flex items-center gap-2">
                        <Check
                          className={cn(
                            'h-4 w-4',
                            selectedUnit === unit.value
                              ? 'opacity-100 text-primary'
                              : 'opacity-0'
                          )}
                        />
                        <span className="font-medium">{unit.label}</span>
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
  );
}
