import Image from "next/image";

export default async function BrandFinvia() {
  return (
    <div className="mb-6 flex items-center gap-3 px-2 min-w-0">
      <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-md">
        <Image
          src="https://i.ibb.co.com/N6ywjL2/lauren-mancke-a-OC7-TSLb1o8-unsplash.jpg"
          alt="Finvia brand logo"
          fill
          sizes="36px"
          className="object-cover"
        />
      </div>

      <span className="truncate text-base font-semibold leading-tight">
        Finvia
      </span>
    </div>
  );
}
