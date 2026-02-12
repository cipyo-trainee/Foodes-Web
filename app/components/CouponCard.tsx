import { Button } from "@heroui/react";
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
    <div className="w-full my-6 px-4 sm:px-6 lg:px-12">
      <div className="relative h-60 w-full overflow-hidden rounded-2xl shadow-lg">

        {/* Full width image */}
        <Image
          src={image}
          alt={title}
          fill
          priority
          className="object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-center px-6 md:px-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold text-center">{title}</h2>

          <p className="mt-2 max-w-2xl text-gray-200 text-center">
            {description}
          </p>

          <div className="mt-5 flex flex-wrap justify-center gap-4">
            {/* Coupon Code */}
            <span className="rounded-lg bg-green-500 px-6 py-3 text-lg font-semibold tracking-wider">
              {code}
            </span>

            {/* Apply Coupon Button */}
            <Button className="rounded-lg border border-white px-6 py-3 hover:bg-white hover:text-black transition-colors duration-300">
              Apply Coupon
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
