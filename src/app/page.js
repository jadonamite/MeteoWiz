"use client";

import { useState } from "react";
import ServerTimeWrapper from "./components/ServerTimeWrapper";
import DashboardLayout from "./components/DashboardLayout";
import LeftSidebar from "./components/LeftSidebar";
import TopNavBar from "./components/TopNavBar";

export default function HomePage() {
   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

   return (
      <div className="flex flex-col h-screen overflow-hidden">
         {/* Top Navbar - Pass hamburger handler */}
         <ServerTimeWrapper onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

         {/* Main Container - Sidebar + Content */}
         <div className="flex flex-1 overflow-hidden">
            {/* Left Sidebar Navigation - Desktop visible, Mobile hidden */}
            <div className="hidden lg:block">
               <LeftSidebar />
            </div>

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
               <>
                  {/* Backdrop */}
                  <div
                     className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                     onClick={() => setIsSidebarOpen(false)}
                  />
                  {/* Sidebar */}
                  <div className="fixed left-0 top-0 bottom-0 z-50 lg:hidden">
                     <LeftSidebar onClose={() => setIsSidebarOpen(false)} />
                  </div>
               </>
            )}

            {/* Right Container - TopNav + Dashboard */}
            <div className="flex flex-col flex-1 overflow-hidden">
               {/* Top Navigation Bar - YOUR ORIGINAL */}
               <TopNavBar />

               {/* Main Dashboard Content */}
               <div className="flex-1 overflow-auto bg-gray-100">
                  <DashboardLayout />
               </div>
            </div>
         </div>
      </div>
   );
}
