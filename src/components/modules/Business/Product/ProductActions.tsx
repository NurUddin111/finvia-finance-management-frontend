"use client";

import { useState } from "react";

import { Pencil, Trash2 } from "lucide-react";

import UpdateProductModal from "./UpdateProductModal";

import DeleteProductModal from "./DeleteProductModal";

import { Product } from "@/types/product";

const actionBtn =
  "group flex h-9 w-9 items-center justify-center rounded-xl border transition-all duration-300";

export default function ProductActions({ product }: { product: Product }) {
  const [editOpen, setEditOpen] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-center gap-2">
        {/* EDIT */}
        <button
          title="Edit product"
          onClick={() => setEditOpen(true)}
          className={`${actionBtn} border-blue-500/20 bg-blue-500/10 text-blue-400 hover:border-blue-400/40 hover:bg-blue-500/15 hover:text-blue-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]`}
        >
          <Pencil
            size={15}
            className="transition-transform duration-300 group-hover:scale-110"
          />
        </button>

        {/* DELETE */}
        <button
          title="Delete product"
          onClick={() => setDeleteOpen(true)}
          className={`${actionBtn} border-red-500/20 bg-red-500/10 text-red-400 hover:border-red-400/40 hover:bg-red-500/15 hover:text-red-300 hover:shadow-[0_0_20px_rgba(239,68,68,0.15)]`}
        >
          <Trash2
            size={15}
            className="transition-transform duration-300 group-hover:scale-110"
          />
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
