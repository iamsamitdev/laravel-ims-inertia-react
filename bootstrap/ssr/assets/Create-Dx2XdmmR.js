import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useForm, Head, Link, router } from "@inertiajs/react";
import { A as Authenticated } from "./AuthenticatedLayout-CzjzYk7O.js";
import { B as Breadcrumbs } from "./Breadcrumbs-Cz6SsN78.js";
import { I as InputLabel, a as InputError, T as TextInput } from "./TextInput-BQ8risdN.js";
import { S as SelectInput, T as TextArea } from "./TextArea-hzbHuhkz.js";
function DateInput({
  label,
  error,
  className = "",
  ...props
}) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    label && /* @__PURE__ */ jsx(InputLabel, { value: label, htmlFor: props.id }),
    /* @__PURE__ */ jsx(
      "input",
      {
        type: "date",
        ...props,
        className: `form-control ${error ? "is-invalid" : ""} ${className}`
      }
    ),
    error && /* @__PURE__ */ jsx(InputError, { message: error })
  ] });
}
function Create({ auth, customers, products }) {
  var _a;
  const breadcrumbsItems = [
    { title: "หน้าหลัก", url: route("dashboard") },
    { title: "รายการสั่งซื้อ", url: route("orders.index") },
    { title: "เพิ่มคำสั่งซื้อใหม่", url: void 0 }
  ];
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [orderItems, setOrderItems] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [vat, setVat] = useState(0);
  const [total, setTotal] = useState(0);
  const [availableProducts, setAvailableProducts] = useState(products);
  useEffect(() => {
    const subTotalValue = orderItems.reduce((sum, item) => sum + item.total, 0);
    const vatValue = Math.round(subTotalValue * 0.07);
    const totalValue = subTotalValue + vatValue;
    setSubTotal(subTotalValue);
    setVat(vatValue);
    setTotal(totalValue);
  }, [orderItems]);
  const { data, setData, post, processing, errors, reset } = useForm({
    customer_id: "",
    order_date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
    payment_type: "เงินสด",
    pay: 0,
    order_items: "[]",
    sub_total: 0,
    vat: 0,
    total: 0,
    note: ""
  });
  const handleProductChange = (e) => {
    const productId = parseInt(e.target.value);
    const product = products.find((p) => p.id === productId) || null;
    setSelectedProduct(product);
    setQuantity(1);
  };
  const handleAddProduct = () => {
    if (!selectedProduct || quantity <= 0) return;
    if (quantity > selectedProduct.stock) {
      alert(`สินค้าในคลังมีไม่พอ (มี ${selectedProduct.stock} ชิ้น)`);
      return;
    }
    const total2 = selectedProduct.selling_price * quantity;
    const newItem = {
      product_id: selectedProduct.id,
      product_name: selectedProduct.name,
      quantity,
      unitcost: selectedProduct.selling_price,
      total: total2
    };
    const existingIndex = orderItems.findIndex((item) => item.product_id === selectedProduct.id);
    if (existingIndex >= 0) {
      const updatedItems = [...orderItems];
      const newQuantity = updatedItems[existingIndex].quantity + quantity;
      if (newQuantity > selectedProduct.stock) {
        alert(`สินค้าในคลังมีไม่พอ (มี ${selectedProduct.stock} ชิ้น)`);
        return;
      }
      updatedItems[existingIndex].quantity = newQuantity;
      updatedItems[existingIndex].total = selectedProduct.selling_price * newQuantity;
      setOrderItems(updatedItems);
    } else {
      setOrderItems([...orderItems, newItem]);
    }
    const updatedAvailable = availableProducts.map((p) => {
      if (p.id === selectedProduct.id) {
        return { ...p, stock: p.stock - quantity };
      }
      return p;
    });
    setAvailableProducts(updatedAvailable);
    setSelectedProduct(null);
    setQuantity(1);
  };
  const handleRemoveProduct = (index) => {
    const removedItem = orderItems[index];
    const updatedAvailable = availableProducts.map((p) => {
      if (p.id === removedItem.product_id) {
        return { ...p, stock: p.stock + removedItem.quantity };
      }
      return p;
    });
    setAvailableProducts(updatedAvailable);
    const updatedItems = [...orderItems];
    updatedItems.splice(index, 1);
    setOrderItems(updatedItems);
  };
  const formatPrice = (price) => {
    return (price / 100).toLocaleString("th-TH", { minimumFractionDigits: 2 });
  };
  const handleSubmit = (e) => {
    var _a2;
    e.preventDefault();
    if (orderItems.length === 0) {
      alert("กรุณาเพิ่มสินค้าอย่างน้อย 1 รายการ");
      return;
    }
    if (!data.customer_id) {
      alert("กรุณาเลือกลูกค้า");
      return;
    }
    const finalPay = parseInt(((_a2 = data.pay) == null ? void 0 : _a2.toString()) || "0");
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
      order_items: JSON.stringify(orderItems),
      sub_total: subTotal,
      vat,
      total
    });
    post(route("orders.store"), {
      onSuccess: () => {
        reset();
        setOrderItems([]);
        router.visit(route("orders.index"));
      }
    });
  };
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("div", { className: "page-header d-print-none", children: /* @__PURE__ */ jsx("div", { className: "container-xl", children: /* @__PURE__ */ jsx("h2", { className: "page-title", children: "เพิ่มคำสั่งซื้อใหม่" }) }) }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "เพิ่มคำสั่งซื้อใหม่" }),
        /* @__PURE__ */ jsx("div", { className: "page-body", children: /* @__PURE__ */ jsxs("div", { className: "container-xl", children: [
          /* @__PURE__ */ jsx(Breadcrumbs, { items: breadcrumbsItems }),
          /* @__PURE__ */ jsx("form", { onSubmit: handleSubmit, children: /* @__PURE__ */ jsxs("div", { className: "row row-cards", children: [
            /* @__PURE__ */ jsx("div", { className: "col-lg-8", children: /* @__PURE__ */ jsxs("div", { className: "card", children: [
              /* @__PURE__ */ jsx("div", { className: "card-header", children: /* @__PURE__ */ jsx("h3", { className: "card-title", children: "รายการสินค้า" }) }),
              /* @__PURE__ */ jsxs("div", { className: "card-body", children: [
                /* @__PURE__ */ jsxs("div", { className: "row g-3 mb-4", children: [
                  /* @__PURE__ */ jsx("div", { className: "col-lg-6", children: /* @__PURE__ */ jsxs(
                    SelectInput,
                    {
                      id: "product",
                      value: (selectedProduct == null ? void 0 : selectedProduct.id) || "",
                      label: "เลือกสินค้า",
                      onChange: handleProductChange,
                      children: [
                        /* @__PURE__ */ jsx("option", { value: "", children: "-- เลือกสินค้า --" }),
                        availableProducts.filter((p) => p.stock > 0).map((product) => /* @__PURE__ */ jsxs("option", { value: product.id, children: [
                          product.name,
                          " (",
                          product.stock,
                          ")"
                        ] }, product.id))
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ jsx("div", { className: "col-lg-2", children: /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                    /* @__PURE__ */ jsx(InputLabel, { htmlFor: "quantity", value: "จำนวน" }),
                    /* @__PURE__ */ jsx(
                      TextInput,
                      {
                        id: "quantity",
                        type: "number",
                        value: quantity,
                        min: 1,
                        max: (selectedProduct == null ? void 0 : selectedProduct.stock) || 1,
                        onChange: (e) => setQuantity(parseInt(e.target.value)),
                        disabled: !selectedProduct
                      }
                    )
                  ] }) }),
                  /* @__PURE__ */ jsx("div", { className: "col-lg-4", children: /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                    /* @__PURE__ */ jsx(InputLabel, { htmlFor: "price", value: "ราคา" }),
                    /* @__PURE__ */ jsxs("div", { className: "input-group", children: [
                      /* @__PURE__ */ jsx(
                        TextInput,
                        {
                          id: "price",
                          type: "text",
                          value: selectedProduct ? `฿${formatPrice(selectedProduct.selling_price * quantity)}` : "",
                          className: "form-control",
                          disabled: true
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          type: "button",
                          className: "btn btn-primary",
                          onClick: handleAddProduct,
                          disabled: !selectedProduct,
                          children: "เพิ่มสินค้า"
                        }
                      )
                    ] })
                  ] }) })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "table-responsive", children: /* @__PURE__ */ jsxs("table", { className: "table table-vcenter card-table table-striped", children: [
                  /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsx("th", { children: "ลำดับ" }),
                    /* @__PURE__ */ jsx("th", { children: "ชื่อสินค้า" }),
                    /* @__PURE__ */ jsx("th", { className: "text-center", children: "ราคา" }),
                    /* @__PURE__ */ jsx("th", { className: "text-center", children: "จำนวน" }),
                    /* @__PURE__ */ jsx("th", { className: "text-center", children: "รวม" }),
                    /* @__PURE__ */ jsx("th", { className: "text-end", children: "จัดการ" })
                  ] }) }),
                  /* @__PURE__ */ jsx("tbody", { children: orderItems.length > 0 ? orderItems.map((item, index) => /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsx("td", { children: index + 1 }),
                    /* @__PURE__ */ jsx("td", { children: item.product_name }),
                    /* @__PURE__ */ jsxs("td", { className: "text-center", children: [
                      "฿",
                      formatPrice(item.unitcost)
                    ] }),
                    /* @__PURE__ */ jsx("td", { className: "text-center", children: item.quantity }),
                    /* @__PURE__ */ jsxs("td", { className: "text-center", children: [
                      "฿",
                      formatPrice(item.total)
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
                  ] }, index)) : /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 6, className: "text-center", children: "ไม่มีรายการสินค้า" }) }) }),
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
                  /* @__PURE__ */ jsxs(
                    SelectInput,
                    {
                      id: "customer_id",
                      value: data.customer_id,
                      label: "ลูกค้า",
                      onChange: (e) => setData("customer_id", e.target.value),
                      error: errors.customer_id,
                      required: true,
                      children: [
                        /* @__PURE__ */ jsx("option", { value: "", children: "-- เลือกลูกค้า --" }),
                        customers.map((customer) => /* @__PURE__ */ jsx("option", { value: customer.id, children: customer.name }, customer.id))
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsx(InputError, { message: errors.customer_id, className: "mt-2" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                  /* @__PURE__ */ jsx(
                    DateInput,
                    {
                      id: "order_date",
                      value: data.order_date,
                      label: "วันที่สั่งซื้อ",
                      onChange: (e) => setData("order_date", e.target.value),
                      error: errors.order_date,
                      required: true
                    }
                  ),
                  /* @__PURE__ */ jsx(InputError, { message: errors.order_date, className: "mt-2" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                  /* @__PURE__ */ jsxs(
                    SelectInput,
                    {
                      id: "payment_type",
                      value: data.payment_type,
                      label: "ประเภทการชำระเงิน",
                      onChange: (e) => setData("payment_type", e.target.value),
                      error: errors.payment_type,
                      required: true,
                      children: [
                        /* @__PURE__ */ jsx("option", { value: "เงินสด", children: "เงินสด" }),
                        /* @__PURE__ */ jsx("option", { value: "โอนเงิน", children: "โอนเงิน" }),
                        /* @__PURE__ */ jsx("option", { value: "บัตรเครดิต", children: "บัตรเครดิต" }),
                        /* @__PURE__ */ jsx("option", { value: "เครดิต", children: "เครดิต" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsx(InputError, { message: errors.payment_type, className: "mt-2" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                  /* @__PURE__ */ jsx(InputLabel, { htmlFor: "pay", value: "จำนวนเงินที่ชำระ" }),
                  /* @__PURE__ */ jsx(
                    TextInput,
                    {
                      id: "pay",
                      type: "number",
                      value: data.pay,
                      className: "mt-1 block w-full",
                      onChange: (e) => setData("pay", parseInt(e.target.value)),
                      max: total,
                      min: 0,
                      required: true
                    }
                  ),
                  /* @__PURE__ */ jsx(InputError, { message: errors.pay, className: "mt-2" }),
                  /* @__PURE__ */ jsxs("small", { className: "text-muted", children: [
                    "จำนวนเงินที่ค้างชำระ: ฿",
                    formatPrice(total - parseInt(((_a = data.pay) == null ? void 0 : _a.toString()) || "0"))
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                  /* @__PURE__ */ jsx(
                    TextArea,
                    {
                      id: "note",
                      value: data.note,
                      label: "หมายเหตุ",
                      onChange: (e) => setData("note", e.target.value),
                      error: errors.note,
                      rows: 2
                    }
                  ),
                  /* @__PURE__ */ jsx(InputError, { message: errors.note, className: "mt-2" })
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "card-footer text-end", children: /* @__PURE__ */ jsxs("div", { className: "d-flex", children: [
                /* @__PURE__ */ jsx(Link, { href: route("orders.index"), className: "btn btn-outline-secondary me-2", children: "ยกเลิก" }),
                /* @__PURE__ */ jsx("button", { type: "submit", className: "btn btn-primary", disabled: processing || orderItems.length === 0, children: processing ? "กำลังบันทึก..." : "บันทึกคำสั่งซื้อ" })
              ] }) })
            ] }) })
          ] }) })
        ] }) })
      ]
    }
  );
}
export {
  Create as default
};
