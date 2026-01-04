/* eslint-disable @typescript-eslint/no-explicit-any */
import { getMyBusiness } from "@/services/business/getMyBusiness";
import Image from "next/image";

export default async function BusinessBrand() {
  const business: any = await getMyBusiness();

  if (!business) return null;

  const { name, logoUrl } = business?.data;

  return (
    <div className="mb-6 flex items-center gap-3 px-2 min-w-0">
      {logoUrl && (
        <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-md">
          <Image
            src={logoUrl}
            alt={name}
            fill
            sizes="36px"
            className="object-cover"
          />
        </div>
      )}

      {name && (
        <span className="truncate text-base font-semibold leading-tight">
          {name}
        </span>
      )}
    </div>
  );
}
