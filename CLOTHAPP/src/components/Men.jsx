 import React from "react";
import { Link } from "react-router-dom";

const MEN_DATA = {
  sections: [
    {
      title: "Clothing",
      items: [
        { name: "Casual Shirts" },
        { name: "Formal Shirts" },
        { name: "T-Shirt" },
        { name: "Oversized Tees" },
        { name: "Pants & Chinos" },
        { name: "Joggers & Trackpants" },
      ],
    },
    {
      title: "Business Wear",
      items: [
        { name: "Blazers & Coats" },
        { name: "Suits" },
        { name: "Formal Trousers" },
      ],
    },
    {
      title: "Innerwear",
      items: [
        { name: "Briefs & Trunks" },
        { name: "Boxers" },
        { name: "Vests" },
      ],
    },
    {
      title: "Collaborations",
      items: [
        { name: "Anime Edition" },
        { name: "Streetwear Drop" },
      ],
    },
  ],
};

export default function Men() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-4 gap-12">
        {MEN_DATA.sections.map((section, idx) => (
          <div key={idx}>
            <h3 className="mb-4 border-b border-gray-100 pb-2 text-xs font-bold uppercase tracking-widest text-ebony">
              {section.title}
            </h3>

            <ul className="space-y-3">
              {section.items.map((item, itemIdx) => (
                <li key={itemIdx}>
                  <Link
                    to={`/category/${item.name}`}
                    className="block text-[13px] text-gray-500 transition hover:translate-x-1 hover:text-electric"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
