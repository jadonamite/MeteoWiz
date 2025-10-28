"use client";

import { useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";

const LeftSidebar = ({ onClose }) => {
   const [activeItem, setActiveItem] = useState("computation");

   const menuItems = [
      { id: "computation", label: "Computation page", href: "/computation" },
      { id: "cloud-atlas", label: "Cloud Atlas", href: "/cloud-atlas" },
      {
         id: "daily-register",
         label: "Daily Register",
         href: "/daily-register",
      },
   ];

   return (
      <aside className="w-38 bg-[#cccccc] h-full flex-shrink-0 px-2">
         {/* Mobile Close Button - ONLY NEW ADDITION */}
         {onClose && (
            <div className="lg:hidden p-2 flex justify-end border-b border-gray-400">
               <button
                  onClick={onClose}
                  className="p-1 hover:bg-gray-400 rounded"
                  aria-label="Close sidebar"
               >
                  <X className="w-5 h-5 text-gray-700" />
               </button>
            </div>
         )}

         {/* Navigation Menu - YOUR ORIGINAL */}
         <nav className="flex flex-col gap-1">
            {menuItems.map((item) => (
               <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => {
                     setActiveItem(item.id);
                     onClose?.(); // Close sidebar on mobile after click
                  }}
                  className={`
              px-3 py-3 text-xs bg-[#cccccc] border-b
              transition-colors duration-200
              hover:bg-gray-400 text-neutral-900
              ${activeItem === item.id ? "bg-white font-semibold" : ""}
            `}
                  style={{ boxShadow: "2px 2px 0px rgba(0,0,0,0.2)" }}>
                  {item.label}
               </Link>
            ))}
         </nav>
      </aside>
   );
};

export default LeftSidebar;