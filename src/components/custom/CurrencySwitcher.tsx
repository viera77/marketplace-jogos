"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DollarSign } from "lucide-react";
import { useCurrency } from "@/contexts/CurrencyContext";

export function CurrencySwitcher() {
  const { currency, setCurrency } = useCurrency();

  const currencies = [
    { code: "BRL", name: "Real Brasileiro", symbol: "R$", flag: "🇧🇷" },
    { code: "USD", name: "US Dollar", symbol: "$", flag: "🇺🇸" },
    { code: "EUR", name: "Euro", symbol: "€", flag: "🇪🇺" },
    { code: "GBP", name: "British Pound", symbol: "£", flag: "🇬🇧" },
    { code: "ARS", name: "Peso Argentino", symbol: "ARS$", flag: "🇦🇷" },
    { code: "CLP", name: "Peso Chileno", symbol: "CLP$", flag: "🇨🇱" },
    { code: "MXN", name: "Peso Mexicano", symbol: "MXN$", flag: "🇲🇽" },
  ];

  const currentCurrency = currencies.find(curr => curr.code === currency);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all"
        >
          <DollarSign className="w-4 h-4 mr-1" />
          {currentCurrency?.code}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-slate-900 border-cyan-500/30 w-56">
        {currencies.map((curr) => (
          <DropdownMenuItem
            key={curr.code}
            onClick={() => setCurrency(curr.code as any)}
            className={`cursor-pointer ${
              currency === curr.code 
                ? "bg-cyan-500/20 text-cyan-400" 
                : "text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-400"
            }`}
          >
            <span className="mr-2">{curr.flag}</span>
            <div className="flex flex-col">
              <span className="font-semibold">{curr.code}</span>
              <span className="text-xs text-gray-400">{curr.name}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
