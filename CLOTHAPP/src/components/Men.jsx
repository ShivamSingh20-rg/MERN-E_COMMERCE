import React from 'react';
import {Link} from 'react-router-dom';
const MEN_DATA = {
  sections: [
    {
      title: 'Clothing',
      items: [
        { name: 'Casual Shirts' },
        { name: 'Formal Shirts'},
        { name: 'T-Shirt'},
        { name: 'Oversized Tees' },
        { name: 'Pants & Chinos' },
        { name: 'Joggers & Trackpants' }
      ]
    },
    {
      title: 'Business Wear',
      items: [
        { name: 'Blazers & Coats' },
        { name: 'Suits'},
        { name: 'Formal Trousers'}
      ]
    },
    {
      title: 'Innerwear',
      items: [
        { name: 'Briefs & Trunks' },
        { name: 'Boxers'},
        { name: 'Vests' }
      ]
    },
    {
      title: 'Collaborations',
      items: [
        { name: 'Anime Edition'},
        { name: 'Streetwear Drop' }
      ]
    }
  ]
};

export default function Men() {
  return (
    /* The key change: absolute layout targeting the exact edge of the screen layout */
    <div className="absolute top-20 left-0 w-screen bg-white border-b border-gray-200 shadow-xl z-50">
      {/* Centered grid container matching your navbar boundary constraint */}
      <div className="max-w-7xl mx-auto grid grid-cols-4 gap-12 px-8 py-10">
        
        {MEN_DATA.sections.map((section, idx) => (
          <div key={idx} className="flex flex-col space-y-4">
            {/* Super Category Title Header */}
            <h3 className="text-xs font-bold uppercase tracking-widest text-black border-b border-gray-100 pb-2">
              {section.title}
            </h3>
            
            {/* Gap-managed child rows */}
            <ul className="space-y-3">
              {section.items.map((item, itemIdx) => (
                <li key={itemIdx}>
                  <Link className ='text-[13px] text-gray-500 hover:text-black hover:font-medium transition-colors block'to={`/category/${item.name}`}>{item.name.replace('-', ' ')}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

      </div>
    </div>
  );
}