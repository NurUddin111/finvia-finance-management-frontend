"use client";

import React, { useState } from "react";
import { Pencil, Trash2, Search, PackageOpen } from "lucide-react";
import { Product } from "@/types/product";
import ProductActions from "./ProductActions";

interface ProductTableProps {
  products: Product[];
  //   onEdit: (product: Product) => void;
  //   onDelete: (product: Product) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  //   onEdit,
  //   onDelete,
}) => {
  const [search, setSearch] = useState("");

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      {/* Search */}
      <div className="relative mb-4 w-full sm:max-w-xs">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-8 pr-4 py-2 text-sm rounded-lg border border-white/[0.07] bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-white/20"
        />
      </div>

      {/* Table */}
      <div className="border border-white/[0.07] rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.07] text-muted-foreground text-xs uppercase tracking-wide">
              <th className="text-left px-4 py-3 font-medium">#</th>
              <th className="text-left px-4 py-3 font-medium">Name</th>
              <th className="text-right px-4 py-3 font-medium">
                Total Earning
              </th>
              <th className="text-center px-4 py-3 font-medium">Total Sold</th>
              <th className="text-right px-4 py-3 font-medium">Pending</th>
              <th className="text-center px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6}>
                  <div className="flex flex-col items-center justify-center py-16 text-muted-foreground gap-3">
                    <PackageOpen size={32} strokeWidth={1.2} />
                    <p className="text-sm">
                      {search
                        ? "No products match your search."
                        : "No products added yet."}
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              filtered.map((product, index) => (
                <tr
                  key={product.id}
                  className="border-b border-white/4 hover:bg-white/2 transition-colors last:border-none"
                >
                  <td className="px-4 py-3 text-muted-foreground">
                    {index + 1}
                  </td>

                  <td className="px-4 py-3 font-medium text-foreground">
                    {product.name}
                  </td>

                  <td className="px-4 py-3 text-right text-emerald-400">
                    ${product.totalEarning.toLocaleString()}
                  </td>

                  <td className="px-4 py-3 text-center text-foreground">
                    {product.totalSold}
                  </td>

                  <td className="px-4 py-3 text-right">
                    {product.pendingOrder > 0 ? (
                      <span className="text-orange-400">
                        {product.pendingOrder}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>

                  <td className="px-4 py-3 text-center">
                    <ProductActions product={product} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {filtered.length > 0 && (
        <p className="text-xs text-muted-foreground mt-3">
          Showing {filtered.length} of {products.length} products
        </p>
      )}
    </div>
  );
};

export default ProductTable;
