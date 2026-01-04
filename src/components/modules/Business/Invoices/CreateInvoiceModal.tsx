/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { useActionState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash } from "lucide-react";
import { createInvoice } from "@/services/business/invoices/createInv";
import InvoiceActionModal from "./InvActions";

type Item = {
  name: string;
  pricePerUnit: number;
  quantity: number;
};

export default function CreateInvoiceModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [state, formAction, isPending] = useActionState(createInvoice, null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [invoiceId, setInvoiceId] = useState<string | null>(null);

  const [email, setEmail] = useState("");
  const [dueDays, setDueDays] = useState(3);
  const [taxRate, setTaxRate] = useState(0);
  const [notes, setNotes] = useState("");
  const [items, setItems] = useState<Item[]>([
    { name: "", pricePerUnit: 0, quantity: 1 },
  ]);

  const resetForm = () => {
    setEmail("");
    setDueDays(3);
    setTaxRate(0);
    setNotes("");
    setItems([{ name: "", pricePerUnit: 0, quantity: 1 }]);
    setInvoiceId(null);
    setShowConfirm(false);
  };

  useEffect(() => {
    if (state?.success) {
      setInvoiceId(state.data.id);
      setShowConfirm(true);
    }
  }, [state]);

  const subtotal = items.reduce(
    (sum, i) => sum + i.pricePerUnit * i.quantity,
    0
  );
  const taxAmount = (subtotal * taxRate) / 100;
  const total = subtotal + taxAmount;

  const updateItem = <K extends keyof Item>(
    index: number,
    key: K,
    value: Item[K]
  ) => {
    const copy = [...items];
    copy[index] = { ...copy[index], [key]: value };
    setItems(copy);
  };

  const addItem = () => {
    setItems([...items, { name: "", pricePerUnit: 0, quantity: 1 }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent
          className=" w-[95vw] max-w-6xl max-h-[90vh] flex flex-col bg-black"
          onInteractOutside={(e) => e.preventDefault()}
        >
          <DialogHeader className="shrink-0 border-b pb-4">
            <DialogTitle className="text-xl font-semibold">
              New Invoice
            </DialogTitle>
          </DialogHeader>

          <form
            action={formAction}
            className="flex-1 overflow-y-auto py-6 space-y-6"
          >
            <input type="hidden" name="items" value={JSON.stringify(items)} />

            <div className="space-y-1 max-w-md">
              <label className="text-sm font-medium">Client Email</label>
              <Input
                name="email"
                placeholder="client@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Line Items */}
            <div className="border rounded-lg">
              <div className="overflow-x-auto">
                <table className="min-w-225 w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="p-3 text-left">Description</th>
                      <th className="p-3 w-20">Qty</th>
                      <th className="p-3 w-32">Rate</th>
                      <th className="p-3 text-right w-32">Amount</th>
                      <th className="p-3 w-10" />
                    </tr>
                  </thead>

                  <tbody>
                    {items.map((item, i) => (
                      <tr key={i} className="border-t">
                        <td className="p-3">
                          <Input
                            value={item.name}
                            onChange={(e) =>
                              updateItem(i, "name", e.target.value)
                            }
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
                              updateItem(
                                i,
                                "pricePerUnit",
                                Number(e.target.value)
                              )
                            }
                          />
                        </td>

                        <td className="p-3 text-right font-medium">
                          ${(item.quantity * item.pricePerUnit).toFixed(2)}
                        </td>

                        <td className="p-3">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(i)}
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
                type="button"
                variant="ghost"
                className="m-3"
                onClick={addItem}
              >
                + Add Line Item
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="text-sm font-medium">Due Days</label>
                  <Input
                    name="dueDays"
                    type="number"
                    value={dueDays}
                    onChange={(e) => setDueDays(Number(e.target.value))}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Notes</label>
                  <Textarea
                    name="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
              </div>

              <div className="border rounded-lg p-4 space-y-3 max-w-md md:ml-auto">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center gap-3">
                  <span>Tax Rate (%)</span>
                  <Input
                    name="taxRate"
                    type="number"
                    className="w-24"
                    value={taxRate}
                    onChange={(e) => setTaxRate(Number(e.target.value))}
                  />
                </div>

                <div className="flex justify-between font-semibold text-lg border-t pt-2">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {!isPending && state?.success === false && (
              <p className="text-sm text-red-500 text-center">{state.error}</p>
            )}
          </form>

          {/* FOOTER (STICKY) */}
          <div className="shrink-0 border-t pt-4 flex justify-end gap-3">
            <Button
              type="submit"
              disabled={isPending}
              className=" w-full md:w-auto h-11 rounded-full bg-primary px-6 text-primary-foreground transition-all duration-300 shadow-[0_0_0_1px_rgba(124,106,242,0.25)] md:hover:-translate-y-0.5 md:hover:shadow-[0_0_0_1px_rgba(124,106,242,0.4),0_18px_60px_rgba(124,106,242,0.4)]"
            >
              {isPending ? "Creating..." : "Create"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {invoiceId && (
        <InvoiceActionModal
          open={showConfirm}
          invoiceId={invoiceId}
          onClose={() => {
            setShowConfirm(false);
            onClose();
            resetForm();
          }}
        />
      )}
    </>
  );
}
