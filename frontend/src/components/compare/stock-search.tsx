// frontend/src/components/compare/stock-search.tsx
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Loader2, ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

interface StockSuggestion {
  symbol: string;
  name: string;
  exchange: string;
  price?: number;
  change?: number;
}

interface Props {
  selected: string[];
  setSelected: (stocks: string[]) => void;
}

export function StockSearchBar({ selected, setSelected }: Props) {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<StockSuggestion[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (input.length < 1) {
      setSuggestions([]);
      return;
    }

    setLoading(true);

    const controller = new AbortController();

    const fetchStockSuggestions = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/search/stocks?query=${encodeURIComponent(
            input
          )}`,
          {
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch stock suggestions");
        }

        const data = await response.json();
        setSuggestions(data.slice(0, 8));
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching stock suggestions:", error);
          setSuggestions([]);
        }
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchStockSuggestions();
    }, 300);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [input]);

  const handleAddSymbol = (symbol: string) => {
    if (!selected.includes(symbol)) {
      setSelected([...selected, symbol]);
    }
    setInput("");
  };

  const handleRemove = (symbolToRemove: string) => {
    const updatedSelected = selected.filter(
      (symbol) => symbol !== symbolToRemove
    );
    setSelected(updatedSelected);
  };

  const handleManualAdd = () => {
    const symbol = input.toUpperCase().trim();
    if (symbol && !selected.includes(symbol)) {
      setSelected([...selected, symbol]);
    }
    setInput("");
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-col sm:flex-row">
        <div className="relative flex-1">
          <Command className="rounded-lg border shadow-md">
            <CommandInput
              placeholder="Search by stock symbol or company name..."
              value={input}
              onValueChange={setInput}
              onKeyDown={(e) => {
                if (e.key === "Enter" && input.trim()) {
                  handleManualAdd();
                }
              }}
              className="flex-1 h-10"
            />

            {input.length > 0 && (
              <CommandList>
                <CommandEmpty>
                  {loading ? (
                    <div className="flex items-center justify-center p-4">
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Searching...
                    </div>
                  ) : (
                    <div className="p-4 text-center">
                      No stocks found. Enter exact symbol to add.
                    </div>
                  )}
                </CommandEmpty>
                {!loading && suggestions.length > 0 && (
                  <CommandGroup heading="Stocks">
                    {suggestions.map((stock) => (
                      <CommandItem
                        key={stock.symbol}
                        value={stock.symbol}
                        onSelect={() => handleAddSymbol(stock.symbol)}
                      >
                        <div className="flex items-center justify-between w-full">
                          <div className="flex flex-col">
                            <div className="font-medium">{stock.symbol}</div>
                            <div className="text-xs text-muted-foreground">
                              {stock.name} • {stock.exchange}
                            </div>
                          </div>

                          {stock.price !== undefined && (
                            <div className="flex flex-col items-end">
                              <div className="font-medium">
                                ${stock.price.toFixed(2)}
                              </div>
                              {stock.change !== undefined && (
                                <div
                                  className={`text-xs flex items-center ${stock.change > 0
                                      ? "text-green-500"
                                      : stock.change < 0
                                        ? "text-red-500"
                                        : "text-gray-500"
                                    }`}
                                >
                                  {stock.change > 0 ? (
                                    <ArrowUpRight className="h-3 w-3 mr-1" />
                                  ) : stock.change < 0 ? (
                                    <ArrowDownRight className="h-3 w-3 mr-1" />
                                  ) : (
                                    <Minus className="h-3 w-3 mr-1" />
                                  )}
                                  {Math.abs(stock.change).toFixed(2)}%
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
              </CommandList>
            )}
          </Command>
        </div>
        <Button onClick={handleManualAdd} className="whitespace-nowrap">
          Add Symbol
        </Button>
      </div>

      <div className="flex gap-2 flex-wrap">
        {selected.map((symbol) => (
          <Badge
            key={symbol}
            variant="secondary"
            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-primary/10"
          >
            {symbol}
            <button
              type="button"
              onClick={() => handleRemove(symbol)}
              className="ml-1 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <X
                size={14}
                className="cursor-pointer hover:text-red-500 transition-colors"
              />
            </button>
          </Badge>
        ))}
        {selected.length === 0 && (
          <div className="text-sm text-muted-foreground italic">
            Add stock symbols to compare (e.g., AAPL, MSFT, GOOGL)
          </div>
        )}
      </div>
    </div>
  );
}
