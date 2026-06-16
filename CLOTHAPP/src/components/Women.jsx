import React from 'react';
import {Link} from 'react-router-dom';

const WOMEN_DATA = {
  sections: [
    {
      title: 'Clothing',
      items: [
        { name: 'Sarees'},
        { name: 'Kurtas & Suits' },
        { name: 'Tops & Blouses' },
        { name: 'Oversized T-Shirts' },
        { name: 'Dresses & Jumpsuits' },
        { name: 'Jeans & Denim' }
      ]
    },
    {
      title: 'Business Wear',
      items: [
        { name: 'Pantsuits' },
        { name: 'Formal Blazers' },
        { name: 'Office Shirts' },
        { name: 'Pencil Skirts' }
      ]
    },
    {
      title: 'Innerwear & Loungewear',
      items: [
        { name: 'Bras & Bralettes' },
        { name: 'Panties & Multipacks' },
        { name: 'Co-ord Lounge Sets' }
      ]
    },
    {
      title: 'Collaborations',
      items: [
        { name: 'Retro Atelier 2026' },
        { name: 'Sustainable Silk' }
      ]
    }
  ],
};

export default function Women() {
  return (
    <div className="w-full bg-white animate-fade-in">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8 lg:px-8 lg:py-12">
        {WOMEN_DATA.sections.map((section, idx) => (
          <div key={idx} className="flex flex-col space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-black border-b border-gray-100 pb-2">
              {section.title}
            </h3>
            <ul className="space-y-2.5">
              {section.items.map((item, itemIdx) => (
                <li key={itemIdx}>
                  <Link 
                    className='text-[13px] text-gray-500 hover:text-black hover:font-medium transition-colors block'
                    to={`/category/${item.name}`}
                  >
                    {item.name.replace('-', ' ')}
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
