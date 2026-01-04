export default function InvoiceViewSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="h-5 w-48 bg-muted rounded" />
        <div className="h-5 w-24 bg-muted rounded-full" />
      </div>

      {/* Client meta */}
      <div className="space-y-2">
        <div className="h-4 w-64 bg-muted rounded" />
        <div className="h-4 w-40 bg-muted rounded" />
      </div>

      {/* Items table */}
      <div className="border rounded-lg overflow-hidden">
        <div className="h-10 bg-muted/50" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-10 border-t bg-muted/30" />
        ))}
      </div>

      {/* Summary */}
      <div className="ml-auto w-52 space-y-2">
        <div className="h-4 bg-muted rounded" />
        <div className="h-4 bg-muted rounded" />
        <div className="h-5 bg-muted rounded" />
      </div>
    </div>
  );
}
