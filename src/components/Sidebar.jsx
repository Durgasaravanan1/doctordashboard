// // // // // Sidebar.jsx
// // // // // Requires: npm i react-icons
// // // // // TailwindCSS required
// // // // //
// // // // // FIXED:
// // // // // ✅ Uses react-router-dom navigation (useNavigate)
// // // // // ✅ Auto active highlight (useLocation)
// // // // // ✅ Clicking menu changes route correctly

// // // // import React from "react";
// // // // import { useLocation, useNavigate } from "react-router-dom";
// // // // import {
// // // //   FiGrid,
// // // //   FiCalendar,
// // // //   FiUsers,
// // // //   FiShare2,
// // // //   FiRefreshCcw,
// // // //   FiCreditCard,
// // // //   FiSettings,
// // // //   FiUser,
// // // //   FiLogOut,
// // // // } from "react-icons/fi";

// // // // const CYAN = "#00B8DB";
// // // // const YELLOW = "#F0B100";

// // // // export default function Sidebar() {
// // // //   const navigate = useNavigate();
// // // //   const { pathname } = useLocation();

// // // //   const items = [
// // // //     { path: "/dashboard", label: "Dashboard", icon: FiGrid },
// // // //     { path: "/appointment", label: "Appointments", icon: FiCalendar },
// // // //     { path: "/patient", label: "Patients", icon: FiUsers },
// // // //     { path: "/socialmedia", label: "Social Media", icon: FiShare2 },
// // // //     { path: "/followups", label: "Follow-ups", icon: FiRefreshCcw },
// // // //     { path: "/billing", label: "Billing", icon: FiCreditCard },
// // // //     { path: "/settings", label: "Settings", icon: FiSettings },
// // // //   ];

// // // //   const isActivePath = (p) => pathname === p;

// // // //   return (
// // // //     <aside className="w-[260px] min-h-screen bg-white border-r border-black/10 flex flex-col">
// // // //       {/* Menu */}
// // // //       <div className="p-4">
// // // //         <div className="space-y-2">
// // // //           {items.map(({ path, label, icon: Icon }) => {
// // // //             const isActive = isActivePath(path);

// // // //             return (
// // // //               <button
// // // //                 key={path}
// // // //                 type="button"
// // // //                 onClick={() => navigate(path)}
// // // //                 className={[
// // // //                   "w-full relative flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition",
// // // //                   "border-2",
// // // //                   isActive
// // // //                     ? "bg-[#EAFBFF] text-black font-extrabold border-black"
// // // //                     : "bg-white text-black/80 border-transparent hover:border-black/10 hover:bg-black/5",
// // // //                 ].join(" ")}
// // // //               >
// // // //                 {/* left active bar */}
// // // //                 {isActive && (
// // // //                   <span
// // // //                     className="absolute left-0 top-0 bottom-0 w-1 rounded-l-md"
// // // //                     style={{ background: CYAN }}
// // // //                   />
// // // //                 )}

// // // //                 <span className="h-8 w-8 rounded-md border-2 border-black flex items-center justify-center bg-white">
// // // //                   <Icon
// // // //                     className="text-[18px]"
// // // //                     style={{ color: isActive ? CYAN : "rgba(0,0,0,0.55)" }}
// // // //                   />
// // // //                 </span>

// // // //                 <span className="truncate">{label}</span>
// // // //               </button>
// // // //             );
// // // //           })}
// // // //         </div>
// // // //       </div>

// // // //       <div className="flex-1" />

// // // //       {/* User card */}
// // // //       <div className="p-4">
// // // //         <div className="rounded-lg border-2 border-black/10 bg-white p-3 flex items-center gap-3">
// // // //           <div
// // // //             className="h-10 w-10 rounded-full flex items-center justify-center text-white border-2 border-black"
// // // //             style={{ background: `linear-gradient(90deg, ${CYAN}, ${YELLOW})` }}
// // // //           >
// // // //             <FiUser />
// // // //           </div>
// // // //           <div className="flex-1 leading-tight">
// // // //             <div className="text-sm font-extrabold text-black">Dr. Sarah Chen</div>
// // // //             <div className="text-xs font-semibold" style={{ color: CYAN }}>
// // // //               Cardiologist
// // // //             </div>
// // // //           </div>
// // // //         </div>

