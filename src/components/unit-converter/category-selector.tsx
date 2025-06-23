import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { UnitCategory } from '@/lib/units/types';

interface CategorySelectorProps {
  categories: UnitCategory[];
  value: string;
  onValueChange: (value: string) => void;
}

export default function CategorySelector({
  categories,
  value,
  onValueChange,
}: CategorySelectorProps) {
  return (
    <div className="space-y-3">
      <Label>Category</Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger>
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
  );
}
