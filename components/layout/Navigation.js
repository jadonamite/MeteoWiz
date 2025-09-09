import Link from "next/link";
import { useRouter } from "next/router";

export default function Navigation() {
   const router = useRouter();

   const navItems = [
      { href: "/", label: "Computational Page", icon: "📊" },
      { href: "/daily-register", label: "Daily Register", icon: "📋" },
      { href: "/metar-speci", label: "METAR & SPECI", icon: "✈️" },
      { href: "/reports", label: "Reports", icon: "📈" }, // Future
      { href: "/settings", label: "Settings", icon: "⚙️" }, // Future
   ];

   return (
      <nav className="bg-blue-900 text-white shadow-lg">
         <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
               <div className="flex items-center space-x-2">
                  <span className="text-2xl">🌤️</span>
                  <h1 className="text-xl font-bold">
                     Nigerian Meteorological Agency
                  </h1>
               </div>

               <div className="flex space-x-6">
                  {navItems.map((item) => (
                     <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors
                  ${
                     router.pathname === item.href
                        ? "bg-blue-700 text-white"
                        : "text-blue-100 hover:bg-blue-800 hover:text-white"
                  }`}>
                        <span>{item.icon}</span>
                        <span>{item.label}</span>
                     </Link>
                  ))}
               </div>
            </div>
         </div>
      </nav>
   );
}