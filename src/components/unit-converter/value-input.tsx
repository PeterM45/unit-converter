import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ValueInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ValueInput({ value, onChange }: ValueInputProps) {
  return (
    <div className="space-y-3">
      <Label htmlFor="value">Enter Value</Label>
      <Input
        id="value"
        placeholder="Enter a number"
        value={value}
        onChange={onChange}
        className="h-12 text-lg"
        autoComplete="off"
      />
    </div>
  );
}
