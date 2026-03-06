"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

import team1 from "../../public/team1.jpg";
import malechef from "../../public/malechef.jpg";
import malechef1 from "../../public/malechef1.jpg";

type Chef = {
    id: number;
    name: string;
    role: string;
    image: StaticImageData;
    socials?: {
        facebook?: string;
        instagram?: string;
        twitter?: string;
    };
};

const MeetOurChefs: React.FC = () => {
    const chefs: Chef[] = [
        {
            id: 1,
            name: "Chef Gordon",
            role: "Head Chef",
            image: team1,
            socials: {
                facebook: "#",
                instagram: "#",
                twitter: "#",
            },
        },
        {
            id: 2,
            name: "Chef Maria",
            role: "Pastry Chef",
            image: malechef,
            socials: {
                facebook: "#",
                instagram: "#",
                twitter: "#",
            },
        },
        {
            id: 3,
            name: "Chef John",
            role: "Sous Chef",
            image: malechef1,
            socials: {
                facebook: "#",
                instagram: "#",
                twitter: "#",
            },
        },
    ];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-800">
                        Meet Our Chefs
                    </h2>
                    <p className="text-gray-600 mt-3 text-lg">
                        Passionate experts creating unforgettable flavors.
                    </p>
                </div>

                {/* Chefs Grid */}
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
                    {chefs.map((chef) => (
                        <div
                            key={chef.id}
                            className="group relative bg-gray-50 rounded-3xl shadow-md overflow-hidden"
                        >
                            {/* Chef Image */}
                            <div className="relative w-full h-72">
                                <Image
                                    src={chef.image}
                                    alt={chef.name}
                                    fill
                                    className="object-cover"
                                />

                                {/* Social Overlay */}
                                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition duration-300">
                                    {chef.socials?.facebook && (
                                        <a
                                            href={chef.socials.facebook}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-white text-lg p-2 rounded-full hover:bg-orange-500 transition"
                                        >
                                            <FaFacebookF />
                                        </a>
                                    )}
                                    {chef.socials?.instagram && (
                                        <a
                                            href={chef.socials.instagram}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-white text-lg p-2 rounded-full hover:bg-orange-500 transition"
                                        >
                                            <FaInstagram />
                                        </a>
                                    )}
                                    {chef.socials?.twitter && (
                                        <a
                                            href={chef.socials.twitter}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-white text-lg p-2 rounded-full hover:bg-orange-500 transition"
                                        >
                                            <FaTwitter />
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Chef Info */}
                            <div className="p-6 text-center">
                                <h3 className="text-2xl font-semibold text-gray-800">
                                    {chef.name}
                                </h3>
                                <p className="text-orange-500 mt-2 font-medium">{chef.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MeetOurChefs;