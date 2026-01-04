/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";

export default function InvoiceSummary({ items, taxRate, setTaxRate }: any) {
  const subtotal = items.reduce(
    (sum: number, i: any) => sum + i.pricePerUnit * i.quantity,
    0
  );

  const taxAmount = (subtotal * taxRate) / 100;
  const total = subtotal + taxAmount;

  return (
    <div className="border rounded-lg p-4 space-y-3">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Subtotal</span>
        <span className="font-medium">${subtotal.toFixed(2)}</span>
      </div>

      <div className="flex justify-between items-center gap-3 text-sm">
        <span className="text-muted-foreground">Tax Rate (%)</span>
        <Input
          type="number"
          className="w-20 h-8 text-sm"
          value={taxRate}
          onChange={(e) => setTaxRate(Number(e.target.value))}
        />
      </div>

      <div className="flex justify-between font-semibold text-lg border-t pt-2">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </div>
  );
}
