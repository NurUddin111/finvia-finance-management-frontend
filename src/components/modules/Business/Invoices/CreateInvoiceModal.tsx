// /* eslint-disable react-hooks/set-state-in-effect */
// "use client";

// import { useEffect, useState } from "react";
// import { useActionState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Trash } from "lucide-react";
// import { createInvoice } from "@/services/business/invoices/createInv";
// import InvoiceActionModal from "./InvActions";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";

// /* ================= TYPES ================= */

// type Item = {
//   name: string;
//   pricePerUnit: number;
//   quantity: number;
// };

// /* ================= COMPONENT ================= */

// export default function CreateInvoiceModal({
//   open,
//   onClose,
// }: {
//   open: boolean;
//   onClose: () => void;
// }) {
//   const router = useRouter();

//   const [state, formAction, isPending] = useActionState(createInvoice, null);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [invoiceId, setInvoiceId] = useState<string | null>(null);
//   const [email, setEmail] = useState("");
//   const [dueDays, setDueDays] = useState(3);
//   const [taxRate, setTaxRate] = useState(0);
//   const [notes, setNotes] = useState("");
//   const [items, setItems] = useState<Item[]>([
//     { name: "", pricePerUnit: 0, quantity: 1 },
//   ]);

//   const resetForm = () => {
//     setEmail("");
//     setDueDays(3);
//     setTaxRate(0);
//     setNotes("");
//     setItems([{ name: "", pricePerUnit: 0, quantity: 1 }]);
//     setInvoiceId(null);
//     setShowConfirm(false);
//   };

//   /* ================= EFFECT ================= */

//   useEffect(() => {
//     if (state) {
//       if (state?.success) {
//         setInvoiceId(state?.data.id);
//         setShowConfirm(true);
//         toast.success("Invoice created successfully!");
//       }
//       if (!state?.success) {
//         toast.error("Failed to create invoice!");
//       }
//     }
//   }, [state]);

//   /* ================= CALCULATIONS ================= */

//   const subtotal = items.reduce(
//     (sum, i) => sum + i.pricePerUnit * i.quantity,
//     0
//   );
//   const taxAmount = (subtotal * taxRate) / 100;
//   const total = subtotal + taxAmount;

//   /* ================= ITEM HELPERS ================= */

//   const updateItem = <K extends keyof Item>(
//     index: number,
//     key: K,
//     value: Item[K]
//   ) => {
//     const copy = [...items];
//     copy[index] = { ...copy[index], [key]: value };
//     setItems(copy);
//   };

//   const addItem = () => {
//     setItems([...items, { name: "", pricePerUnit: 0, quantity: 1 }]);
//   };

//   const removeItem = (index: number) => {
//     setItems(items.filter((_, i) => i !== index));
//   };

//   /* ================= UI ================= */

//   return (
//     <>
//       <Dialog open={open} onOpenChange={onClose}>
//         <DialogContent
//           className="w-[95vw] max-w-[95vw] sm:max-w-6xl h-[90vh] flex flex-col bg-black"
//           onInteractOutside={(e) => e.preventDefault()}
//         >
//           {/* HEADER */}
//           <DialogHeader className="shrink-0 border-b pb-4">
//             <DialogTitle className="text-xl font-semibold">
//               New Invoice
//             </DialogTitle>
//           </DialogHeader>

//           {/* FORM */}
//           <form
//             action={formAction}
//             className="flex-1 overflow-y-auto py-6 space-y-6"
//           >
//             <input type="hidden" name="items" value={JSON.stringify(items)} />

//             {/* Bill To */}
//             <div className="space-y-1 max-w-md">
//               <label className="text-sm font-medium">Client Email</label>
//               <Input
//                 name="email"
//                 placeholder="client@email.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>

//             {/* Line Items */}
//             <div className="border rounded-lg">
//               {/* 👇 horizontal scroll ONLY here */}
//               <div className="overflow-x-auto">
//                 <table className="w-225 text-sm">
//                   <thead className="bg-muted/50">
//                     <tr>
//                       <th className="p-3 text-left">Description</th>
//                       <th className="p-3 w-20">Qty</th>
//                       <th className="p-3 w-32">Rate</th>
//                       <th className="p-3 text-right w-32">Amount</th>
//                       <th className="p-3 w-10" />
//                     </tr>
//                   </thead>

//                   <tbody>
//                     {items.map((item, i) => (
//                       <tr key={i} className="border-t">
//                         <td className="p-3">
//                           <Input
//                             value={item.name}
//                             onChange={(e) =>
//                               updateItem(i, "name", e.target.value)
//                             }
//                           />
//                         </td>

//                         <td className="p-3">
//                           <Input
//                             type="number"
//                             value={item.quantity}
//                             onChange={(e) =>
//                               updateItem(i, "quantity", Number(e.target.value))
//                             }
//                           />
//                         </td>

