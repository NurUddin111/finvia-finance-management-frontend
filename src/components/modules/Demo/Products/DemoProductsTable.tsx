// src/components/modules/Demo/Product/DemoProductTable.tsx

"use client";

import { PackageOpen, Boxes, TrendingUp, Clock3 } from "lucide-react";

import { Product } from "@/types/product";

import DemoProductActions from "./DemoProductActions";

const DemoProductTable = ({ products }: { products: Product[] }) => {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] px-6 py-16 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-3xl border border-white/10 bg-white/3">
          <PackageOpen size={26} className="text-slate-500" />
        </div>

        <div className="space-y-1">
          <p className="text-lg font-semibold text-white">No products found</p>

          <p className="text-sm text-slate-400">
            Start adding products to manage inventory and track sales
            performance.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* MOBILE */}
      <div className="space-y-3 md:hidden">
        {products.map((product) => (
          <div
            key={product.id}
            className="group overflow-hidden rounded-2xl border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] p-4 transition-all duration-300 hover:border-blue-500/20 hover:bg-white/2"
          >
            {/* TOP */}
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10">
                    <Boxes className="size-4 text-blue-400" />
                  </div>

                  <div>
                    <p className="truncate text-sm font-semibold text-white">
                      {product.name}
                    </p>
                  </div>
                </div>
              </div>

              <DemoProductActions />
            </div>

            {/* STATS */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-white/6 bg-white/3 p-3">
                <div className="flex items-center gap-1.5">
                  <TrendingUp size={12} className="text-emerald-400" />

                  <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-slate-500">
                    Revenue
                  </p>
                </div>

                <p className="mt-1 text-sm font-semibold text-emerald-400">
                  ${product.totalEarning.toLocaleString()}
                </p>
              </div>

              <div className="rounded-xl border border-white/6 bg-white/3 p-3">
                <div className="flex items-center gap-1.5">
                  <Boxes size={12} className="text-blue-400" />

                  <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-slate-500">
                    Sold
                  </p>
                </div>

                <p className="mt-1 text-sm font-semibold text-white">
                  {product.totalSold} units
                </p>
              </div>
            </div>

            {/* PENDING */}
            <div className="mt-3 rounded-xl border border-white/6 bg-white/3 p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Clock3 size={12} className="text-amber-400" />

                  <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-slate-500">
                    Pending Orders
                  </p>
                </div>

                <p
                  className={`text-sm font-semibold ${
                    product.pendingOrder > 0
                      ? "text-amber-400"
                      : "text-slate-500"
                  }`}
                >
                  {product.pendingOrder > 0 ? product.pendingOrder : "—"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP */}
      <div className="hidden overflow-hidden rounded-3xl border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] md:block">
        <div className="overflow-x-auto">
          <table className="w-full table-fixed">
            <thead>
              <tr className="border-b border-white/6 bg-white/2">
                <th className="w-[30%] px-6 py-4 text-left text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                  Product
                </th>

                <th className="w-[20%] px-6 py-4 text-right text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                  Revenue
                </th>

                <th className="w-[18%] px-6 py-4 text-center text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                  Sold
                </th>

                <th className="w-[18%] px-6 py-4 text-center text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                  Pending
                </th>

                <th className="w-[14%] px-6 py-4 text-center text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="group border-b border-white/4 transition-all duration-300 hover:bg-white/2"
                >
                  {/* PRODUCT */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10">
                        <Boxes className="size-4 text-blue-400" />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-white">
                          {product.name}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* REVENUE */}
                  <td className="px-6 py-5">
                    <p className="text-right text-sm font-semibold tabular-nums text-emerald-400">
                      ${product.totalEarning.toLocaleString()}
                    </p>
                  </td>

                  {/* SOLD */}
                  <td className="px-6 py-5">
                    <p className="text-center text-sm font-semibold text-white">
                      {product.totalSold}
                    </p>
                  </td>

                  {/* PENDING */}
                  <td className="px-6 py-5">
                    <p
                      className={`text-center text-sm font-semibold ${
                        product.pendingOrder > 0
                          ? "text-amber-400"
                          : "text-slate-500"
                      }`}
                    >
                      {product.pendingOrder > 0 ? product.pendingOrder : "—"}
                    </p>
                  </td>

                  {/* ACTIONS */}
                  <td className="px-6 py-5 text-center">
                    <DemoProductActions />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default DemoProductTable;
