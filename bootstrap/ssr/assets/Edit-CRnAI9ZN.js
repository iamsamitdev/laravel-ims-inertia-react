import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useForm, Head, Link, router } from "@inertiajs/react";
import { A as Authenticated } from "./AuthenticatedLayout-CzjzYk7O.js";
import { B as Breadcrumbs } from "./Breadcrumbs-Cz6SsN78.js";
function Edit({ auth, order, customers }) {
  const breadcrumbsItems = [
    { title: "หน้าหลัก", url: route("dashboard") },
    { title: "รายการสั่งซื้อ", url: route("orders.index") },
    { title: "แก้ไขคำสั่งซื้อ", url: void 0 }
  ];
  const [orderDetails, setOrderDetails] = useState(order.details);
  const [subTotal, setSubTotal] = useState(order.sub_total);
  const [vat, setVat] = useState(order.vat);
  const [total, setTotal] = useState(order.total);
  const { data, setData, put, processing, errors } = useForm({
    customer_id: order.customer_id.toString(),
    order_date: order.order_date,
    payment_type: order.payment_type,
    pay: order.pay,
    order_details: JSON.stringify(orderDetails),
    sub_total: order.sub_total,
    vat: order.vat,
    total: order.total,
    note: order.note || ""
  });
  useEffect(() => {
    const subTotalValue = orderDetails.reduce((sum, item) => sum + item.total, 0);
    const vatValue = Math.round(subTotalValue * 0.07);
    const totalValue = subTotalValue + vatValue;
    setSubTotal(subTotalValue);
    setVat(vatValue);
    setTotal(totalValue);
  }, [orderDetails]);
  const handleRemoveProduct = (index) => {
    const updatedItems = [...orderDetails];
    updatedItems.splice(index, 1);
    setOrderDetails(updatedItems);
  };
  const formatPrice = (price) => {
    return (price / 100).toLocaleString("th-TH", { minimumFractionDigits: 2 });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (orderDetails.length === 0) {
      alert("กรุณามีสินค้าอย่างน้อย 1 รายการ");
      return;
    }
    const finalPay = typeof data.pay === "string" ? parseInt(data.pay) : data.pay;
    if (isNaN(finalPay) || finalPay < 0) {
      alert("กรุณาระบุจำนวนเงินที่ชำระให้ถูกต้อง");
      return;
    }
    if (finalPay > total) {
      alert("จำนวนเงินที่ชำระไม่สามารถมากกว่ายอดรวมได้");
      return;
    }
    setData({
      ...data,
      order_details: JSON.stringify(orderDetails),
      sub_total: subTotal,
      vat,
      total
    });
    put(route("orders.update", order.id), {
      onSuccess: () => {
        router.visit(route("orders.show", order.id));
      }
    });
  };
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("div", { className: "page-header d-print-none", children: /* @__PURE__ */ jsx("div", { className: "container-xl", children: /* @__PURE__ */ jsxs("h2", { className: "page-title", children: [
        "แก้ไขคำสั่งซื้อ #",
        order.invoice_no
      ] }) }) }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: `แก้ไขคำสั่งซื้อ: ${order.invoice_no}` }),
        /* @__PURE__ */ jsx("div", { className: "page-body", children: /* @__PURE__ */ jsxs("div", { className: "container-xl", children: [
          /* @__PURE__ */ jsx(Breadcrumbs, { items: breadcrumbsItems }),
          /* @__PURE__ */ jsx("form", { onSubmit: handleSubmit, children: /* @__PURE__ */ jsxs("div", { className: "row row-cards", children: [
            /* @__PURE__ */ jsx("div", { className: "col-lg-8", children: /* @__PURE__ */ jsxs("div", { className: "card", children: [
              /* @__PURE__ */ jsx("div", { className: "card-header", children: /* @__PURE__ */ jsx("h3", { className: "card-title", children: "รายการสินค้า" }) }),
              /* @__PURE__ */ jsxs("div", { className: "card-body", children: [
                /* @__PURE__ */ jsx("div", { className: "alert alert-info", children: "การแก้ไขคำสั่งซื้อจะไม่สามารถเพิ่มสินค้าได้ แต่สามารถลบสินค้าออกจากรายการได้" }),
                /* @__PURE__ */ jsx("div", { className: "table-responsive", children: /* @__PURE__ */ jsxs("table", { className: "table table-vcenter card-table table-striped", children: [
                  /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsx("th", { children: "ลำดับ" }),
                    /* @__PURE__ */ jsx("th", { children: "ชื่อสินค้า" }),
                    /* @__PURE__ */ jsx("th", { className: "text-center", children: "ราคา" }),
                    /* @__PURE__ */ jsx("th", { className: "text-center", children: "จำนวน" }),
                    /* @__PURE__ */ jsx("th", { className: "text-center", children: "รวม" }),
                    /* @__PURE__ */ jsx("th", { className: "text-end", children: "จัดการ" })
                  ] }) }),
                  /* @__PURE__ */ jsx("tbody", { children: orderDetails.length > 0 ? orderDetails.map((detail, index) => /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsx("td", { children: index + 1 }),
                    /* @__PURE__ */ jsx("td", { children: detail.product.name }),
                    /* @__PURE__ */ jsxs("td", { className: "text-center", children: [
                      "฿",
                      formatPrice(detail.unitcost)
                    ] }),
                    /* @__PURE__ */ jsx("td", { className: "text-center", children: detail.quantity }),
                    /* @__PURE__ */ jsxs("td", { className: "text-center", children: [
                      "฿",
                      formatPrice(detail.total)
                    ] }),
                    /* @__PURE__ */ jsx("td", { className: "text-end", children: /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        className: "btn btn-danger btn-sm",
                        onClick: () => handleRemoveProduct(index),
                        children: "ลบ"
                      }
                    ) })
                  ] }, detail.id)) : /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 6, className: "text-center", children: "ไม่มีรายการสินค้า" }) }) }),
                  /* @__PURE__ */ jsxs("tfoot", { children: [
                    /* @__PURE__ */ jsxs("tr", { children: [
                      /* @__PURE__ */ jsx("td", { colSpan: 4, className: "text-end", children: "รวม" }),
                      /* @__PURE__ */ jsxs("td", { className: "text-center", children: [
                        "฿",
                        formatPrice(subTotal)
                      ] }),
                      /* @__PURE__ */ jsx("td", {})
                    ] }),
                    /* @__PURE__ */ jsxs("tr", { children: [
                      /* @__PURE__ */ jsx("td", { colSpan: 4, className: "text-end", children: "ภาษีมูลค่าเพิ่ม 7%" }),
                      /* @__PURE__ */ jsxs("td", { className: "text-center", children: [
                        "฿",
                        formatPrice(vat)
                      ] }),
                      /* @__PURE__ */ jsx("td", {})
                    ] }),
                    /* @__PURE__ */ jsxs("tr", { children: [
                      /* @__PURE__ */ jsx("td", { colSpan: 4, className: "text-end", children: /* @__PURE__ */ jsx("strong", { children: "ยอดรวมทั้งสิ้น" }) }),
                      /* @__PURE__ */ jsx("td", { className: "text-center", children: /* @__PURE__ */ jsxs("strong", { children: [
                        "฿",
                        formatPrice(total)
                      ] }) }),
                      /* @__PURE__ */ jsx("td", {})
                    ] })
                  ] })
                ] }) })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "col-lg-4", children: /* @__PURE__ */ jsxs("div", { className: "card", children: [
              /* @__PURE__ */ jsx("div", { className: "card-header", children: /* @__PURE__ */ jsx("h3", { className: "card-title", children: "ข้อมูลคำสั่งซื้อ" }) }),
              /* @__PURE__ */ jsxs("div", { className: "card-body", children: [
                /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                  /* @__PURE__ */ jsx("label", { className: "form-label", htmlFor: "customer_id", children: "ลูกค้า" }),
                  /* @__PURE__ */ jsxs(
                    "select",
                    {
                      id: "customer_id",
                      className: `form-select ${errors.customer_id ? "is-invalid" : ""}`,
                      value: data.customer_id,
                      onChange: (e) => setData("customer_id", e.target.value),
                      required: true,
                      children: [
                        /* @__PURE__ */ jsx("option", { value: "", children: "-- เลือกลูกค้า --" }),
                        customers.map((customer) => /* @__PURE__ */ jsx("option", { value: customer.id, children: customer.name }, customer.id))
                      ]
                    }
                  ),
                  errors.customer_id && /* @__PURE__ */ jsx("div", { className: "invalid-feedback", children: errors.customer_id })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                  /* @__PURE__ */ jsx("label", { className: "form-label", htmlFor: "order_date", children: "วันที่สั่งซื้อ" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      id: "order_date",
                      type: "date",
                      className: `form-control ${errors.order_date ? "is-invalid" : ""}`,
                      value: data.order_date,
                      onChange: (e) => setData("order_date", e.target.value),
                      required: true
                    }
                  ),
                  errors.order_date && /* @__PURE__ */ jsx("div", { className: "invalid-feedback", children: errors.order_date })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                  /* @__PURE__ */ jsx("label", { className: "form-label", htmlFor: "payment_type", children: "ประเภทการชำระเงิน" }),
                  /* @__PURE__ */ jsxs(
                    "select",
                    {
                      id: "payment_type",
                      className: `form-select ${errors.payment_type ? "is-invalid" : ""}`,
                      value: data.payment_type,
                      onChange: (e) => setData("payment_type", e.target.value),
                      required: true,
                      children: [
                        /* @__PURE__ */ jsx("option", { value: "เงินสด", children: "เงินสด" }),
                        /* @__PURE__ */ jsx("option", { value: "โอนเงิน", children: "โอนเงิน" }),
                        /* @__PURE__ */ jsx("option", { value: "บัตรเครดิต", children: "บัตรเครดิต" }),
                        /* @__PURE__ */ jsx("option", { value: "เครดิต", children: "เครดิต" })
                      ]
                    }
                  ),
                  errors.payment_type && /* @__PURE__ */ jsx("div", { className: "invalid-feedback", children: errors.payment_type })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                  /* @__PURE__ */ jsx("label", { className: "form-label", htmlFor: "pay", children: "จำนวนเงินที่ชำระ" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      id: "pay",
                      type: "number",
                      className: `form-control ${errors.pay ? "is-invalid" : ""}`,
                      value: data.pay,
                      onChange: (e) => setData("pay", parseInt(e.target.value)),
                      max: total,
                      min: 0,
                      required: true
                    }
                  ),
                  errors.pay && /* @__PURE__ */ jsx("div", { className: "invalid-feedback", children: errors.pay }),
                  /* @__PURE__ */ jsxs("small", { className: "text-muted", children: [
                    "จำนวนเงินที่ค้างชำระ: ฿",
                    formatPrice(total - (typeof data.pay === "string" ? parseInt(data.pay || "0") : data.pay || 0))
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                  /* @__PURE__ */ jsx("label", { className: "form-label", htmlFor: "note", children: "หมายเหตุ" }),
                  /* @__PURE__ */ jsx(
                    "textarea",
                    {
                      id: "note",
                      className: `form-control ${errors.note ? "is-invalid" : ""}`,
                      value: data.note,
                      onChange: (e) => setData("note", e.target.value),
                      rows: 2
                    }
                  ),
                  errors.note && /* @__PURE__ */ jsx("div", { className: "invalid-feedback", children: errors.note })
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "card-footer text-end", children: /* @__PURE__ */ jsxs("div", { className: "d-flex", children: [
                /* @__PURE__ */ jsx(Link, { href: route("orders.show", order.id), className: "btn btn-outline-secondary me-2", children: "ยกเลิก" }),
                /* @__PURE__ */ jsx("button", { type: "submit", className: "btn btn-primary", disabled: processing || orderDetails.length === 0, children: processing ? "กำลังบันทึก..." : "บันทึกคำสั่งซื้อ" })
              ] }) })
            ] }) })
          ] }) })
        ] }) })
      ]
    }
  );
}
export {
  Edit as default
};
