import Image, { StaticImageData } from "next/image";

type CouponCardProps = {
  title: string;
  description: string;
  code: string;
  image: StaticImageData;
};

export default function CouponCard({
  title,
  description,
  code,
  image,
}: CouponCardProps) {
  return (
    <div className="w-full my-6">
      <div className="relative h-60 w-full overflow-hidden rounded-2xl">

        {/* Full width image */}
        <Image
          src={image}
          alt={title}
          fill
          priority
          className="object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/55" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold">
            {title}
          </h2>

          <p className="mt-2 max-w-2xl text-gray-200">
            {description}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-4">
            <span className="rounded-lg bg-green-500 px-5 py-2 text-lg font-bold tracking-wider">
              {code}
            </span>

            <button className="rounded-lg border border-white px-6 py-2 hover:bg-white hover:text-black transition">
              Apply Coupon
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
