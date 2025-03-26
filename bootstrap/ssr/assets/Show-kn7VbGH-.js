import { jsxs, jsx } from "react/jsx-runtime";
import { Head, Link } from "@inertiajs/react";
import { A as Authenticated } from "./AuthenticatedLayout-CzjzYk7O.js";
import { B as Breadcrumbs } from "./Breadcrumbs-Cz6SsN78.js";
import "react";
function Show({ auth, customer }) {
  var _a, _b, _c, _d;
  const breadcrumbsItems = [
    { title: "หน้าหลัก", url: route("dashboard") },
    { title: "ลูกค้า", url: route("customers.index") },
    { title: customer.name, url: void 0 }
  ];
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("div", { className: "page-header d-print-none", children: /* @__PURE__ */ jsxs("div", { className: "container-xl", children: [
        /* @__PURE__ */ jsx("div", { className: "page-pretitle", children: "รายละเอียด" }),
        /* @__PURE__ */ jsx("h2", { className: "page-title", children: customer.name })
      ] }) }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: `รายละเอียดลูกค้า - ${customer.name}` }),
        /* @__PURE__ */ jsx("div", { className: "page-body", children: /* @__PURE__ */ jsxs("div", { className: "container-xl", children: [
          /* @__PURE__ */ jsx(Breadcrumbs, { items: breadcrumbsItems }),
          /* @__PURE__ */ jsxs("div", { className: "row row-cards", children: [
            /* @__PURE__ */ jsx("div", { className: "col-lg-4", children: /* @__PURE__ */ jsx("div", { className: "card", children: /* @__PURE__ */ jsxs("div", { className: "card-body", children: [
              /* @__PURE__ */ jsx("h3", { className: "card-title", children: "รูปลูกค้า" }),
              /* @__PURE__ */ jsx("div", { className: "text-center", children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: customer.photo ? `/storage/customers/${customer.photo}` : "/assets/img/demo/user-placeholder.svg",
                  alt: customer.name,
                  className: "img-account-profile rounded-2",
                  style: { maxWidth: "100%", height: "auto" }
                }
              ) })
            ] }) }) }),
            /* @__PURE__ */ jsx("div", { className: "col-lg-8", children: /* @__PURE__ */ jsxs("div", { className: "card", children: [
              /* @__PURE__ */ jsxs("div", { className: "card-header", children: [
                /* @__PURE__ */ jsx("h3", { className: "card-title", children: "ข้อมูลลูกค้า" }),
                /* @__PURE__ */ jsx("div", { className: "card-actions", children: /* @__PURE__ */ jsx(Link, { href: route("customers.edit", customer.id), className: "btn btn-primary", children: "แก้ไขข้อมูล" }) })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "table-responsive", children: /* @__PURE__ */ jsx("table", { className: "table table-bordered card-table table-vcenter text-nowrap datatable", children: /* @__PURE__ */ jsxs("tbody", { children: [
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { className: "w-25", children: "ชื่อ" }),
                  /* @__PURE__ */ jsx("td", { children: customer.name })
                ] }),
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { children: "อีเมล" }),
                  /* @__PURE__ */ jsx("td", { children: customer.email })
                ] }),
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { children: "เบอร์โทรศัพท์" }),
                  /* @__PURE__ */ jsx("td", { children: customer.phone })
                ] }),
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { children: "ที่อยู่" }),
                  /* @__PURE__ */ jsx("td", { children: customer.address })
                ] }),
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { children: "ชื่อเจ้าของบัญชี" }),
                  /* @__PURE__ */ jsx("td", { children: customer.account_holder || "-" })
                ] }),
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { children: "เลขที่บัญชี" }),
                  /* @__PURE__ */ jsx("td", { children: customer.account_number || "-" })
                ] }),
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { children: "ธนาคาร" }),
                  /* @__PURE__ */ jsx("td", { children: customer.bank_name || "-" })
                ] }),
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { children: "วันที่สร้าง" }),
                  /* @__PURE__ */ jsx("td", { children: new Date(customer.created_at).toLocaleDateString("th-TH") })
                ] }),
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { children: "วันที่อัปเดตล่าสุด" }),
                  /* @__PURE__ */ jsx("td", { children: new Date(customer.updated_at).toLocaleDateString("th-TH") })
                ] })
              ] }) }) }),
              /* @__PURE__ */ jsx("div", { className: "card-footer text-end", children: /* @__PURE__ */ jsx(Link, { href: route("customers.index"), className: "btn btn-link", children: "กลับไปยังรายการลูกค้า" }) })
            ] }) })
          ] }),
          (((_a = customer.quotations) == null ? void 0 : _a.length) > 0 || ((_b = customer.orders) == null ? void 0 : _b.length) > 0) && /* @__PURE__ */ jsxs("div", { className: "row mt-3", children: [
            ((_c = customer.quotations) == null ? void 0 : _c.length) > 0 && /* @__PURE__ */ jsx("div", { className: "col-lg-6", children: /* @__PURE__ */ jsxs("div", { className: "card", children: [
              /* @__PURE__ */ jsx("div", { className: "card-header", children: /* @__PURE__ */ jsx("h3", { className: "card-title", children: "ประวัติการเสนอราคา" }) }),
              /* @__PURE__ */ jsx("div", { className: "table-responsive", children: /* @__PURE__ */ jsxs("table", { className: "table table-vcenter card-table", children: [
                /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("th", { children: "รหัส" }),
                  /* @__PURE__ */ jsx("th", { children: "วันที่" }),
                  /* @__PURE__ */ jsx("th", { children: "ยอดรวม" }),
                  /* @__PURE__ */ jsx("th", { className: "w-1" })
                ] }) }),
                /* @__PURE__ */ jsx("tbody", { children: customer.quotations.map((quotation) => /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { children: quotation.quotation_number }),
                  /* @__PURE__ */ jsx("td", { children: new Date(quotation.date).toLocaleDateString("th-TH") }),
                  /* @__PURE__ */ jsxs("td", { children: [
                    "฿",
                    quotation.total.toLocaleString("th-TH")
                  ] }),
                  /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(Link, { href: route("quotations.show", quotation.id), className: "btn btn-sm", children: "ดู" }) })
                ] }, quotation.id)) })
              ] }) })
            ] }) }),
            ((_d = customer.orders) == null ? void 0 : _d.length) > 0 && /* @__PURE__ */ jsx("div", { className: "col-lg-6", children: /* @__PURE__ */ jsxs("div", { className: "card", children: [
              /* @__PURE__ */ jsx("div", { className: "card-header", children: /* @__PURE__ */ jsx("h3", { className: "card-title", children: "ประวัติการสั่งซื้อ" }) }),
              /* @__PURE__ */ jsx("div", { className: "table-responsive", children: /* @__PURE__ */ jsxs("table", { className: "table table-vcenter card-table", children: [
                /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("th", { children: "รหัส" }),
                  /* @__PURE__ */ jsx("th", { children: "วันที่" }),
                  /* @__PURE__ */ jsx("th", { children: "ยอดรวม" }),
                  /* @__PURE__ */ jsx("th", { className: "w-1" })
                ] }) }),
                /* @__PURE__ */ jsx("tbody", { children: customer.orders.map((order) => /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { children: order.order_number }),
                  /* @__PURE__ */ jsx("td", { children: new Date(order.date).toLocaleDateString("th-TH") }),
                  /* @__PURE__ */ jsxs("td", { children: [
                    "฿",
                    order.total.toLocaleString("th-TH")
                  ] }),
                  /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(Link, { href: route("orders.show", order.id), className: "btn btn-sm", children: "ดู" }) })
                ] }, order.id)) })
              ] }) })
            ] }) })
          ] })
        ] }) })
      ]
    }
  );
}
export {
  Show as default
};
