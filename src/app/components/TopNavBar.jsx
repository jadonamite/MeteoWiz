"use client";

import { useState } from "react";
import Link from "next/link";

const TopNavBar = () => {
   const [activeNav, setActiveNav] = useState("forms-mets");
   const [selectedMsgType, setSelectedMsgType] = useState("METAR");

   const messageTypes = ["METAR", "SPECI", "TAF", "SIGMET", "AIRMET"];

   const navLinks = [
      { id: "forms-mets", label: "FORM-METS", href: "/forms-mets" },
      { id: "collectives", label: "COLLECTIVES", href: "/collectives" },
      { id: "returns", label: "RETURNS", href: "/returns" },
      { id: "metar-speci", label: "METAR & SPECI", href: "/metar-speci" },
      { id: "obs-manual", label: "OBS MANUAL (PDF)", href: "/obs-manual" },
      { id: "manual", label: "Manual (PDF)", href: "/manual" },
      { id: "meteo-saic", label: "Meteo-saic", href: "/meteo-saic" },
      {
         id: "units-conversion",
         label: "UNITS CONVERSION",
         href: "/units-conversion",
      },
      {
         id: "interface-awos",
         label: "Interface AWOS",
         href: "/interface-awos",
      },
   ];

   return (
      <nav className="bg-gray-300 border-b border-gray-400">
         {/* ONLY CHANGE: Added overflow-x-auto and flex-shrink-0 */}
         <div className="flex items-center gap-1 px-2 py-1.5 overflow-x-auto">
            {/* Dropdown - Select type of message */}
            <div className="relative flex-shrink-0">
               <select
                  value={selectedMsgType}
                  onChange={(e) => setSelectedMsgType(e.target.value)}
                  className="
              px-3 py-1 text-sm bg-white border border-gray-400 
              rounded cursor-pointer hover:bg-gray-50
              focus:outline-none focus:ring-2 focus:ring-blue-500
            ">
                  <option value="" disabled>
                     Select type of msg
                  </option>
                  {messageTypes.map((type) => (
                     <option key={type} value={type}>
                        {type}
                     </option>
                  ))}
               </select>
            </div>

            {/* Navigation Links */}
            {navLinks.map((link) => (
               <Link
                  key={link.id}
                  href={link.href}
                  onClick={() => setActiveNav(link.id)}
                  className={`
              px-3 py-1 text-xs font-medium rounded flex-shrink-0
              transition-colors duration-150
              hover:bg-gray-400
              ${
                 activeNav === link.id
                    ? "bg-gray-400 text-gray-900"
                    : "text-gray-700"
              }
            `}>
                  {link.label}
               </Link>
            ))}
         </div>
      </nav>
   );
};

export default TopNavBar;