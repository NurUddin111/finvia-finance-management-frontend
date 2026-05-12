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

import { createInvoice } from "@/services/business/invoices/createInv";

import InvoiceActionModal from "./InvActions";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { getAllProducts } from "@/services/business/products/allProducts";

type PaymentMethod = "ONLINE" | "CASH";

type Product = {
  id: string;
  name: string;
};

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
  {
    value: "ONLINE",
    label: "Online",
    icon: <CreditCard size={15} />,
  },
  {
    value: "CASH",
    label: "Cash",
    icon: <Wallet size={15} />,
  },
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

  const resetForm = () => {
    setEmail("");
    setDueDays(3);
    setTaxRate(0);
    setNotes("");
    setItems([{ ...EMPTY_ITEM }]);
    setMethod("ONLINE");
    setConfirmDismissed(false);
    setSearch("");
    setOpenComboboxIndex(null);
  };

  useEffect(() => {
    if (!open) return;

    const timer = setTimeout(() => {
      setProductsLoading(true);

      getAllProducts({
        search: search.trim() || undefined,
      })
        .then((res) => {
          if (res.success) {
            setProducts(res.data ?? []);
          }
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
      } else {
        toast.success("Invoice created successfully!");
      }
    } else {
      toast.error(state.error || "Failed to create invoice!");
    }
  }, [method, onClose, router, state]);

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

    copy[index] = {
      ...copy[index],
      [key]: value,
    };

    setItems(copy);
  };

  const selectProduct = (index: number, product: Product) => {
    const copy = [...items];

    copy[index] = {
      ...copy[index],
      productId: product.id,
      name: product.name,
    };

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
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent
          className="top-[50%] flex h-[94vh] w-[97vw]! max-w-375! translate-y-[-50%] flex-col overflow-hidden rounded-[34px] border border-white/10 bg-[#050816] p-0 shadow-[0_25px_120px_rgba(0,0,0,0.75)]"
          onInteractOutside={(e) => e.preventDefault()}
        >
          <form action={formAction} className="flex min-h-0 flex-1 flex-col">
            {/* HEADER */}
            <DialogHeader className="shrink-0 border-b border-white/10 bg-[#081120] px-6 py-5 xl:px-8">
              <div className="flex items-start justify-between gap-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10">
                    <ReceiptText className="size-6 text-blue-400" />
                  </div>

                  <div>
                    <DialogTitle className="text-left text-3xl font-semibold tracking-tight text-white">
                      Create Invoice
                    </DialogTitle>

                    <p className="mt-1 text-sm text-slate-400">
                      Generate and send a professional invoice to your client.
                    </p>
                  </div>
                </div>
              </div>
            </DialogHeader>

            {/* BODY */}
            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5 md:px-6 xl:px-8 xl:py-7 custom-scrollbar">
              <input type="hidden" name="items" value={JSON.stringify(items)} />

              <input type="hidden" name="method" value={method} />

              {/* ↓ FIX: was `flex flex-col gap-6 2xl:grid 2xl:grid-cols-[minmax(0,1fr)_360px]`
                   The 2xl breakpoint (1536px) was too aggressive — the modal is max-w-[1500px]
                   so the two-column layout rarely ever activated. Lowered to xl (1280px). */}
              <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[minmax(0,1fr)_360px]">
                {/* LEFT */}
                <div className="space-y-6">
                  {/* CLIENT */}
                  <div className="rounded-[28px] border border-white/10 bg-[#0B1120] p-5 md:p-6">
                    <div className="mb-6 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                        <Mail size={18} />
                      </div>

                      <div>
                        <h3 className="text-base font-semibold text-white">
                          Client Information
                        </h3>

                        <p className="text-xs text-slate-500">
                          Invoice recipient details
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
                          Client Email
                        </label>

                        <Input
                          name="email"
                          placeholder="client@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="h-13 rounded-2xl border-white/10 bg-white/3 px-4 text-sm text-white placeholder:text-slate-500 focus-visible:ring-0"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
                          Due Days
                        </label>

                        <div className="relative">
                          <Clock3 className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-500" />

                          <Input
                            name="dueDays"
                            type="number"
                            value={dueDays}
                            onChange={(e) => setDueDays(Number(e.target.value))}
                            className="h-13 rounded-2xl border-white/10 bg-white/3 pl-11 text-white focus-visible:ring-0"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 space-y-2">
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
                              "flex h-13 items-center justify-center gap-2 rounded-2xl border text-sm font-medium transition-all duration-300",
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

                  {/* ITEMS */}
                  <div className="rounded-[28px] border border-white/10 bg-[#0B1120] p-5 md:p-6">
                    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="text-base font-semibold text-white">
                          Invoice Items
                        </h3>

                        <p className="mt-1 text-xs text-slate-500">
                          Add products and pricing details
                        </p>
                      </div>

                      <Button
                        type="button"
                        variant="outline"
                        onClick={addItem}
                        className="h-11 rounded-2xl border-white/10 bg-white/3 px-5 text-sm text-slate-300 hover:border-blue-500/20 hover:bg-blue-500/10 hover:text-blue-400"
                      >
                        <Plus size={14} className="mr-2" />
                        Add Item
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {items.map((item, i) => (
                        <div
                          key={i}
                          className="rounded-3xl border border-white/10 bg-[#081120] p-4 md:p-5"
                        >
                          {/* ↓ FIX: was `grid gap-4 xl:grid-cols-[minmax(0,1.4fr)_120px_140px_auto]`
                               xl also fires on viewport width. Since the left column is ~700px at xl,
                               this inner grid would never activate at the column level. Lowered to md
                               so the 4-col item row appears as soon as the modal is medium-sized. */}
                          <div className="grid gap-4 md:grid-cols-[minmax(0,1.4fr)_120px_140px_auto]">
                            {/* PRODUCT */}
                            <div className="space-y-2">
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
                                    className="h-13 w-full justify-between rounded-2xl border-white/10 bg-white/3 px-4 font-normal text-slate-300 hover:bg-white/5"
                                  >
                                    <span
                                      className={cn(
                                        "truncate",
                                        !item.name && "text-slate-500",
                                      )}
                                    >
                                      {item.name || "Select product"}
                                    </span>

                                    <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                                  </Button>
                                </PopoverTrigger>

                                <PopoverContent className="w-[320px] rounded-2xl border-white/10 bg-[#0B1120] p-0">
                                  <Command shouldFilter={false}>
                                    <CommandInput
                                      placeholder="Search products..."
                                      value={search}
                                      onValueChange={setSearch}
                                    />

                                    <CommandList>
                                      {productsLoading ? (
                                        <CommandEmpty>
                                          Searching...
                                        </CommandEmpty>
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

                            {/* QTY */}
                            <div className="space-y-2">
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
                                className="h-13 rounded-2xl border-white/10 bg-white/3 text-white"
                              />
                            </div>

                            {/* RATE */}
                            <div className="space-y-2">
                              <label className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
                                Rate
                              </label>

                              <Input
                                type="number"
                                min={0}
                                value={item.pricePerUnit}
                                onChange={(e) =>
                                  updateItem(
                                    i,
                                    "pricePerUnit",
                                    Number(e.target.value),
                                  )
                                }
                                className="h-13 rounded-2xl border-white/10 bg-white/3 text-white"
                              />
                            </div>

                            {/* AMOUNT */}
                            <div className="flex items-end justify-between gap-4 md:justify-end">
                              <div className="text-right">
                                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
                                  Amount
                                </p>

                                <p className="mt-2 text-xl font-semibold text-white">
                                  $
                                  {(item.quantity * item.pricePerUnit).toFixed(
                                    2,
                                  )}
                                </p>
                              </div>

                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                disabled={items.length === 1}
                                onClick={() => removeItem(i)}
                                className="h-12 w-12 rounded-2xl text-red-400 hover:bg-red-500/10 hover:text-red-300"
                              >
                                <Trash2 size={16} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="lg:sticky lg:top-0 lg:h-fit">
                  <div className="space-y-6">
                    {/* SUMMARY */}
                    {/* ↓ FIX: was `2xl:sticky 2xl:top-0` — matched the old broken breakpoint */}
                    <div className="rounded-[28px] border border-white/10 bg-[#0B1120] p-5 md:p-6">
                      <div className="mb-6">
                        <h3 className="text-base font-semibold text-white">
                          Invoice Summary
                        </h3>

                        <p className="mt-1 text-xs text-slate-500">
                          Real-time invoice preview
                        </p>
                      </div>

                      <div className="space-y-5">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-400">Subtotal</span>

                          <span className="font-medium tabular-nums text-white">
                            ${subtotal.toFixed(2)}
                          </span>
                        </div>

                        <div className="space-y-2">
                          <label className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
                            Tax Rate
                          </label>

                          <Input
                            name="taxRate"
                            type="number"
                            min={0}
                            max={100}
                            value={taxRate}
                            onChange={(e) => setTaxRate(Number(e.target.value))}
                            className="h-12 rounded-2xl border-white/10 bg-white/3 text-white"
                          />
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-400">Tax</span>

                          <span className="font-medium tabular-nums text-white">
                            ${taxAmount.toFixed(2)}
                          </span>
                        </div>

                        <div className="border-t border-white/10 pt-5">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-300">
                              Total
                            </span>

                            <span className="text-4xl font-semibold tracking-tight text-white">
                              ${total.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* NOTES */}
                    <div className="rounded-[28px] border border-white/10 bg-[#0B1120] p-5 md:p-6">
                      <div className="mb-4 flex items-center gap-2">
                        <StickyNote className="size-4 text-amber-400" />

                        <h3 className="text-base font-semibold text-white">
                          Notes
                        </h3>
                      </div>

                      <Textarea
                        name="notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Add payment instructions or invoice notes..."
                        className="min-h-40 rounded-2xl border-white/10 bg-white/3 text-white placeholder:text-slate-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {!isPending && state?.success === false && (
                <p className="mt-5 text-center text-sm text-red-400">
                  {state.error}
                </p>
              )}
            </div>

            {/* FOOTER */}
            <div className="shrink-0 border-t border-white/10 bg-[#081120] px-5 py-4 md:px-6 xl:px-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="text-xs text-slate-500">
                  {items.length} item
                  {items.length !== 1 ? "s" : ""} added •{" "}
                  {method === "CASH" ? "Receipt Mode" : "Invoice Mode"}
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    className="h-12 rounded-2xl border-white/10 bg-white/3 px-6 text-slate-300 hover:bg-white/5"
                  >
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    disabled={isPending}
                    className="h-12 rounded-2xl bg-blue-500 px-7 text-sm font-semibold text-white hover:bg-blue-400"
                  >
                    {isPending
                      ? method === "CASH"
                        ? "Sending Receipt..."
                        : "Creating Invoice..."
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

      {invoiceId && (
        <InvoiceActionModal
          open={showConfirm}
          invoiceId={invoiceId}
          onClose={() => {
            setConfirmDismissed(true);

            onClose();

            resetForm();

            router.refresh();
          }}
        />
      )}
    </>
  );
}