// // // //         <button
// // // //           type="button"
// // // //           onClick={() => alert("Logout (demo)")}
// // // //           className="mt-3 w-full rounded-md border-2 border-black bg-white px-3 py-2 text-sm font-extrabold text-black flex items-center justify-center gap-2 hover:bg-black/5"
// // // //         >
// // // //           <FiLogOut />
// // // //           Logout
// // // //         </button>

// // // //         <button
// // // //           type="button"
// // // //           onClick={() => navigate("/settings")}
// // // //           className="mt-2 w-full rounded-md border-2 border-black px-3 py-2 text-sm font-extrabold text-black flex items-center justify-center gap-2"
// // // //           style={{ background: "#EAFBFF" }}
// // // //         >
// // // //           <FiSettings />
// // // //           Quick Settings
// // // //         </button>
// // // //       </div>
// // // //     </aside>
// // // //   );
// // // // }


// // // // Sidebar.jsx
// // // // Requires: npm i react-icons
// // // // TailwindCSS required
// // // //
// // // // FEATURES:
// // // // ✅ X button collapses sidebar
// // // // ✅ Icon-only collapsed mode
// // // // ✅ Click expand icon to restore
// // // // ✅ React Router navigation works
// // // // ✅ Active route auto-detected

// // // import React, { useState } from "react";
// // // import { useLocation, useNavigate } from "react-router-dom";
// // // import {
// // //   FiGrid,
// // //   FiCalendar,
// // //   FiUsers,
// // //   FiShare2,
// // //   FiRefreshCcw,
// // //   FiCreditCard,
// // //   FiSettings,
// // //   FiUser,
// // //   FiLogOut,
// // //   FiX,
// // //   FiChevronRight,
// // // } from "react-icons/fi";

// // // const CYAN = "#00B8DB";
// // // const YELLOW = "#F0B100";

// // // export default function Sidebar() {
// // //   const navigate = useNavigate();
// // //   const { pathname } = useLocation();
// // //   const [collapsed, setCollapsed] = useState(false);

// // //   const items = [
// // //     { path: "/dashboard", label: "Dashboard", icon: FiGrid },
// // //     { path: "/appointment", label: "Appointments", icon: FiCalendar },
// // //     { path: "/patient", label: "Patients", icon: FiUsers },
// // //     { path: "/socialmedia", label: "Social Media", icon: FiShare2 },
// // //     { path: "/followups", label: "Follow-ups", icon: FiRefreshCcw },
// // //     { path: "/billing", label: "Billing", icon: FiCreditCard },
// // //     { path: "/settings", label: "Settings", icon: FiSettings },
// // //   ];

// // //   const isActive = (path) => pathname === path;

// // //   return (
// // //     <aside
// // //       className={[
// // //         "min-h-screen bg-white border-r border-black/10 flex flex-col transition-all duration-300",
// // //         collapsed ? "w-[80px]" : "w-[260px]",
// // //       ].join(" ")}
// // //     >
// // //       {/* Header / Collapse */}
// // //       <div className="h-14 flex items-center justify-between px-3 border-b border-black/10">
// // //         {!collapsed && (
// // //           <div className="font-extrabold text-sm text-black">WYN AI</div>
// // //         )}
// // //         <button
// // //           onClick={() => setCollapsed(!collapsed)}
// // //           className="h-8 w-8 border-2 border-black rounded-md flex items-center justify-center hover:bg-black/5"
// // //         >
// // //           {collapsed ? <FiChevronRight /> : <FiX />}
// // //         </button>
// // //       </div>

// // //       {/* Menu */}
// // //       <div className="p-3 space-y-2">
// // //         {items.map(({ path, label, icon: Icon }) => {
// // //           const active = isActive(path);

// // //           return (
// // //             <button
// // //               key={path}
// // //               onClick={() => navigate(path)}
// // //               className={[
// // //                 "relative w-full flex items-center gap-3 px-3 py-2.5 rounded-md border-2 transition",
// // //                 active
// // //                   ? "bg-[#EAFBFF] border-black font-extrabold"
// // //                   : "border-transparent hover:border-black/10 hover:bg-black/5",
// // //               ].join(" ")}
// // //             >
// // //               {/* Active bar */}
// // //               {active && (
// // //                 <span
// // //                   className="absolute left-0 top-0 bottom-0 w-1 rounded-l-md"
// // //                   style={{ background: CYAN }}
// // //                 />
// // //               )}

