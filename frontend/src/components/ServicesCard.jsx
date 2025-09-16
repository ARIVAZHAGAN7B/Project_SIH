import React from "react";
import { kolamRedraw, KolamGenerator, rangoli } from "../assets/Assets";

const services = [
  {
    title: "Kolam Generator",
    img: KolamGenerator,
    desc: "Generate unique Kolam patterns using algorithms and AI.",
    action: "Generate",
  },
  {
    title: "Kolam Redraw",
    img: kolamRedraw,
    desc: "Redraw and enhance traditional Kolams with precision tools.",
    action: "Redraw",
  },
  {
    title: "Rangoli",
    img: rangoli,
    desc: "Explore colorful Rangoli designs inspired by tradition.",
    action: "Explore",
  },
];

const ServicesCard = () => {
  return (
    <div className="grid md:grid-cols-3 gap-6 px-6">
      {services.map((service, idx) => (
        <div
          key={idx}
className="rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-2 p-5 flex flex-col items-center text-center"
>
          <img
            src={service.img}
            alt={service.title}
            className="w-24 h-24 object-contain mb-4"
          />
          <h2 className="text-xl font-semibold text-white-800">
            {service.title}
          </h2>
          <p className="text-white-600 mt-2 text-sm">{service.desc}</p>
          <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition">
            {service.action}
          </button>
        </div>
      ))}
    </div>
  );
};

export default ServicesCard;
