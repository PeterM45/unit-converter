import { Button } from '@/components/ui/button';
import { ArrowRightLeft } from 'lucide-react';

interface SwapButtonProps {
  onSwap: () => void;
  disabled: boolean;
}

export default function SwapButton({ onSwap, disabled }: SwapButtonProps) {
  return (
    <div className="flex justify-center">
      <Button
        variant="outline"
        size="icon"
        onClick={onSwap}
        disabled={disabled}
        className="h-12 w-12 rounded-full"
      >
        <ArrowRightLeft className="h-5 w-5" />
      </Button>
    </div>
  );
}
