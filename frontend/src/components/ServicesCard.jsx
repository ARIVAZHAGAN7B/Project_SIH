import React from "react";
import { kolamRedraw, KolamGenerator, rangoli } from "../assets/Assets";
import { useNavigate } from "react-router-dom";

const services = [
  {
    title: "Kolam Generator",
    img: KolamGenerator,
    desc: "Generate unique Kolam patterns using algorithms and AI.",
    action: "Generate",
    navigation: "/kolam-generator",
  },
  {
    title: "Kolam Redraw",
    img: kolamRedraw,
    desc: "Redraw and enhance traditional Kolams with precision tools.",
    action: "Redraw",
    navigation: "/redraw-kolam"
  },
  {
    title: "Rangoli",
    img: rangoli,
    desc: "Explore colorful Rangoli designs inspired by tradition.",
    action: "Explore",
    navigation: "/rangoli"
  },
];

const ServicesCard = () => {
  const navigate = useNavigate();
  return (
    <div className="grid md:grid-cols-3 gap-6 px-6">
      {services.map((service, idx) => (
        <div
          key={idx}
className="rounded-2xl bg-[#1a1a32] border shadow-lg hover:shadow-xl transition transform hover:-translate-y-2 p-5 flex flex-col items-center text-center"
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
          <button onClick={() => service.navigation && navigate(service.navigation)} className="mt-4 cursor-pointer px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition">
            {service.action}
          </button>
        </div>
      ))}
    </div>
  );
};

export default ServicesCard;
