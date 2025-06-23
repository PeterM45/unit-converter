import { Calculator } from 'lucide-react';

export default function ConverterHeader() {
  return (
    <div className="text-center space-y-4">
      <div className="flex items-center justify-center gap-3">
        <h1 className="text-4xl font-bold">Unit Converter</h1>
        <Calculator className="h-8 w-8 text-primary" />
      </div>
      <p className="text-muted-foreground">
        Convert between different units of measurement
      </p>
    </div>
  );
}
