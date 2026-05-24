"use client";

import { Boxes, Clock3, PackageOpen, TrendingUp } from "lucide-react";

import { IProduct } from "@/types/product";

import DemoProductActions from "./DemoProductActions";

const DemoProductTable = ({ products }: { products: IProduct[] }) => {
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
      <div className="space-y-3 sm:hidden">
        {products.map((product) => (
          <div
            key={product.id}
            className="group overflow-hidden rounded-2xl border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] p-4 transition-all duration-300 hover:border-blue-500/20 hover:bg-white/2"
          >
            {/* TOP */}
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10">
                    <Boxes className="size-4 text-blue-400" />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white">
                      {product.name}
                    </p>
                  </div>
                </div>
              </div>

              <DemoProductActions />
            </div>

            {/* META */}
            <div className="mt-4 grid grid-cols-2 gap-3 rounded-2xl border border-white/5 bg-white/2 p-3">
              {/* REVENUE */}
              <div>
                <p className="text-[9px] uppercase tracking-[0.16em] text-slate-500 sm:text-[10px] sm:tracking-[0.18em]">
                  Revenue
                </p>

                <p className="mt-2 truncate text-sm font-semibold text-emerald-400">
                  ${product.totalEarning.toLocaleString()}
                </p>
              </div>

              {/* SOLD */}
              <div className="text-right">
                <p className="text-[9px] uppercase tracking-[0.16em] text-slate-500 sm:text-[10px] sm:tracking-[0.18em]">
                  Sold
                </p>

                <p className="mt-2 text-sm font-semibold text-white">
                  {product.totalSold} units
                </p>
              </div>
            </div>

            {/* PENDING */}
            <div className="mt-3 rounded-2xl border border-white/5 bg-white/2 p-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[9px] uppercase tracking-[0.16em] text-slate-500 sm:text-[10px] sm:tracking-[0.18em]">
                  Pending Orders
                </p>

                <p
                  className={`shrink-0 text-sm font-semibold ${
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

      {/* TABLET */}
      <div className="hidden space-y-4 sm:block lg:hidden">
        {products.map((product) => (
          <div
            key={product.id}
            className="group overflow-hidden rounded-3xl border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] p-5 transition-all duration-300 hover:border-blue-500/20 hover:bg-white/2"
          >
            {/* TOP */}
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10">
                  <Boxes className="size-4 text-blue-400" />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-base font-semibold text-white">
                    {product.name}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Product overview
                  </p>
                </div>
              </div>

              <DemoProductActions />
            </div>

            {/* META */}
            <div className="mt-5 grid grid-cols-3 gap-3">
              {/* REVENUE */}
              <div className="rounded-2xl border border-white/5 bg-white/2 p-4">
                <div className="flex items-center gap-2">
                  <TrendingUp size={13} className="text-emerald-400" />

                  <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
                    Revenue
                  </p>
                </div>

                <p className="mt-3 truncate text-sm font-semibold text-emerald-400">
                  ${product.totalEarning.toLocaleString()}
                </p>
              </div>

              {/* SOLD */}
              <div className="rounded-2xl border border-white/5 bg-white/2 p-4">
                <div className="flex items-center gap-2">
                  <Boxes size={13} className="text-blue-400" />

                  <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
                    Sold
                  </p>
                </div>

                <p className="mt-3 text-sm font-semibold text-white">
                  {product.totalSold} units
                </p>
              </div>

              {/* PENDING */}
              <div className="rounded-2xl border border-white/5 bg-white/2 p-4">
                <div className="flex items-center gap-2">
                  <Clock3 size={13} className="text-amber-400" />

                  <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
                    Pending
                  </p>
                </div>

                <p
                  className={`mt-3 text-sm font-semibold ${
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
      <div className="hidden overflow-hidden rounded-3xl border border-white/10 bg-linear-to-b from-[#0B1120] to-[#050816] lg:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-190">
            <thead>
              <tr className="border-b border-white/6 bg-white/2">
                <th className="px-4 py-4 text-left text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500 lg:px-6">
                  Product
                </th>

                <th className="px-4 py-4 text-right text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500 lg:px-6">
                  Revenue
                </th>

                <th className="px-4 py-4 text-center text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500 lg:px-6">
                  Sold
                </th>

                <th className="px-4 py-4 text-center text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500 lg:px-6">
                  Pending
                </th>

                <th className="px-4 py-4 text-center text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500 lg:px-6">
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
                  <td className="px-4 py-4 lg:px-6 lg:py-5">
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
                  <td className="px-4 py-4 text-right lg:px-6 lg:py-5">
                    <p className="text-sm font-semibold tabular-nums text-emerald-400">
                      ${product.totalEarning.toLocaleString()}
                    </p>
                  </td>

                  {/* SOLD */}
                  <td className="px-4 py-4 text-center lg:px-6 lg:py-5">
                    <p className="text-sm font-semibold text-white">
                      {product.totalSold}
                    </p>
                  </td>

                  {/* PENDING */}
                  <td className="px-4 py-4 text-center lg:px-6 lg:py-5">
                    <p
                      className={`text-sm font-semibold ${
                        product.pendingOrder > 0
                          ? "text-amber-400"
                          : "text-slate-500"
                      }`}
                    >
                      {product.pendingOrder > 0 ? product.pendingOrder : "—"}
                    </p>
                  </td>

                  {/* ACTIONS */}
                  <td className="px-4 py-4 lg:px-6 lg:py-5">
                    <div className="flex justify-center">
                      <DemoProductActions />
                    </div>
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
