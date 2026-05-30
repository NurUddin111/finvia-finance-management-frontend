"use client";

import { useCallback, useEffect, useState } from "react";
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
import {
  Trash2,
  ChevronsUpDown,
  Check,
  PackageSearch,
  ReceiptText,
  Mail,
  Clock3,
  StickyNote,
  Plus,
  CreditCard,
  Wallet,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import InvoiceActionModal from "./InvActions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createInvoice } from "@/services/business/invoices.services";
import { getAllProducts } from "@/services/business/product.services";

type PaymentMethod = "ONLINE" | "CASH";
type Product = { id: string; name: string };
type Item = {
  productId: string;
  name: string;
  pricePerUnit: number;
  quantity: number;
};

const EMPTY_ITEM: Item = {
  productId: "",
  name: "",
  pricePerUnit: 0,
  quantity: 1,
};

const PAYMENT_METHODS: {
  value: PaymentMethod;
  label: string;
  icon: React.ReactNode;
}[] = [
  { value: "ONLINE", label: "Online", icon: <CreditCard size={15} /> },
  { value: "CASH", label: "Cash", icon: <Wallet size={15} /> },
];

export default function CreateInvoiceModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(createInvoice, null);
  const [method, setMethod] = useState<PaymentMethod>("ONLINE");
  const [confirmDismissed, setConfirmDismissed] = useState(false);

  const invoiceId = state?.success ? (state.data?.id ?? null) : null;
  const showConfirm = !!invoiceId && !confirmDismissed && method === "ONLINE";

  const [email, setEmail] = useState("");
  const [dueDays, setDueDays] = useState(3);
  const [taxRate, setTaxRate] = useState(0);
  const [notes, setNotes] = useState("");
  const [items, setItems] = useState<Item[]>([{ ...EMPTY_ITEM }]);
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [openComboboxIndex, setOpenComboboxIndex] = useState<number | null>(
    null,
  );
  const [search, setSearch] = useState("");

  const resetForm = useCallback(() => {
    setEmail("");
    setDueDays(3);
    setTaxRate(0);
    setNotes("");
    setItems([{ ...EMPTY_ITEM }]);
    setMethod("ONLINE");
    setConfirmDismissed(false);
    setSearch("");
    setOpenComboboxIndex(null);
  }, []);

  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => {
      setProductsLoading(true);
      getAllProducts({ search: search.trim() || undefined })
        .then((res) => {
          if (res.success) setProducts(res.data ?? []);
        })
        .finally(() => setProductsLoading(false));
    }, 300);
    return () => clearTimeout(timer);
  }, [open, search]);

  useEffect(() => {
    if (!state) return;
    if (state.success) {
      if (method === "CASH") {
        toast.success("Receipt sent successfully!");
        onClose();
        setTimeout(() => {
          resetForm();
          router.refresh();
        }, 0);
      }
    } else {
      toast.error(state.error ?? "Failed to create invoice!");
    }
  }, [method, onClose, resetForm, router, state]);

  const subtotal = items.reduce(
    (sum, i) => sum + i.pricePerUnit * i.quantity,
    0,
  );
  const taxAmount = (subtotal * taxRate) / 100;
  const total = subtotal + taxAmount;

  const updateItem = <K extends keyof Item>(
    index: number,
    key: K,
    value: Item[K],
  ) => {
    const copy = [...items];
    copy[index] = { ...copy[index], [key]: value };
    setItems(copy);
  };

  const selectProduct = (index: number, product: Product) => {
    const copy = [...items];
    copy[index] = { ...copy[index], productId: product.id, name: product.name };
    setItems(copy);
    setOpenComboboxIndex(null);
    setSearch("");
  };

  const openCombobox = (index: number) => {
    setSearch("");
    setOpenComboboxIndex(index);
  };
  const addItem = () => setItems([...items, { ...EMPTY_ITEM }]);
  const removeItem = (index: number) =>
    setItems(items.filter((_, i) => i !== index));

  return (
    <>
      <Dialog open={open && !showConfirm} onOpenChange={onClose}>
        <DialogContent
          className="flex max-h-[90vh] w-[calc(100%-32px)] max-w-150 flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[#050816] p-0 shadow-[0_25px_120px_rgba(0,0,0,0.75)] lg:max-w-235"
          onInteractOutside={(e) => e.preventDefault()}
        >
          <form action={formAction} className="flex min-h-0 flex-1 flex-col">
            {/* ── HEADER ── */}
            <DialogHeader className="shrink-0 border-b border-white/10 bg-[#081120] px-5 py-4 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 sm:h-12 sm:w-12">
                  <ReceiptText className="size-4 text-blue-400 sm:size-5" />
                </div>
                <div>
                  <DialogTitle className="text-left text-base font-semibold tracking-tight text-white sm:text-lg lg:text-xl">
                    Create Invoice
                  </DialogTitle>
                  <p className="mt-0.5 text-xs text-slate-400 sm:text-sm">
                    Generate and send a professional invoice to your client.
                  </p>
                </div>
              </div>
            </DialogHeader>

            {/* ── BODY ── */}
            <div className="custom-scrollbar min-h-0 flex-1 overflow-y-auto p-4 sm:p-5 lg:p-6">
              <input type="hidden" name="items" value={JSON.stringify(items)} />
              <input type="hidden" name="method" value={method} />

              <div className="flex flex-col gap-4 lg:grid lg:grid-cols-[1fr_300px] lg:gap-5 xl:grid-cols-[1fr_320px]">
                {/* ── LEFT ── */}
                <div className="space-y-4">
                  {/* CLIENT INFO */}
                  <div className="rounded-2xl border border-white/10 bg-[#0B1120] p-4 sm:p-5">
                    <div className="mb-4 flex items-center gap-2.5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                        <Mail size={16} />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-white">
                          Client Information
                        </h3>
                        <p className="text-xs text-slate-500">
                          Invoice recipient details
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {/* EMAIL + DUE DAYS */}
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                        <div className="space-y-2">
                          <label className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
                            Client Email
                          </label>
                          <Input
                            name="email"
                            placeholder="client@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="h-11 rounded-xl border-white/10 bg-white/3 px-4 text-sm text-white placeholder:text-slate-500 focus-visible:ring-0"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
                            Due Days
                          </label>
                          <div className="relative">
                            <Clock3 className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
                            <Input
                              name="dueDays"
                              type="number"
                              min={0}
                              value={dueDays}
                              onChange={(e) =>
                                setDueDays(Number(e.target.value))
                              }
                              className="h-11 rounded-xl border-white/10 bg-white/3 pl-10 text-white focus-visible:ring-0"
                            />
                          </div>
                        </div>
                      </div>

                      {/* PAYMENT METHOD */}
                      <div className="space-y-2">
                        <label className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
                          Payment Method
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {PAYMENT_METHODS.map(({ value, label, icon }) => (
                            <button
                              key={value}
                              type="button"
                              onClick={() => setMethod(value)}
                              className={cn(
                                "flex h-11 items-center justify-center gap-2 rounded-xl border text-sm font-medium transition-all duration-300",
                                method === value
                                  ? "border-emerald-500/30 bg-emerald-500 text-black"
                                  : "border-white/10 bg-white/3 text-slate-400 hover:border-white/20 hover:bg-white/5",
                              )}
                            >
                              {icon}
                              {label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ITEMS */}
                  <div className="rounded-2xl border border-white/10 bg-[#0B1120] p-4 sm:p-5">
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <div>
                        <h3 className="text-sm font-semibold text-white">
                          Invoice Items
                        </h3>
                        <p className="mt-0.5 text-xs text-slate-500">
                          Add products and pricing
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={addItem}
                        className="h-9 shrink-0 rounded-xl border-white/10 bg-white/3 px-3 text-xs text-slate-300 hover:border-blue-500/20 hover:bg-blue-500/10 hover:text-blue-400"
                      >
                        <Plus size={13} className="mr-1" />
                        Add Item
                      </Button>
                    </div>

                    <div className="space-y-3">
                      {items.map((item, i) => (
                        <div
                          key={i}
                          className="rounded-2xl border border-white/10 bg-[#081120] p-3 sm:p-4"
                        >
                          {/* PRODUCT — full width always */}
                          <div className="space-y-1.5">
                            <label className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
                              Product
                            </label>
                            <Popover
                              open={openComboboxIndex === i}
                              onOpenChange={(isOpen) =>
                                isOpen
                                  ? openCombobox(i)
                                  : setOpenComboboxIndex(null)
                              }
                            >
                              <PopoverTrigger asChild>
                                <Button
                                  type="button"
                                  variant="outline"
                                  className="h-11 w-full justify-between rounded-xl border-white/10 bg-white/3 px-3 font-normal text-slate-300 hover:bg-white/5"
                                >
                                  <span
                                    className={cn(
                                      "truncate text-sm",
                                      !item.name && "text-slate-500",
                                    )}
                                  >
                                    {item.name || "Select product"}
                                  </span>
                                  <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-[min(320px,90vw)] rounded-2xl border-white/10 bg-[#0B1120] p-0">
                                <Command shouldFilter={false}>
                                  <CommandInput
                                    placeholder="Search products..."
                                    value={search}
                                    onValueChange={setSearch}
                                  />
                                  <CommandList>
                                    {productsLoading ? (
                                      <CommandEmpty>Searching...</CommandEmpty>
                                    ) : products.length === 0 ? (
                                      <CommandEmpty>
                                        <div className="flex flex-col items-center gap-2 py-5 text-slate-500">
                                          <PackageSearch size={22} />
                                          No products found
                                        </div>
                                      </CommandEmpty>
                                    ) : (
                                      <CommandGroup>
                                        {products.map((product) => (
                                          <CommandItem
                                            key={product.id}
                                            value={product.id}
                                            onSelect={() =>
                                              selectProduct(i, product)
                                            }
                                          >
                                            <Check
                                              className={cn(
                                                "mr-2 h-4 w-4",
                                                item.productId === product.id
                                                  ? "opacity-100"
                                                  : "opacity-0",
                                              )}
                                            />
                                            {product.name}
                                          </CommandItem>
                                        ))}
                                      </CommandGroup>
                                    )}
                                  </CommandList>
                                </Command>
                              </PopoverContent>
                            </Popover>
                          </div>

                          {/* QTY + RATE + (AMOUNT on sm+) + DELETE */}
                          <div className="mt-3 grid grid-cols-[1fr_1fr_auto] items-end gap-3 sm:grid-cols-[1fr_1fr_100px_auto]">
                            {/* QTY */}
                            <div className="space-y-1.5">
                              <label className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
                                Qty
                              </label>
                              <Input
                                type="number"
                                min={1}
                                value={item.quantity}
                                onChange={(e) =>
                                  updateItem(
                                    i,
                                    "quantity",
                                    Number(e.target.value),
                                  )
                                }
                                className="h-11 rounded-xl border-white/10 bg-white/3 text-white"
                              />
                            </div>

                            {/* RATE */}
                            <div className="space-y-1.5">
                              <label className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
                                Rate
                              </label>
                              <Input
                                type="number"
                                min={1}
                                value={item.pricePerUnit}
                                onChange={(e) =>
                                  updateItem(
                                    i,
                                    "pricePerUnit",
                                    Number(e.target.value),
                                  )
                                }
                                className="h-11 rounded-xl border-white/10 bg-white/3 text-white"
                              />
                            </div>

                            {/* AMOUNT — sm+ only */}
                            <div className="hidden space-y-1.5 sm:block">
                              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
                                Amount
                              </p>
                              <div className="flex h-11 items-center">
                                <p className="text-sm font-semibold text-white">
                                  ৳
                                  {(item.quantity * item.pricePerUnit).toFixed(
                                    2,
                                  )}
                                </p>
                              </div>
                            </div>

                            {/* DELETE */}
                            <div className="flex items-end">
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                disabled={items.length === 1}
                                onClick={() => removeItem(i)}
                                className="h-11 w-11 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300"
                              >
                                <Trash2 size={15} />
                              </Button>
                            </div>
                          </div>

                          {/* AMOUNT — mobile only */}
                          <div className="mt-2 flex items-center justify-between border-t border-white/5 pt-2 sm:hidden">
                            <p className="text-[11px] text-slate-500">Amount</p>
                            <p className="text-sm font-semibold text-white">
                              ৳{(item.quantity * item.pricePerUnit).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ── RIGHT ── */}
                <div className="space-y-4 lg:sticky lg:top-0 lg:h-fit">
                  {/* SUMMARY */}
                  <div className="rounded-2xl border border-white/10 bg-[#0B1120] p-4 sm:p-5">
                    <div className="mb-4">
                      <h3 className="text-sm font-semibold text-white">
                        Invoice Summary
                      </h3>
                      <p className="mt-0.5 text-xs text-slate-500">
                        Real-time preview
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Subtotal</span>
                        <span className="font-medium tabular-nums text-white">
                          ৳{subtotal.toFixed(2)}
                        </span>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
                          Tax Rate (%)
                        </label>
                        <Input
                          name="taxRate"
                          type="number"
                          min={0}
                          max={100}
                          value={taxRate}
                          onChange={(e) => setTaxRate(Number(e.target.value))}
                          className="h-11 rounded-xl border-white/10 bg-white/3 text-white"
                        />
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Tax</span>
                        <span className="font-medium tabular-nums text-white">
                          ৳{taxAmount.toFixed(2)}
                        </span>
                      </div>

                      <div className="border-t border-white/10 pt-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-slate-300">
                            Total
                          </span>
                          <span className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                            ৳{total.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* NOTES */}
                  <div className="rounded-2xl border border-white/10 bg-[#0B1120] p-4 sm:p-5">
                    <div className="mb-3 flex items-center gap-2">
                      <StickyNote className="size-4 text-amber-400" />
                      <h3 className="text-sm font-semibold text-white">
                        Notes
                      </h3>
                    </div>
                    <Textarea
                      name="notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Add payment instructions or invoice notes..."
                      className="min-h-28 rounded-xl border-white/10 bg-white/3 text-sm text-white placeholder:text-slate-500 lg:min-h-36"
                    />
                  </div>
                </div>
              </div>

              {/* GLOBAL ERROR */}
              {!isPending && state?.success === false && (
                <p className="mt-4 text-center text-sm text-red-400">
                  {state.error ?? "Failed to create invoice."}
                </p>
              )}
            </div>

            {/* ── FOOTER ── */}
            <div className="shrink-0 border-t border-white/10 bg-[#081120] px-5 py-3 sm:px-6 sm:py-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-slate-500">
                  {items.length} item{items.length !== 1 ? "s" : ""} •{" "}
                  {method === "CASH" ? "Receipt Mode" : "Invoice Mode"}
                </p>
                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    className="h-10 flex-1 rounded-xl border-white/10 bg-white/3 px-5 text-sm text-slate-300 hover:bg-white/5 sm:flex-none"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="h-10 flex-1 rounded-xl bg-blue-500 px-6 text-sm font-semibold text-white hover:bg-blue-400 disabled:opacity-60 sm:flex-none"
                  >
                    {isPending
                      ? method === "CASH"
                        ? "Sending..."
                        : "Creating..."
                      : method === "CASH"
                        ? "Send Receipt"
                        : "Create Invoice"}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {showConfirm && invoiceId && (
        <InvoiceActionModal
          open={showConfirm}
          invoiceId={invoiceId}
          onClose={() => {
            setConfirmDismissed(true);
            onClose();
            // resetForm() removed — key remount on next open handles this
          }}
        />
      )}
    </>
  );
}
