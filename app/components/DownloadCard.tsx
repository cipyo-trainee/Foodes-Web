"use client";

<<<<<<< HEAD
import { Card, CardBody, Button } from "@heroui/react";
import Image from "next/image";
import playStore from '../../public/playstore.jpg';
=======
import Image from "next/image";
import playStore from '../../public/playstore.jpg'; 
>>>>>>> 9b22b4b13b1517bce36a02ff70113ef5bf37529e
import foodApp from '../../public/foodApp.png';
import Link from "next/link";

export default function DownloadAppCard() {
  return (
<<<<<<< HEAD
    <div className="max-w-5xl mx-auto my-12">
      <Card className="bg-yellow-400 rounded-2xl shadow-lg overflow-hidden">
        <CardBody className="flex flex-col md:flex-row items-center justify-between p-6 md:p-10 gap-6">

          {/* LEFT CONTENT */}
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-black">
              Download Our Food App 🍔
            </h2>
            <p className="text-black/80 mt-3 max-w-md">
              Order your favorite meals faster.
              Exclusive offers only on our app!
            </p>

            {/* PLAY STORE BUTTON */}
            <div className="mt-5 flex justify-center md:justify-start">
              <Link href="#" passHref>
                <Button className="hover:scale-105 transition-transform px-6 py-2 bg-black-600 text-white rounded-lg">
                  <Image
                    src={playStore}
                    alt="Download on Play Store"
                    width={180}
                    height={55}
                  />
                </Button>
              </Link>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative w-60 h-60 md:w-72 md:h-72">
            <Image
              src={foodApp}
              alt="Food App"
              fill
              className="object-contain"
            />
          </div>

        </CardBody>
      </Card>
=======
    <div className="max-w-5xl mx-auto my-12 bg-yellow-400 rounded-2xl shadow-lg overflow-hidden">
      <div className="flex flex-col md:flex-row items-center justify-between p-6 md:p-10 gap-6">
        
        {/* LEFT CONTENT */}
        <div className="text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-black">
            Download Our Food App 🍔
          </h2>
          <p className="text-black/80 mt-3 max-w-md">
            Order your favorite meals faster.  
            Exclusive offers only on our app!
          </p>

          {/* PLAY STORE BUTTON */}
          <div className="mt-5 flex justify-center md:justify-start">
            <Link
              href="#"
              className="hover:scale-105 transition-transform"
            >
              <Image
                src={playStore}   
                alt="Download on Play Store"
                width={180}
                height={55}
              />
            </Link>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative w-60 h-60 md:w-72 md:h-72">
          <Image
            src={foodApp}  
            alt="Food App"
            fill
            className="object-contain"
          />
        </div>

      </div>
>>>>>>> 9b22b4b13b1517bce36a02ff70113ef5bf37529e
    </div>
  );
}