// // //               {/* Icon */}
// // //               <span className="h-8 w-8 rounded-md border-2 border-black flex items-center justify-center bg-white">
// // //                 <Icon
// // //                   className="text-[18px]"
// // //                   style={{ color: active ? CYAN : "rgba(0,0,0,0.55)" }}
// // //                 />
// // //               </span>

// // //               {/* Label */}
// // //               {!collapsed && <span className="truncate">{label}</span>}
// // //             </button>
// // //           );
// // //         })}
// // //       </div>

// // //       <div className="flex-1" />

// // //       {/* User Card */}
// // //       <div className="p-3">
// // //         {!collapsed ? (
// // //           <>
// // //             <div className="rounded-lg border-2 border-black/10 bg-white p-3 flex items-center gap-3">
// // //               <div
// // //                 className="h-10 w-10 rounded-full flex items-center justify-center text-white border-2 border-black"
// // //                 style={{
// // //                   background: `linear-gradient(90deg, ${CYAN}, ${YELLOW})`,
// // //                 }}
// // //               >
// // //                 <FiUser />
// // //               </div>
// // //               <div>
// // //                 <div className="text-sm font-extrabold text-black">
// // //                   Dr. Sarah Chen
// // //                 </div>
// // //                 <div className="text-xs font-semibold" style={{ color: CYAN }}>
// // //                   Cardiologist
// // //                 </div>
// // //               </div>
// // //             </div>

// // //             <button
// // //               onClick={() => alert("Logout (demo)")}
// // //               className="mt-3 w-full rounded-md border-2 border-black bg-white px-3 py-2 text-sm font-extrabold flex items-center justify-center gap-2 hover:bg-black/5"
// // //             >
// // //               <FiLogOut />
// // //               Logout
// // //             </button>
// // //           </>
// // //         ) : (
// // //           <button
// // //             onClick={() => alert("Logout (demo)")}
// // //             className="mx-auto h-10 w-10 border-2 border-black rounded-md flex items-center justify-center hover:bg-black/5"
// // //           >
// // //             <FiLogOut />
// // //           </button>
// // //         )}
// // //       </div>
// // //     </aside>
// // //   );
// // // }

// // // Sidebar.jsx
// // // Requires: npm i react-icons react-router-dom
// // // TailwindCSS required
// // //
// // // Update:
// // // ✅ Scroll inside menu area (sidepanel scroll)
// // // ✅ No unwanted gap above profile card (like your existing design)
// // // ✅ Profile card pinned at bottom
// // // ✅ Collapsible (X): icons-only panel
// // // ✅ Works with react-router navigation

// // import React, { useState } from "react";
// // import { useLocation, useNavigate } from "react-router-dom";
// // import {
// //   FiGrid,
// //   FiCalendar,
// //   FiUsers,
// //   FiShare2,
// //   FiRefreshCcw,
// //   FiCreditCard,
// //   FiSettings,
// //   FiUser,
// //   FiLogOut,
// //   FiX,
// //   FiChevronRight,
// // } from "react-icons/fi";

// // const CYAN = "#00B8DB";

// // export default function Sidebar() {
// //   const navigate = useNavigate();
// //   const { pathname } = useLocation();
// //   const [collapsed, setCollapsed] = useState(false);

// //   const items = [
// //     { path: "/dashboard", label: "Dashboard", icon: FiGrid },
// //     { path: "/appointment", label: "Appointments", icon: FiCalendar },
// //     { path: "/patient", label: "Patients", icon: FiUsers },
// //     { path: "/socialmedia", label: "Social Media", icon: FiShare2 },
// //     { path: "/followups", label: "Follow-ups", icon: FiRefreshCcw },
// //     { path: "/billing", label: "Billing", icon: FiCreditCard },
// //     { path: "/settings", label: "Settings", icon: FiSettings },
// //   ];

// //   const activePath = (p) => pathname === p;

// //   return (
// //     <aside
// //       className={`h-screen bg-white border-r border-black/10 flex flex-col transition-all duration-300 ${
// //         collapsed ? "w-[78px]" : "w-[260px]"
// //       }`}
// //     >
// //       {/* Top */}
// //       <div className="h-14 flex items-center justify-between px-3 border-b border-black/10 shrink-0">
// //         {!collapsed && <div className="font-extrabold text-[13px] text-black">WYN AI</div>}

