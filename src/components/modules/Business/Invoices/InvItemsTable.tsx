/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

export default function InvoiceItemsTable({
  items,
  setItems,
}: {
  items: any[];
  setItems: (items: any[]) => void;
}) {
  const updateItem = (index: number, key: string, value: any) => {
    const copy = [...items];
    copy[index][key] = value;
    setItems(copy);
  };

  return (
    <div className="border rounded-lg">
      <div className="overflow-x-auto">
        <table className="min-w-225 w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 w-20 text-center">Qty</th>
              <th className="p-3 w-32 text-center">Rate</th>
              <th className="p-3 w-32 text-right">Amount</th>
              <th className="p-3 w-10" />
            </tr>
          </thead>

          <tbody>
            {items.map((item, i) => (
              <tr key={i} className="border-t">
                <td className="p-3">
                  <Input
                    placeholder="Item name"
                    value={item.name}
                    onChange={(e) => updateItem(i, "name", e.target.value)}
                  />
                </td>

                <td className="p-3">
                  <Input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      updateItem(i, "quantity", Number(e.target.value))
                    }
                  />
                </td>

                <td className="p-3">
                  <Input
                    type="number"
                    value={item.pricePerUnit}
                    onChange={(e) =>
                      updateItem(i, "pricePerUnit", Number(e.target.value))
                    }
                  />
                </td>

                <td className="p-3 text-right font-medium">
                  ${(item.quantity * item.pricePerUnit).toFixed(2)}
                </td>

                <td className="p-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      setItems(items.filter((_, idx) => idx !== i))
                    }
                  >
                    <Trash size={16} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Button
        variant="ghost"
        className="m-3"
        onClick={() =>
          setItems([...items, { name: "", pricePerUnit: 0, quantity: 1 }])
        }
      >
        + Add Line Item
      </Button>
    </div>
  );
}
