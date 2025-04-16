// frontend/src/components/compare/stock-search-bar.tsx

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface Props {
  selected: string[];
  setSelected: (stocks: string[]) => void;
}

export function StockSearchBar({ selected, setSelected }: Props) {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    const symbol = input.toUpperCase().trim();
    if (symbol && !selected.includes(symbol)) {
      setSelected([...selected, symbol]);
    }
    setInput("");
  };

  const handleRemove = (symbol: string) => {
    setSelected(selected.filter((s) => s !== symbol));
  };

  return (
    <div className="mb-4">
      <div className="flex gap-2">
        <Input
          placeholder="Enter stock symbol (e.g., AAPL)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        />
        <Button onClick={handleAdd}>Add</Button>
      </div>
      <div className="flex gap-2 mt-3 flex-wrap">
        {selected.map((symbol) => (
          <Badge key={symbol} variant="outline" className="flex items-center gap-1">
            {symbol}
            <X size={14} onClick={() => handleRemove(symbol)} className="cursor-pointer" />
          </Badge>
        ))}
      </div>
    </div>
  );
}