// //         <button
// //           onClick={() => setCollapsed((s) => !s)}
// //           className="h-8 w-8 border border-black/20 rounded-md flex items-center justify-center hover:bg-black/5"
// //           title={collapsed ? "Expand" : "Collapse"}
// //         >
// //           {collapsed ? <FiChevronRight /> : <FiX />}
// //         </button>
// //       </div>

// //       {/* SCROLL AREA (menu only) */}
// //       <div className="flex-1 overflow-y-auto px-3 py-3">
// //         <div className="space-y-1.5">
// //           {items.map(({ path, label, icon: Icon }) => {
// //             const isActive = activePath(path);
// //             return (
// //               <button
// //                 key={path}
// //                 onClick={() => navigate(path)}
// //                 className={[
// //                   "w-full flex items-center gap-3 rounded-lg px-3 py-2.5 transition",
// //                   isActive ? "bg-[#EAF7FF]" : "hover:bg-black/5",
// //                 ].join(" ")}
// //               >
// //                 <Icon
// //                   className="text-[18px]"
// //                   style={{ color: isActive ? CYAN : "rgba(0,0,0,0.45)" }}
// //                 />

// //                 {!collapsed && (
// //                   <span
// //                     className={`text-[15px] ${
// //                       isActive ? "text-[#2563eb] font-semibold" : "text-black/75 font-medium"
// //                     }`}
// //                   >
// //                     {label}
// //                   </span>
// //                 )}
// //               </button>
// //             );
// //           })}
// //         </div>
// //       </div>

// //       {/* Bottom profile (NO EXTRA GAP) */}
// //       <div className="px-3 pb-3 border-t border-black/10 shrink-0">
// //         {!collapsed ? (
// //           <div className="mt-3 rounded-xl border border-[#D9E8FF] bg-[#EFF6FF] p-3">
// //             <div className="flex items-center gap-3">
// //               <div className="h-12 w-12 rounded-full bg-[#2563eb] flex items-center justify-center text-white">
// //                 <FiUser className="text-xl" />
// //               </div>
// //               <div className="leading-tight">
// //                 <div className="text-[15px] font-semibold text-black">Dr. Sarah Chen</div>
// //                 <div className="text-[13px] text-[#2563eb]">Cardiologist</div>
// //               </div>
// //             </div>

// //             <button
// //               onClick={() => alert("Logout (demo)")}
// //               className="mt-3 w-full h-11 rounded-lg border border-black/15 bg-white font-semibold text-black flex items-center justify-center gap-2 hover:bg-black/5"
// //             >
// //               <FiLogOut />
// //               Logout
// //             </button>
// //           </div>
// //         ) : (
// //           <div className="mt-3 flex flex-col items-center gap-2">
// //             <div className="h-12 w-12 rounded-full bg-[#2563eb] flex items-center justify-center text-white">
// //               <FiUser className="text-xl" />
// //             </div>

// //             <button
// //               onClick={() => alert("Logout (demo)")}
// //               className="h-10 w-10 rounded-lg border border-black/15 bg-white flex items-center justify-center hover:bg-black/5"
// //               title="Logout"
// //             >
// //               <FiLogOut />
// //             </button>
// //           </div>
// //         )}
// //       </div>

// //       {/* Hide scrollbar (optional, keeps scroll working) */}
// //       <style>{`
// //         aside ::-webkit-scrollbar { width: 8px; }
// //         aside ::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.15); border-radius: 8px; }
// //         aside ::-webkit-scrollbar-track { background: transparent; }
// //       `}</style>
// //     </aside>
// //   );
// // }

// // Sidebar.jsx
// // Requires: npm i react-icons react-router-dom
// // TailwindCSS required
// //
// // Elegant WYN theme (cyan + yellow)
// // ✅ Scrollable menu area
// // ✅ No unwanted gap before user card
// // ✅ X button collapses to icons-only
// // ✅ Real navigation via react-router (useNavigate)
// // ✅ Active route highlight via useLocation

// import React, { useMemo, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import {
//   FiGrid,
//   FiCalendar,
//   FiUsers,
//   FiShare2,
//   FiRefreshCcw,
//   FiCreditCard,
//   FiSettings,
//   FiUser,
//   FiLogOut,
//   FiX,
//   FiChevronRight,
// } from "react-icons/fi";

