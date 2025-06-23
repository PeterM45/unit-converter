import { Card, CardContent } from '@/components/ui/card';

interface ConversionFactorData {
  factor: number;
  fromSymbol: string;
  toSymbol: string;
  fromName: string;
  toName: string;
}

interface ConversionResultProps {
  result: number;
  value: string;
  fromUnit: string;
  toUnit: string;
  findUnit: (
    unitValue: string
  ) => { symbol: string; label: string } | undefined;
  conversionFactor: ConversionFactorData | null;
}

export default function ConversionResult({
  result,
  value,
  fromUnit,
  toUnit,
  findUnit,
  conversionFactor,
}: ConversionResultProps) {
  const fromUnitData = findUnit(fromUnit);
  const toUnitData = findUnit(toUnit);

  if (!fromUnitData || !toUnitData) return null;

  return (
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
          <p className="text-muted-foreground">{toUnitData.symbol}</p>
        </div>

        <div className="text-sm text-muted-foreground border-t pt-3">
          {value} {fromUnitData.symbol} ={' '}
          {result.toLocaleString(undefined, {
            maximumFractionDigits: 12,
            minimumFractionDigits: 0,
          })}{' '}
          {toUnitData.symbol}
        </div>

        {conversionFactor && (
          <div className="text-xs text-muted-foreground bg-muted/30 rounded p-3">
            <span className="font-medium">Note:</span> 1{' '}
            {conversionFactor.fromSymbol} ={' '}
            {conversionFactor.factor.toLocaleString(undefined, {
              maximumFractionDigits: 8,
              minimumFractionDigits: 0,
            })}{' '}
            {conversionFactor.toSymbol}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