//                         <td className="p-3">
//                           <Input
//                             type="number"
//                             value={item.pricePerUnit}
//                             onChange={(e) =>
//                               updateItem(
//                                 i,
//                                 "pricePerUnit",
//                                 Number(e.target.value)
//                               )
//                             }
//                           />
//                         </td>

//                         <td className="p-3 text-right font-medium">
//                           ${(item.quantity * item.pricePerUnit).toFixed(2)}
//                         </td>

//                         <td className="p-3">
//                           <Button
//                             type="button"
//                             variant="ghost"
//                             size="icon"
//                             onClick={() => removeItem(i)}
//                           >
//                             <Trash size={16} />
//                           </Button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>

//               <Button
//                 type="button"
//                 variant="ghost"
//                 className="m-3"
//                 onClick={addItem}
//               >
//                 + Add Line Item
//               </Button>
//             </div>

//             {/* Bottom Section */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="space-y-4 max-w-md">
//                 <div>
//                   <label className="text-sm font-medium">Due Days</label>
//                   <Input
//                     name="dueDays"
//                     type="number"
//                     value={dueDays}
//                     onChange={(e) => setDueDays(Number(e.target.value))}
//                   />
//                 </div>

//                 <div>
//                   <label className="text-sm font-medium">Notes</label>
//                   <Textarea
//                     name="notes"
//                     value={notes}
//                     onChange={(e) => setNotes(e.target.value)}
//                   />
//                 </div>
//               </div>

//               <div className="border rounded-lg p-4 space-y-3 max-w-md md:ml-auto">
//                 <div className="flex justify-between">
//                   <span>Subtotal</span>
//                   <span>${subtotal.toFixed(2)}</span>
//                 </div>

//                 <div className="flex justify-between items-center gap-3">
//                   <span>Tax Rate (%)</span>
//                   <Input
//                     name="taxRate"
//                     type="number"
//                     className="w-24"
//                     value={taxRate}
//                     onChange={(e) => setTaxRate(Number(e.target.value))}
//                   />
//                 </div>

//                 <div className="flex justify-between font-semibold text-lg border-t pt-2">
//                   <span>Total</span>
//                   <span>${total.toFixed(2)}</span>
//                 </div>
//               </div>
//             </div>

//             {/* Error */}
//             {!isPending && state?.success === false && (
//               <p className="text-sm text-red-500 text-center">{state.error}</p>
//             )}

//             {/* Footer */}
//             <div className="shrink-0 border-t pt-4 flex justify-end gap-3 bg-background">
//               <Button
//                 type="submit"
//                 disabled={isPending}
//                 className=" w-full md:w-auto h-11 rounded-full bg-primary px-6 text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 shadow-[0_0_0_1px_rgba(124,106,242,0.25),0_12px_45px_rgba(124,106,242,0.3)] hover:shadow-[0_0_0_1px_rgba(124,106,242,0.4),0_18px_60px_rgba(124,106,242,0.4)]"
//               >
//                 {isPending ? "Creating invoice..." : "Create Invoice"}
//               </Button>
//             </div>
//           </form>
//         </DialogContent>
//       </Dialog>
//       {invoiceId && (
//         <InvoiceActionModal
//           open={showConfirm}
//           invoiceId={invoiceId}
//           onClose={() => {
//             setShowConfirm(false);
//             onClose();
//             resetForm();
//             router.refresh();
//           }}
//         />
//       )}
//     </>
//   );
// }

// New Modal

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
import { Trash, ChevronsUpDown, Check, PackageSearch } from "lucide-react";
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

/* ================= TYPES ================= */

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

/* ================= COMPONENT ================= */