// const CYAN = "#00B8DB";
// const YELLOW = "#F0B100";

// export default function Sidebar() {
//   const navigate = useNavigate();
//   const { pathname } = useLocation();
//   const [collapsed, setCollapsed] = useState(false);

//   const items = useMemo(
//     () => [
//       { path: "/dashboard", label: "Dashboard", icon: FiGrid },
//       { path: "/appointment", label: "Appointments", icon: FiCalendar },
//       { path: "/patient", label: "Patients", icon: FiUsers },
//       { path: "/socialmedia", label: "Social Media", icon: FiShare2 },
//       { path: "/followups", label: "Follow-ups", icon: FiRefreshCcw },
//       { path: "/billing", label: "Billing", icon: FiCreditCard },
//       { path: "/settings", label: "Settings", icon: FiSettings },
//     ],
//     []
//   );

//   const go = (path) => navigate(path);

//   return (
//     <aside
//       className={[
//         "h-screen bg-white border-r border-black/10 flex flex-col",
//         "transition-all duration-300",
//         collapsed ? "w-[82px]" : "w-[270px]",
//       ].join(" ")}
//     >
//       {/* Top header row with collapse button */}
//       <div className="h-14 px-3 flex items-center justify-end border-b border-black/10">
//         <button
//           type="button"
//           onClick={() => setCollapsed((s) => !s)}
//           className="h-9 w-9 border-2 border-black rounded-md bg-white flex items-center justify-center hover:bg-black/5"
//           title={collapsed ? "Expand" : "Collapse"}
//         >
//           {collapsed ? <FiChevronRight /> : <FiX />}
//         </button>
//       </div>

//       {/* Menu (scrollable) */}
//       <div className="px-3 py-3 overflow-y-auto flex-1">
//         <div className="space-y-2">
//           {items.map(({ path, label, icon: Icon }) => {
//             const active =
//               pathname === path || (path !== "/" && pathname.startsWith(path));

//             return (
//               <button
//                 key={path}
//                 type="button"
//                 onClick={() => go(path)}
//                 className={[
//                   "w-full relative flex items-center gap-3 rounded-md text-sm transition",
//                   "border-2",
//                   collapsed ? "px-2 py-2.5 justify-center" : "px-3 py-2.5",
//                   active
//                     ? "bg-[#EAFBFF] text-black font-extrabold border-black"
//                     : "bg-white text-black/80 border-transparent hover:border-black/10 hover:bg-black/5",
//                 ].join(" ")}
//               >
//                 {/* left active bar */}
//                 {active && !collapsed && (
//                   <span
//                     className="absolute left-0 top-0 bottom-0 w-1 rounded-l-md"
//                     style={{ background: CYAN }}
//                   />
//                 )}

//                 <span
//                   className={[
//                     "h-9 w-9 rounded-md border-2 border-black flex items-center justify-center",
//                     "bg-white",
//                   ].join(" ")}
//                 >
//                   <Icon
//                     className="text-[18px]"
//                     style={{ color: active ? CYAN : "rgba(0,0,0,0.55)" }}
//                   />
//                 </span>

//                 {!collapsed && <span className="truncate">{label}</span>}
//               </button>
//             );
//           })}
//         </div>
//       </div>

//       {/* User section (NO unwanted gap) */}
//       <div className="px-3 pb-3">
//         <div
//           className={[
//             "rounded-lg border-2 border-black/10 bg-white",
//             "p-3 flex items-center gap-3",
//           ].join(" ")}
//         >
//           <div
//             className="h-10 w-10 rounded-full flex items-center justify-center text-white border-2 border-black shrink-0"
//             style={{
//               background: `linear-gradient(90deg, ${CYAN}, ${YELLOW})`,
//             }}
//             title="Profile"
//           >
//             <FiUser />
//           </div>

//           {!collapsed && (
//             <div className="flex-1 leading-tight min-w-0">
//               <div className="text-sm font-extrabold text-black truncate">
//                 Dr. Sarah Chen
//               </div>
//               <div className="text-xs font-semibold" style={{ color: CYAN }}>
//                 Cardiologist
//               </div>
//             </div>
//           )}
//         </div>

