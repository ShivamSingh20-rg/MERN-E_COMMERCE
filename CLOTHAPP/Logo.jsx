import React from 'react';

const Logo = () => {
  return (
    /* The 'group' class allows us to trigger the "flick" animation 
      whenever the user hovers over this container 
    */
    <div className="group cursor-pointer flex items-center p-2">
      <h1 className="text-3xl md:text-4xl font-black uppercase tracking-[0.10em] transition-all duration-500 ease-in-out group-hover:tracking-[0.20em]">
        
        {/* The Solid Base */}
        <span className="text-gray-950">Snap</span>
        
        {/* The Colorful "Flick" - Notice the italic to give it a 'fast' feeling */}
        <span className="italic">
          <span className="text-[#8b5cf6] transition-all duration-300 group-hover:text-purple-400">f</span>
          <span className="text-[#d946ef] transition-all duration-300 group-hover:text-fuchsia-400">l</span>
          <span className="text-[#ec4899] transition-all duration-300 group-hover:text-pink-400">i</span>
          <span className="text-[#f43f5e] transition-all duration-300 group-hover:text-rose-400">c</span>
          <span className="text-[#f97316] transition-all duration-300 group-hover:text-orange-400">k</span>
        </span>
        
      </h1>
    </div>
  );
};

export default Logo;