export default function CreateInvoiceModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(createInvoice, null);

  // Modal state
  const [confirmDismissed, setConfirmDismissed] = useState(false);
  const invoiceId = state?.success ? (state.data?.id ?? null) : null;
  const showConfirm = !!invoiceId && !confirmDismissed;

  // Form state
  const [email, setEmail] = useState("");
  const [dueDays, setDueDays] = useState(3);
  const [taxRate, setTaxRate] = useState(0);
  const [notes, setNotes] = useState("");
  const [items, setItems] = useState<Item[]>([{ ...EMPTY_ITEM }]);

  // Product combobox state — one search string shared (only one popover open at a time)
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [openComboboxIndex, setOpenComboboxIndex] = useState<number | null>(
    null,
  );
  const [search, setSearch] = useState("");

  /* ================= EFFECTS ================= */

  // Debounced product fetch — fires when modal opens or search changes
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

  // Handle server action response
  useEffect(() => {
    if (!state) return;
    if (state.success) {
      toast.success("Invoice created successfully!");
    } else {
      toast.error(state.error || "Failed to create invoice!");
    }
  }, [state]);

  /* ================= HELPERS ================= */

  const resetForm = () => {
    setEmail("");
    setDueDays(3);
    setTaxRate(0);
    setNotes("");
    setItems([{ ...EMPTY_ITEM }]);
    setConfirmDismissed(false); // ← replaces setInvoiceId + setShowConfirm
    setSearch("");
    setOpenComboboxIndex(null);
  };
  /* ================= CALCULATIONS ================= */

  const subtotal = items.reduce(
    (sum, i) => sum + i.pricePerUnit * i.quantity,
    0,
  );
  const taxAmount = (subtotal * taxRate) / 100;
  const total = subtotal + taxAmount;

  /* ================= ITEM HELPERS ================= */

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
    setSearch(""); // reset search when switching rows
    setOpenComboboxIndex(index);
  };

  const addItem = () => setItems([...items, { ...EMPTY_ITEM }]);

  const removeItem = (index: number) =>
    setItems(items.filter((_, i) => i !== index));

  /* ================= UI ================= */

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent
          className="w-[95vw] max-w-[95vw] sm:max-w-6xl h-[90vh] flex flex-col bg-black"
          onInteractOutside={(e) => e.preventDefault()}
        >
          {/* HEADER */}
          <DialogHeader className="shrink-0 border-b pb-4">
            <DialogTitle className="text-xl font-semibold">
              New Invoice
            </DialogTitle>
          </DialogHeader>

          {/* FORM */}
          <form
            action={formAction}
            className="flex-1 overflow-y-auto py-6 space-y-6"
          >
            <input type="hidden" name="items" value={JSON.stringify(items)} />

            {/* Bill To */}
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
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="p-3 text-left min-w-55">Product</th>
                      <th className="p-3 w-28 text-left">Qty</th>
                      <th className="p-3 w-36 text-left">Rate</th>
                      <th className="p-3 text-right w-32">Amount</th>
                      <th className="p-3 w-10" />
                    </tr>
                  </thead>

                  <tbody>
                    {items.map((item, i) => (
                      <tr key={i} className="border-t">
                        {/* Product combobox */}
                        <td className="p-3">
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
                                role="combobox"
                                aria-expanded={openComboboxIndex === i}
                                className="w-full justify-between font-normal"
                              >
                                <span
                                  className={cn(
                                    "truncate",
                                    !item.name && "text-muted-foreground",
                                  )}
                                >
                                  {item.name || "Select product"}
                                </span>
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </PopoverTrigger>

                            <PopoverContent className="w-65 p-0 bg-gray-950" align="start">
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
                                      <div className="flex flex-col items-center gap-2 py-2 text-muted-foreground">
                                        <PackageSearch size={20} />
                                        <span>No products found</span>
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
                                              "mr-2 h-4 w-4 shrink-0",
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
                        </td>

                        {/* Quantity */}
                        <td className="p-3">
                          <Input
                            type="number"
                            min={1}
                            value={item.quantity}
                            onChange={(e) =>
                              updateItem(i, "quantity", Number(e.target.value))
                            }
                          />
                        </td>

                        {/* Rate */}
                        <td className="p-3">
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
                          />
                        </td>

                        {/* Amount */}
                        <td className="p-3 text-right font-medium tabular-nums">
                          ${(item.quantity * item.pricePerUnit).toFixed(2)}
                        </td>

                        {/* Remove */}
                        <td className="p-3">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(i)}
                            disabled={items.length === 1}
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

            {/* Bottom Section */}
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
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span className="tabular-nums">${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center gap-3 text-sm">
                  <span>Tax Rate (%)</span>
                  <Input
                    name="taxRate"
                    type="number"
                    min={0}
                    max={100}
                    className="w-24"
                    value={taxRate}
                    onChange={(e) => setTaxRate(Number(e.target.value))}
                  />
                </div>

                <div className="flex justify-between font-semibold text-lg border-t pt-2">
                  <span>Total</span>
                  <span className="tabular-nums">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Error */}
            {!isPending && state?.success === false && (
              <p className="text-sm text-red-500 text-center">{state.error}</p>
            )}

            {/* Footer */}
            <div className="shrink-0 border-t pt-4 flex justify-end gap-3 bg-background">
              <Button
                type="submit"
                disabled={isPending}
                className="w-full md:w-auto h-11 rounded-full bg-primary px-6 text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 shadow-[0_0_0_1px_rgba(124,106,242,0.25),0_12px_45px_rgba(124,106,242,0.3)] hover:shadow-[0_0_0_1px_rgba(124,106,242,0.4),0_18px_60px_rgba(124,106,242,0.4)]"
              >
                {isPending ? "Creating invoice..." : "Create Invoice"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {invoiceId && (
        <InvoiceActionModal
          open={showConfirm}
          invoiceId={invoiceId}
          onClose={() => {
            setConfirmDismissed(true); // ← replaces setShowConfirm(false)
            onClose();
            resetForm();
            router.refresh();
          }}
        />
      )}
    </>
  );
}