//         <button
//           type="button"
//           onClick={() => alert("Logout (demo)")}
//           className={[
//             "mt-3 w-full rounded-md border-2 border-black bg-white",
//             "px-3 py-2 text-sm font-extrabold text-black",
//             "flex items-center justify-center gap-2 hover:bg-black/5",
//           ].join(" ")}
//           title="Logout"
//         >
//           <FiLogOut />
//           {!collapsed && "Logout"}
//         </button>
//       </div>
//     </aside>
//   );
// }
// Sidebar.jsx
// Requires: npm i react-icons react-router-dom
// TailwindCSS required

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FiGrid,
  FiCalendar,
  FiUsers,
  FiShare2,
  FiRefreshCcw,
  FiCreditCard,
  FiSettings,
  FiUser,
  FiLogOut,
  FiX,
  FiChevronRight,
} from "react-icons/fi";

const CYAN = "#00B8DB";
const YELLOW = "#F0B100";

export default function Sidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const items = [
    { path: "/dashboard", label: "Dashboard", icon: FiGrid },
    { path: "/appointment", label: "Appointments", icon: FiCalendar },
    { path: "/patient", label: "Patients", icon: FiUsers },
    { path: "/socialmedia", label: "Social Media", icon: FiShare2 },
    { path: "/followups", label: "Follow-ups", icon: FiRefreshCcw },
    { path: "/billing", label: "Billing", icon: FiCreditCard },
    { path: "/settings", label: "Settings", icon: FiSettings },
  ];

  const isActive = (path) =>
    pathname === path || pathname.startsWith(path + "/");

  return (
    <aside
      className={[
        "h-screen bg-white border-r border-black/10 flex flex-col transition-all duration-300",
        collapsed ? "w-[80px]" : "w-[260px]",
      ].join(" ")}
    >
      {/* 🔝 TOP CONTROL ROW (X / >) */}
      <div className="px-3 py-3 border-b border-black/10 flex justify-end">
        {!collapsed ? (
          <button
            onClick={() => setCollapsed(true)}
            className="h-9 w-9 border-2 border-black rounded-md flex items-center justify-center hover:bg-black/5"
            title="Collapse sidebar"
          >
            <FiX />
          </button>
        ) : (
          <button
            onClick={() => setCollapsed(false)}
            className="h-9 w-9 border-2 border-black rounded-md flex items-center justify-center hover:bg-black/5"
            title="Expand sidebar"
          >
            <FiChevronRight />
          </button>
        )}
      </div>

      {/* 📜 MENU (SCROLLABLE) */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2">
        {items.map(({ path, label, icon: Icon }) => {
          const active = isActive(path);

          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={[
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm border-2 transition",
                collapsed ? "justify-center" : "",
                active
                  ? "bg-[#EAFBFF] border-black font-extrabold text-black"
                  : "bg-white border-transparent text-black/80 hover:bg-black/5 hover:border-black/10",
              ].join(" ")}
            >
              <span className="h-9 w-9 rounded-md border-2 border-black bg-white flex items-center justify-center shrink-0">
                <Icon
                  className="text-[18px]"
                  style={{ color: active ? CYAN : "rgba(0,0,0,0.55)" }}
                />
              </span>

              {!collapsed && <span className="truncate">{label}</span>}
            </button>
          );
        })}
      </div>

      {/* 👤 USER + LOGOUT (NO EXTRA GAP) */}
      <div className="px-3 pb-3 space-y-2">
        <div className="rounded-lg border-2 border-black/10 bg-white p-3 flex items-center gap-3">
          <div
            className="h-10 w-10 rounded-full border-2 border-black flex items-center justify-center text-white shrink-0"
            style={{
              background: `linear-gradient(90deg, ${CYAN}, ${YELLOW})`,
            }}
          >
            <FiUser />
          </div>

          {!collapsed && (
            <div className="leading-tight">
              <div className="text-sm font-extrabold text-black">
                Dr. Sarah Chen
              </div>
              <div className="text-xs font-semibold text-[#00B8DB]">
                Cardiologist
              </div>
            </div>
          )}
        </div>

        <button
          onClick={() => alert("Logout (demo)")}
          className="w-full rounded-md border-2 border-black bg-white px-3 py-2 text-sm font-extrabold text-black flex items-center justify-center gap-2 hover:bg-black/5"
        >
          <FiLogOut />
          {!collapsed && "Logout"}
        </button>
      </div>
    </aside>
  );
}
