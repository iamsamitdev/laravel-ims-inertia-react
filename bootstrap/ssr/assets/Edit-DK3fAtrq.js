import { jsxs, jsx } from "react/jsx-runtime";
import { useForm, Head, Link } from "@inertiajs/react";
import { A as Authenticated } from "./AuthenticatedLayout-CzjzYk7O.js";
import { B as Breadcrumbs } from "./Breadcrumbs-Cz6SsN78.js";
import "react";
function Edit({ auth, order }) {
  const { data, setData, post, errors, processing } = useForm({
    _method: "PUT",
    pay: 0
  });
  const maxAmount = order.due / 100;
  const breadcrumbsItems = [
    { title: "หน้าหลัก", url: route("dashboard") },
    { title: "รายการค้างชำระ", url: route("due.index") },
    { title: order.invoice_no, url: route("due.show", order.id) },
    { title: "ชำระเงิน", url: void 0 }
  ];
  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("due.update", order.id));
  };
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("div", { className: "page-header d-print-none", children: /* @__PURE__ */ jsx("div", { className: "container-xl", children: /* @__PURE__ */ jsx("h2", { className: "page-title", children: "ชำระเงินค้างชำระ" }) }) }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: `ชำระเงินค้างชำระ: ${order.invoice_no}` }),
        /* @__PURE__ */ jsx("div", { className: "page-body", children: /* @__PURE__ */ jsxs("div", { className: "container-xl", children: [
          /* @__PURE__ */ jsx(Breadcrumbs, { items: breadcrumbsItems }),
          /* @__PURE__ */ jsxs("div", { className: "row row-cards", children: [
            /* @__PURE__ */ jsx("div", { className: "col-lg-4", children: /* @__PURE__ */ jsxs("div", { className: "card", children: [
              /* @__PURE__ */ jsx("div", { className: "card-header", children: /* @__PURE__ */ jsx("h3", { className: "card-title", children: "ข้อมูลการสั่งซื้อ" }) }),
              /* @__PURE__ */ jsxs("div", { className: "card-body", children: [
                /* @__PURE__ */ jsxs("div", { className: "mb-2", children: [
                  /* @__PURE__ */ jsx("strong", { className: "me-1", children: "เลขที่ใบแจ้งหนี้:" }),
                  order.invoice_no
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mb-2", children: [
                  /* @__PURE__ */ jsx("strong", { className: "me-1", children: "วันที่สั่งซื้อ:" }),
                  new Date(order.order_date).toLocaleDateString("th-TH")
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mb-2", children: [
                  /* @__PURE__ */ jsx("strong", { className: "me-1", children: "ลูกค้า:" }),
                  /* @__PURE__ */ jsx(Link, { href: route("customers.show", order.customer_id), children: order.customer.name })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mb-2", children: [
                  /* @__PURE__ */ jsx("strong", { className: "me-1", children: "ยอดรวมทั้งสิ้น:" }),
                  "฿",
                  (order.total / 100).toLocaleString("th-TH", { minimumFractionDigits: 2 })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mb-2", children: [
                  /* @__PURE__ */ jsx("strong", { className: "me-1", children: "ชำระแล้ว:" }),
                  "฿",
                  (order.pay / 100).toLocaleString("th-TH", { minimumFractionDigits: 2 })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mb-2", children: [
                  /* @__PURE__ */ jsx("strong", { className: "me-1", children: "ยอดค้างชำระ:" }),
                  /* @__PURE__ */ jsxs("span", { className: "text-danger", children: [
                    "฿",
                    (order.due / 100).toLocaleString("th-TH", { minimumFractionDigits: 2 })
                  ] })
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "col-lg-8", children: /* @__PURE__ */ jsx("form", { onSubmit: handleSubmit, children: /* @__PURE__ */ jsxs("div", { className: "card", children: [
              /* @__PURE__ */ jsx("div", { className: "card-header", children: /* @__PURE__ */ jsx("h3", { className: "card-title", children: "ชำระเงิน" }) }),
              /* @__PURE__ */ jsxs("div", { className: "card-body", children: [
                /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                  /* @__PURE__ */ jsx("label", { className: "form-label required", htmlFor: "pay", children: "จำนวนเงินที่ต้องการชำระ" }),
                  /* @__PURE__ */ jsxs("div", { className: "input-group", children: [
                    /* @__PURE__ */ jsx("span", { className: "input-group-text", children: "฿" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        id: "pay",
                        type: "number",
                        className: `form-control ${errors.pay ? "is-invalid" : ""}`,
                        value: data.pay,
                        onChange: (e) => setData("pay", parseFloat(e.target.value)),
                        required: true,
                        min: "0.01",
                        max: maxAmount,
                        step: "0.01",
                        placeholder: `ยอดค้างชำระทั้งหมด ${maxAmount.toLocaleString("th-TH", { minimumFractionDigits: 2 })} บาท`
                      }
                    ),
                    errors.pay && /* @__PURE__ */ jsx("div", { className: "invalid-feedback", children: errors.pay })
                  ] }),
                  /* @__PURE__ */ jsxs("small", { className: "form-hint", children: [
                    "ระบุจำนวนเงินที่ต้องการชำระ (สูงสุด ",
                    maxAmount.toLocaleString("th-TH", { minimumFractionDigits: 2 }),
                    " บาท)"
                  ] })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "form-footer", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
                  /* @__PURE__ */ jsx("div", { className: "col", children: /* @__PURE__ */ jsx(Link, { href: route("due.show", order.id), className: "btn btn-outline-secondary w-100", children: "ยกเลิก" }) }),
                  /* @__PURE__ */ jsx("div", { className: "col", children: /* @__PURE__ */ jsx("button", { type: "submit", className: "btn btn-primary w-100", disabled: processing || data.pay <= 0 || data.pay > maxAmount, children: processing ? "กำลังบันทึก..." : "บันทึกการชำระเงิน" }) })
                ] }) })
              ] })
            ] }) }) })
          ] })
        ] }) })
      ]
    }
  );
}
export {
  Edit as default
};
