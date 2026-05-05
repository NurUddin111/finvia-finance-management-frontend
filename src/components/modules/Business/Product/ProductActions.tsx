"use client";

import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import UpdateProductModal from "./UpdateProductModal";
import DeleteProductModal from "./DeleteProductModal";
import { Product } from "@/types/product";

export default function ProductActions({ product }: { product: Product }) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-center gap-2">
        <button
          title="Edit product"
          onClick={() => setEditOpen(true)}
          className="w-7.5 h-7.5 rounded-[7px] flex items-center justify-center bg-indigo-500/15 text-indigo-300 hover:bg-indigo-500/30 hover:text-indigo-200 transition-all duration-150"
        >
          <Pencil size={14} />
        </button>

        <button
          title="Delete product"
          onClick={() => setDeleteOpen(true)}
          className="w-7.5 h-7.5 rounded-[7px] flex items-center justify-center bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all duration-150"
        >
          <Trash2 size={14} />
        </button>
      </div>

      <UpdateProductModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        product={product}
      />

      <DeleteProductModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        productId={product.id}
        productName={product.name}
      />
    </>
  );
}
