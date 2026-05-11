// src/components/modules/Demo/Product/DemoProductTable.tsx

import { PackageOpen } from "lucide-react";
import { Product } from "@/types/product";
import DemoProductActions from "./DemoProductActions";

const DemoProductTable = ({ products }: { products: Product[] }) => {
  return (
    <div className="border border-white/[0.07] rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/[0.07] text-muted-foreground text-xs uppercase tracking-wide">
            <th className="text-left px-4 py-3 font-medium">#</th>
            <th className="text-left px-4 py-3 font-medium">Name</th>
            <th className="text-right px-4 py-3 font-medium">Total Earning</th>
            <th className="text-center px-4 py-3 font-medium">Total Sold</th>
            <th className="text-center px-4 py-3 font-medium">Pending</th>
            <th className="text-center px-4 py-3 font-medium">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan={6}>
                <div className="flex flex-col items-center justify-center py-16 text-muted-foreground gap-3">
                  <PackageOpen size={32} strokeWidth={1.2} />
                  <p className="text-sm">No products found.</p>
                </div>
              </td>
            </tr>
          ) : (
            products.map((product, index) => (
              <tr
                key={product.id}
                className="border-b border-white/4 hover:bg-white/2 transition-colors last:border-none"
              >
                <td className="px-4 py-3 text-muted-foreground">{index + 1}</td>
                <td className="px-4 py-3 font-medium text-foreground">
                  {product.name}
                </td>
                <td className="px-4 py-3 text-right text-emerald-400">
                  ${product.totalEarning.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-center text-foreground">
                  {product.totalSold}
                </td>
                <td className="px-4 py-3 text-center">
                  {product.pendingOrder > 0 ? (
                    <span className="text-orange-400">
                      {product.pendingOrder}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </td>
                <td className="px-4 py-3 text-center">
                  <DemoProductActions />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DemoProductTable;
