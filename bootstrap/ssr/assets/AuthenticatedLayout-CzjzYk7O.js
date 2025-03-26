import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Link } from "@inertiajs/react";
function Header({ user, darkMode, setDarkMode }) {
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  return /* @__PURE__ */ jsx("nav", { className: "bg-white border-b border-gray-200", children: /* @__PURE__ */ jsx("div", { className: "container-xl mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between h-14", children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsx("div", { className: "flex items-center flex-shrink-0", children: /* @__PURE__ */ jsx(Link, { href: "/dashboard", className: "flex items-center", children: /* @__PURE__ */ jsx("img", { src: "/static/logo.svg", width: "32", height: "32", alt: "IMS-Thai", className: "w-8 h-8" }) }) }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setDarkMode(!darkMode),
          className: "p-1.5 text-gray-500 rounded-full hover:text-gray-700 hover:bg-gray-100",
          children: darkMode ? /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" }) }) : /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" }) })
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "relative block sm:hidden", children: /* @__PURE__ */ jsx("div", { className: "flex items-center p-1 text-sm bg-gray-100 rounded-full", children: /* @__PURE__ */ jsx("button", { className: "p-1 text-gray-500 rounded-full hover:text-gray-700 hover:bg-gray-200", children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }) }) }) }) }),
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setUserDropdownOpen(!userDropdownOpen),
            className: "flex items-center p-1.5 text-sm bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none",
            children: [
              /* @__PURE__ */ jsx("div", { className: "w-4 h-4 overflow-hidden rounded-full bg-yellow-100", children: /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center w-full h-full text-xl font-bold text-yellow-800", children: user.name.charAt(0).toUpperCase() }) }),
              /* @__PURE__ */ jsx("span", { className: "mx-2 font-medium text-gray-700", children: user.name })
            ]
          }
        ),
        userDropdownOpen && /* @__PURE__ */ jsxs("div", { className: "absolute right-0 z-10 w-48 py-1 mt-1 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5", children: [
          /* @__PURE__ */ jsx(
            Link,
            {
              href: route("profile.edit"),
              className: "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100",
              children: "โปรไฟล์"
            }
          ),
          /* @__PURE__ */ jsx(
            Link,
            {
              href: route("logout"),
              method: "post",
              as: "button",
              type: "button",
              className: "block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100",
              children: "ออกจากระบบ"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          className: "p-2 ml-2 text-gray-500 rounded-md lg:hidden hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500",
          onClick: () => {
            var _a;
            return (_a = document.getElementById("mobile-menu")) == null ? void 0 : _a.classList.toggle("hidden");
          },
          children: [
            /* @__PURE__ */ jsx("span", { className: "sr-only", children: "เปิดเมนู" }),
            /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M4 6h16M4 12h16M4 18h16" }) })
          ]
        }
      )
    ] })
  ] }) }) });
}
function Navbar() {
  const [ordersDropdownOpen, setOrdersDropdownOpen] = useState(false);
  const [purchasesDropdownOpen, setPurchasesDropdownOpen] = useState(false);
  const [settingsDropdownOpen, setSettingsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const closeOtherDropdowns = (current) => {
    if (current !== "orders") setOrdersDropdownOpen(false);
    if (current !== "purchases") setPurchasesDropdownOpen(false);
    if (current !== "settings") setSettingsDropdownOpen(false);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "hidden sm:block", children: /* @__PURE__ */ jsx("div", { className: "bg-white border-b border-gray-200", children: /* @__PURE__ */ jsx("div", { className: "container-xl mx-auto", children: /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
      /* @__PURE__ */ jsx(
        Link,
        {
          href: route("dashboard"),
          className: `inline-flex items-center h-14 px-4 text-sm font-medium border-b-2 ${route().current("dashboard") ? "text-blue-600 border-blue-500" : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"}`,
          children: "แดชบอร์ด"
        }
      ),
      /* @__PURE__ */ jsx(
        Link,
        {
          href: route("products.index"),
          className: `inline-flex items-center h-14 px-4 text-sm font-medium border-b-2 ${route().current("products.*") ? "text-blue-600 border-blue-500" : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"}`,
          children: "สินค้า"
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => {
              setOrdersDropdownOpen(!ordersDropdownOpen);
              closeOtherDropdowns("orders");
            },
            className: `inline-flex items-center h-14 px-4 text-sm font-medium border-b-2 ${route().current("orders.*") ? "text-blue-600 border-blue-500" : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"}`,
            children: [
              "คำสั่งซื้อ",
              /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 ml-1", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1", d: "M19 9l-7 7-7-7" }) })
            ]
          }
        ),
        ordersDropdownOpen && /* @__PURE__ */ jsxs("div", { className: "absolute left-0 z-10 w-48 py-1 mt-0 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5", children: [
          /* @__PURE__ */ jsx(Link, { href: route("orders.index"), className: "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100", children: "ทั้งหมด" }),
          /* @__PURE__ */ jsx(Link, { href: route("orders.complete"), className: "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100", children: "เสร็จสิ้น" }),
          /* @__PURE__ */ jsx(Link, { href: route("orders.pending"), className: "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100", children: "รอดำเนินการ" }),
          /* @__PURE__ */ jsx(Link, { href: route("due.index"), className: "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100", children: "ค้างชำระ" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => {
              setPurchasesDropdownOpen(!purchasesDropdownOpen);
              closeOtherDropdowns("purchases");
            },
            className: `inline-flex items-center h-14 px-4 text-sm font-medium border-b-2 ${route().current("purchases.*") ? "text-blue-600 border-blue-500" : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"}`,
            children: [
              "การซื้อ",
              /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 ml-1", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1", d: "M19 9l-7 7-7-7" }) })
            ]
          }
        ),
        purchasesDropdownOpen && /* @__PURE__ */ jsxs("div", { className: "absolute left-0 z-10 w-48 py-1 mt-0 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5", children: [
          /* @__PURE__ */ jsx(Link, { href: route("purchases.index"), className: "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100", children: "ทั้งหมด" }),
          /* @__PURE__ */ jsx(Link, { href: route("purchases.approvedPurchases"), className: "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100", children: "อนุมัติ" }),
          /* @__PURE__ */ jsx(Link, { href: route("purchases.dailyPurchaseReport"), className: "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100", children: "รายงานการซื้อประจำวัน" })
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        Link,
        {
          href: route("quotations.index"),
          className: `inline-flex items-center h-14 px-4 text-sm font-medium border-b-2 ${route().current("quotations.*") ? "text-blue-600 border-blue-500" : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"}`,
          children: "ใบเสนอราคา"
        }
      )
    ] }) }) }) }) }),
    /* @__PURE__ */ jsx("div", { id: "mobile-menu", className: "hidden sm:hidden bg-white shadow-lg rounded-b-lg mt-1", children: /* @__PURE__ */ jsxs("div", { className: "px-2 pt-2 pb-3 space-y-1", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-4 gap-2 p-2 mb-3 bg-gray-50 rounded-lg", children: [
        /* @__PURE__ */ jsxs(Link, { href: route("dashboard"), className: "flex flex-col items-center p-2 text-gray-600 rounded-lg hover:bg-gray-100", children: [
          /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "w-6 h-6 mb-1", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" }) }),
          /* @__PURE__ */ jsx("span", { className: "text-xs", children: "หน้าหลัก" })
        ] }),
        /* @__PURE__ */ jsxs(Link, { href: route("products.index"), className: "flex flex-col items-center p-2 text-gray-600 rounded-lg hover:bg-gray-100", children: [
          /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "w-6 h-6 mb-1", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" }) }),
          /* @__PURE__ */ jsx("span", { className: "text-xs", children: "สินค้า" })
        ] }),
        /* @__PURE__ */ jsxs(Link, { href: route("orders.index"), className: "flex flex-col items-center p-2 text-gray-600 rounded-lg hover:bg-gray-100", children: [
          /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "w-6 h-6 mb-1", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" }) }),
          /* @__PURE__ */ jsx("span", { className: "text-xs", children: "คำสั่งซื้อ" })
        ] }),
        /* @__PURE__ */ jsxs(Link, { href: route("purchases.index"), className: "flex flex-col items-center p-2 text-gray-600 rounded-lg hover:bg-gray-100", children: [
          /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "w-6 h-6 mb-1", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" }) }),
          /* @__PURE__ */ jsx("span", { className: "text-xs", children: "การซื้อ" })
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        Link,
        {
          href: route("dashboard"),
          className: `block px-3 py-2 text-base font-medium rounded-md ${route().current("dashboard") ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"}`,
          children: "แดชบอร์ด"
        }
      ),
      /* @__PURE__ */ jsx(
        Link,
        {
          href: route("products.index"),
          className: `block px-3 py-2 text-base font-medium rounded-md ${route().current("products.*") ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"}`,
          children: "สินค้า"
        }
      ),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => {
              setOrdersDropdownOpen(!ordersDropdownOpen);
              closeOtherDropdowns("orders");
            },
            className: `flex justify-between w-full px-3 py-2 text-base font-medium rounded-md ${route().current("orders.*") ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"}`,
            children: [
              /* @__PURE__ */ jsx("span", { children: "คำสั่งซื้อ" }),
              /* @__PURE__ */ jsx(
                "svg",
                {
                  className: `w-5 h-5 transition-transform ${ordersDropdownOpen ? "transform rotate-180" : ""}`,
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor",
                  children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1", d: "M19 9l-7 7-7-7" })
                }
              )
            ]
          }
        ),
        ordersDropdownOpen && /* @__PURE__ */ jsxs("div", { className: "px-3 py-2 mt-1 space-y-1 bg-gray-50 rounded-md", children: [
          /* @__PURE__ */ jsx(
            Link,
            {
              href: route("orders.index"),
              className: "block px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100",
              children: "ทั้งหมด"
            }
          ),
          /* @__PURE__ */ jsx(
            Link,
            {
              href: route("orders.complete"),
              className: "block px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100",
              children: "เสร็จสิ้น"
            }
          ),
          /* @__PURE__ */ jsx(
            Link,
            {
              href: route("orders.pending"),
              className: "block px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100",
              children: "รอดำเนินการ"
            }
          ),
          /* @__PURE__ */ jsx(
            Link,
            {
              href: route("due.index"),
              className: "block px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100",
              children: "ค้างชำระ"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => {
              setPurchasesDropdownOpen(!purchasesDropdownOpen);
              closeOtherDropdowns("purchases");
            },
            className: `flex justify-between w-full px-3 py-2 text-base font-medium rounded-md ${route().current("purchases.*") ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"}`,
            children: [
              /* @__PURE__ */ jsx("span", { children: "การซื้อ" }),
              /* @__PURE__ */ jsx(
                "svg",
                {
                  className: `w-5 h-5 transition-transform ${purchasesDropdownOpen ? "transform rotate-180" : ""}`,
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor",
                  children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1", d: "M19 9l-7 7-7-7" })
                }
              )
            ]
          }
        ),
        purchasesDropdownOpen && /* @__PURE__ */ jsxs("div", { className: "px-3 py-2 mt-1 space-y-1 bg-gray-50 rounded-md", children: [
          /* @__PURE__ */ jsx(
            Link,
            {
              href: route("purchases.index"),
              className: "block px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100",
              children: "ทั้งหมด"
            }
          ),
          /* @__PURE__ */ jsx(
            Link,
            {
              href: route("purchases.approvedPurchases"),
              className: "block px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100",
              children: "อนุมัติ"
            }
          ),
          /* @__PURE__ */ jsx(
            Link,
            {
              href: route("purchases.dailyPurchaseReport"),
              className: "block px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100",
              children: "รายงานการซื้อประจำวัน"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        Link,
        {
          href: route("quotations.index"),
          className: `block px-3 py-2 text-base font-medium rounded-md ${route().current("quotations.*") ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"}`,
          children: "ใบเสนอราคา"
        }
      )
    ] }) })
  ] });
}
function Footer() {
  return /* @__PURE__ */ jsx("footer", { className: "py-4 mt-auto bg-white border-t border-gray-200", children: /* @__PURE__ */ jsx("div", { className: "px-4 mx-auto container-xl", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row items-center justify-between", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-500 mb-2 md:mb-0", children: [
      "Copyright © ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      /* @__PURE__ */ jsx("a", { href: "#", className: "ml-1 text-blue-600 hover:text-blue-500", children: "ITGenius" }),
      ". All rights reserved."
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-500", children: [
      "Made with",
      /* @__PURE__ */ jsx("svg", { className: "inline-block w-4 h-4 ml-1 text-red-500", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z", clipRule: "evenodd" }) })
    ] })
  ] }) }) });
}
function Authenticated({
  user,
  header,
  children
}) {
  const [darkMode, setDarkMode] = useState(false);
  return /* @__PURE__ */ jsxs("div", { className: `min-h-screen bg-gray-50 ${darkMode ? "dark" : ""}`, children: [
    /* @__PURE__ */ jsx(Header, { user, darkMode, setDarkMode }),
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx("main", { className: "py-6", children: /* @__PURE__ */ jsxs("div", { className: "px-4 mx-auto max-w-full", children: [
      header && /* @__PURE__ */ jsx("div", { className: "mb-6", children: header }),
      children
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
export {
  Authenticated as A
};
