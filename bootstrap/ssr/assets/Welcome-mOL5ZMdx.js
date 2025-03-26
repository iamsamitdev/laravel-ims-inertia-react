import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Head, Link } from "@inertiajs/react";
function Welcome({ auth, canLogin, canRegister }) {
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const savedDarkMode = localStorage.getItem("darkMode");
    const isDarkMode = savedDarkMode !== null ? savedDarkMode === "true" : prefersDarkMode;
    setDarkMode(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", String(newDarkMode));
    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "ยินดีต้อนรับ" }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-black text-gray-800 dark:text-gray-200 min-h-screen", children: [
      /* @__PURE__ */ jsx("nav", { className: "fixed top-0 left-0 right-0 p-4 w-full z-10 bg-white/80 dark:bg-black/80 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between max-w-6xl mx-auto", children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsx(Link, { href: "/", className: "flex items-center gap-2", children: /* @__PURE__ */ jsx("img", { src: "/static/logo.svg", width: "110", height: "32", alt: "IMS-Thai", className: "h-8" }) }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: toggleDarkMode,
              className: "w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800",
              "aria-label": darkMode ? "เปลี่ยนเป็นโหมดสว่าง" : "เปลี่ยนเป็นโหมดมืด",
              children: darkMode ? /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-gray-300", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" }) }) : /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-gray-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" }) })
            }
          ),
          canLogin && /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: auth.user ? /* @__PURE__ */ jsx(
            Link,
            {
              href: route("dashboard"),
              className: "px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors",
              children: "แดชบอร์ด"
            }
          ) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(
              Link,
              {
                href: route("login"),
                className: "px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors",
                children: "เข้าสู่ระบบ"
              }
            ),
            canRegister && /* @__PURE__ */ jsx(
              Link,
              {
                href: route("register"),
                className: "px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-700 rounded-md transition-colors",
                children: "ลงทะเบียน"
              }
            )
          ] }) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 py-16 max-w-5xl", children: /* @__PURE__ */ jsxs("div", { className: "mt-16 flex flex-col items-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "mt-8 grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-4xl mx-auto", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow", children: [
            /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full flex items-center justify-center text-red-500", children: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ jsx("path", { d: "M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" }),
              /* @__PURE__ */ jsx("line", { x1: "16", y1: "8", x2: "2", y2: "22" }),
              /* @__PURE__ */ jsx("line", { x1: "17.5", y1: "15", x2: "9", y2: "15" })
            ] }) }),
            /* @__PURE__ */ jsx("h3", { className: "mt-4 text-lg font-medium text-gray-900 dark:text-white", children: "Laravel" }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-gray-500 dark:text-gray-400 max-w-xs", children: "เฟรมเวิร์ค PHP ที่มีเครื่องมือครบครันสำหรับการพัฒนาเว็บแอปพลิเคชัน" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow", children: [
            /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full flex items-center justify-center text-purple-500", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx("polygon", { points: "13 2 3 14 12 14 11 22 21 10 12 10 13 2" }) }) }),
            /* @__PURE__ */ jsx("h3", { className: "mt-4 text-lg font-medium text-gray-900 dark:text-white", children: "Inertia.js" }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-gray-500 dark:text-gray-400 max-w-xs", children: "เชื่อมต่อแอปพลิเคชัน Laravel กับ React โดยไม่ต้องสร้าง API" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow", children: [
            /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full flex items-center justify-center text-blue-500", children: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "10" }),
              /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "4" }),
              /* @__PURE__ */ jsx("line", { x1: "4.93", y1: "4.93", x2: "9.17", y2: "9.17" }),
              /* @__PURE__ */ jsx("line", { x1: "14.83", y1: "14.83", x2: "19.07", y2: "19.07" }),
              /* @__PURE__ */ jsx("line", { x1: "14.83", y1: "9.17", x2: "19.07", y2: "4.93" })
            ] }) }),
            /* @__PURE__ */ jsx("h3", { className: "mt-4 text-lg font-medium text-gray-900 dark:text-white", children: "React" }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-gray-500 dark:text-gray-400 max-w-xs", children: "ไลบรารี JavaScript สำหรับสร้าง UI แบบโมเดิร์น รวดเร็ว และตอบสนองผู้ใช้" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-20 w-full max-w-4xl mx-auto", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-center text-gray-900 dark:text-white mb-8", children: "คุณสมบัติหลัก" }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow", children: /* @__PURE__ */ jsxs("div", { className: "flex", children: [
              /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 bg-blue-100 dark:bg-blue-900/30 rounded-lg p-3", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8 text-blue-600 dark:text-blue-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" }) }) }),
              /* @__PURE__ */ jsxs("div", { className: "ml-4", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900 dark:text-white", children: "จัดการสินค้า" }),
                /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-500 dark:text-gray-400", children: "บริหารสินค้าคงคลังแบบเรียลไทม์ ติดตามสต็อกได้อย่างแม่นยำ" })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow", children: /* @__PURE__ */ jsxs("div", { className: "flex", children: [
              /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 bg-green-100 dark:bg-green-900/30 rounded-lg p-3", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8 text-green-600 dark:text-green-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" }) }) }),
              /* @__PURE__ */ jsxs("div", { className: "ml-4", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900 dark:text-white", children: "รายงานสรุป" }),
                /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-500 dark:text-gray-400", children: "ดูรายงานและข้อมูลสถิติที่สำคัญเพื่อการวิเคราะห์และตัดสินใจ" })
              ] })
            ] }) })
          ] })
        ] }),
        auth.user ? /* @__PURE__ */ jsx(
          Link,
          {
            href: route("dashboard"),
            className: "mt-12 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-md transition-colors",
            children: "ไปที่แดชบอร์ด"
          }
        ) : /* @__PURE__ */ jsx("div", { className: "mt-12 flex justify-center", children: /* @__PURE__ */ jsx(
          Link,
          {
            href: "#features",
            className: "px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-md transition-colors",
            children: "ดูรายละเอียดเพิ่มเติม"
          }
        ) })
      ] }) }),
      /* @__PURE__ */ jsx("footer", { className: "mt-20 mb-0 py-6 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 max-w-5xl", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center text-center", children: [
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600 dark:text-gray-400", children: [
          "พัฒนาด้วย ",
          /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "♥" }),
          " โดย ITGenius"
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "mt-2 text-sm text-gray-500 dark:text-gray-500", children: [
          "© ",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " IMS-Thai. สงวนลิขสิทธิ์"
        ] })
      ] }) }) })
    ] })
  ] });
}
export {
  Welcome as default
};
