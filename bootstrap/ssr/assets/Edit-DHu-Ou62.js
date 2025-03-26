import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useForm, Head, Link, router } from "@inertiajs/react";
import { A as Authenticated } from "./AuthenticatedLayout-CzjzYk7O.js";
import { B as Breadcrumbs } from "./Breadcrumbs-Cz6SsN78.js";
function Edit({ auth, purchase, suppliers }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [purchaseItems, setPurchaseItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(purchase.total_amount / 100);
  useEffect(() => {
    const items = purchase.details.map((detail) => ({
      id: detail.id,
      product_id: detail.product_id,
      name: detail.product.name,
      code: detail.product.code,
      quantity: detail.quantity,
      unit_price: detail.unit_price / 100,
      sub_total: detail.sub_total / 100
    }));
    setPurchaseItems(items);
  }, [purchase.details]);
  const { data, setData, put, errors, processing } = useForm({
    reference_no: purchase.reference_no,
    supplier_id: purchase.supplier_id.toString(),
    purchase_date: new Date(purchase.purchase_date).toISOString().split("T")[0],
    purchase_status: purchase.purchase_status.value.toString(),
    payment_status: purchase.payment_status.value.toString(),
    paid_amount: purchase.paid_amount / 100,
    total_amount: purchase.total_amount / 100,
    purchase_note: purchase.purchase_note || "",
    purchase_items: JSON.stringify(purchaseItems)
  });
  const searchProducts = () => {
    if (!searchTerm.trim()) return;
    setIsSearching(true);
    router.get(
      route("purchases.search-product"),
      { search: searchTerm },
      {
        preserveState: true,
        onSuccess: (page) => {
          setSearchResults(Array.isArray(page.props.products) ? page.props.products : []);
          setIsSearching(false);
        },
        onError: () => {
          setIsSearching(false);
        }
      }
    );
  };
  const addToCart = (product) => {
    const existingItemIndex = purchaseItems.findIndex(
      (item) => item.product_id === product.id
    );
    if (existingItemIndex !== -1) {
      const updatedItems = [...purchaseItems];
      updatedItems[existingItemIndex].quantity += 1;
      updatedItems[existingItemIndex].sub_total = updatedItems[existingItemIndex].quantity * updatedItems[existingItemIndex].unit_price;
      setPurchaseItems(updatedItems);
    } else {
      const newItem = {
        product_id: product.id,
        name: product.name,
        code: product.code,
        quantity: 1,
        unit_price: product.unit_price / 100,
        sub_total: product.unit_price / 100
      };
      setPurchaseItems([...purchaseItems, newItem]);
    }
    setSearchTerm("");
    setSearchResults([]);
  };
  const updateQuantity = (index, value) => {
    const updatedItems = [...purchaseItems];
    updatedItems[index].quantity = value;
    updatedItems[index].sub_total = value * updatedItems[index].unit_price;
    setPurchaseItems(updatedItems);
  };
  const updateUnitPrice = (index, value) => {
    const updatedItems = [...purchaseItems];
    updatedItems[index].unit_price = value;
    updatedItems[index].sub_total = value * updatedItems[index].quantity;
    setPurchaseItems(updatedItems);
  };
  const removeItem = (index) => {
    const updatedItems = purchaseItems.filter((_, i) => i !== index);
    setPurchaseItems(updatedItems);
  };
  const calculateTotal = () => {
    return purchaseItems.reduce((total, item) => total + item.sub_total, 0);
  };
  useEffect(() => {
    const total = calculateTotal();
    setTotalAmount(total);
    setData("total_amount", total);
    setData("purchase_items", JSON.stringify(purchaseItems));
  }, [purchaseItems]);
  useEffect(() => {
    const paid = parseFloat(data.paid_amount || 0);
    if (paid <= 0) {
      setData("payment_status", "0");
    } else if (paid < totalAmount) {
      setData("payment_status", "1");
    } else {
      setData("payment_status", "2");
    }
  }, [data.paid_amount, totalAmount]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (purchaseItems.length === 0) {
      alert("กรุณาเพิ่มสินค้าอย่างน้อย 1 รายการ");
      return;
    }
    put(route("purchases.update", purchase.id));
  };
  const breadcrumbsItems = [
    { title: "หน้าหลัก", url: route("dashboard") },
    { title: "รายการสั่งซื้อ", url: route("purchases.index") },
    { title: purchase.reference_no, url: route("purchases.show", purchase.id) },
    { title: "แก้ไขรายการสั่งซื้อ", url: void 0 }
  ];
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("div", { className: "row g-2 align-items-center", children: /* @__PURE__ */ jsx("div", { className: "col", children: /* @__PURE__ */ jsx("h2", { className: "page-title", children: "แก้ไขรายการสั่งซื้อ" }) }) }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: `แก้ไขรายการสั่งซื้อ: ${purchase.reference_no}` }),
        /* @__PURE__ */ jsx("div", { className: "page-body", children: /* @__PURE__ */ jsxs("div", { className: "container-xl", children: [
          /* @__PURE__ */ jsx(Breadcrumbs, { items: breadcrumbsItems }),
          /* @__PURE__ */ jsx("form", { onSubmit: handleSubmit, children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
            /* @__PURE__ */ jsx("div", { className: "col-md-8", children: /* @__PURE__ */ jsxs("div", { className: "card mb-3", children: [
              /* @__PURE__ */ jsx("div", { className: "card-header", children: /* @__PURE__ */ jsx("h3", { className: "card-title", children: "สินค้า" }) }),
              /* @__PURE__ */ jsxs("div", { className: "card-body", children: [
                /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                  /* @__PURE__ */ jsxs("div", { className: "input-group", children: [
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        className: "form-control",
                        placeholder: "ค้นหาสินค้าด้วยชื่อหรือรหัส",
                        value: searchTerm,
                        onChange: (e) => setSearchTerm(e.target.value)
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        className: "btn btn-primary",
                        onClick: searchProducts,
                        disabled: isSearching,
                        children: isSearching ? "กำลังค้นหา..." : "ค้นหา"
                      }
                    )
                  ] }),
                  searchResults.length > 0 && /* @__PURE__ */ jsx("div", { className: "search-results mt-2", children: /* @__PURE__ */ jsx("div", { className: "list-group", children: searchResults.map((product) => /* @__PURE__ */ jsxs(
                    "button",
                    {
                      type: "button",
                      className: "list-group-item list-group-item-action d-flex justify-content-between align-items-center",
                      onClick: () => addToCart(product),
                      children: [
                        /* @__PURE__ */ jsxs("div", { children: [
                          /* @__PURE__ */ jsx("span", { className: "fw-bold", children: product.name }),
                          /* @__PURE__ */ jsxs("span", { className: "ms-2 text-muted", children: [
                            "(",
                            product.code,
                            ")"
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { children: [
                          /* @__PURE__ */ jsxs("span", { className: "badge bg-primary", children: [
                            "฿",
                            (product.unit_price / 100).toLocaleString("th-TH", { minimumFractionDigits: 2 })
                          ] }),
                          /* @__PURE__ */ jsxs("span", { className: "badge bg-secondary ms-1", children: [
                            "คงเหลือ: ",
                            product.quantity
                          ] })
                        ] })
                      ]
                    },
                    product.id
                  )) }) })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "mb-3", children: /* @__PURE__ */ jsx("div", { className: "table-responsive", children: /* @__PURE__ */ jsxs("table", { className: "table table-vcenter", children: [
                  /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsx("th", { children: "สินค้า" }),
                    /* @__PURE__ */ jsx("th", { style: { width: "15%" }, children: "จำนวน" }),
                    /* @__PURE__ */ jsx("th", { style: { width: "20%" }, children: "ราคา/หน่วย" }),
                    /* @__PURE__ */ jsx("th", { style: { width: "20%" }, children: "รวม" }),
                    /* @__PURE__ */ jsx("th", { style: { width: "5%" } })
                  ] }) }),
                  /* @__PURE__ */ jsx("tbody", { children: purchaseItems.length === 0 ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 5, className: "text-center py-3", children: /* @__PURE__ */ jsx("div", { className: "text-muted", children: "ยังไม่มีสินค้าในรายการ ค้นหาและเพิ่มสินค้า" }) }) }) : purchaseItems.map((item, index) => /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsxs("td", { children: [
                      /* @__PURE__ */ jsx("div", { children: item.name }),
                      /* @__PURE__ */ jsx("div", { className: "text-muted", children: item.code })
                    ] }),
                    /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "number",
                        className: "form-control",
                        min: "1",
                        value: item.quantity,
                        onChange: (e) => updateQuantity(index, parseInt(e.target.value))
                      }
                    ) }),
                    /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsxs("div", { className: "input-group", children: [
                      /* @__PURE__ */ jsx("span", { className: "input-group-text", children: "฿" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "number",
                          className: "form-control",
                          min: "0.01",
                          step: "0.01",
                          value: item.unit_price,
                          onChange: (e) => updateUnitPrice(index, parseFloat(e.target.value))
                        }
                      )
                    ] }) }),
                    /* @__PURE__ */ jsxs("td", { children: [
                      "฿",
                      item.sub_total.toLocaleString("th-TH", { minimumFractionDigits: 2 })
                    ] }),
                    /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        className: "btn btn-sm btn-danger",
                        onClick: () => removeItem(index),
                        children: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "icon", width: "24", height: "24", viewBox: "0 0 24 24", strokeWidth: "2", stroke: "currentColor", fill: "none", strokeLinecap: "round", strokeLinejoin: "round", children: [
                          /* @__PURE__ */ jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
                          /* @__PURE__ */ jsx("path", { d: "M18 6l-12 12" }),
                          /* @__PURE__ */ jsx("path", { d: "M6 6l12 12" })
                        ] })
                      }
                    ) })
                  ] }, index)) }),
                  /* @__PURE__ */ jsx("tfoot", { children: /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsx("th", { colSpan: 3, className: "text-end", children: "ยอดรวมทั้งสิ้น:" }),
                    /* @__PURE__ */ jsxs("th", { children: [
                      "฿",
                      totalAmount.toLocaleString("th-TH", { minimumFractionDigits: 2 })
                    ] }),
                    /* @__PURE__ */ jsx("th", {})
                  ] }) })
                ] }) }) })
              ] })
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "col-md-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "card mb-3", children: [
                /* @__PURE__ */ jsx("div", { className: "card-header", children: /* @__PURE__ */ jsx("h3", { className: "card-title", children: "ข้อมูลทั่วไป" }) }),
                /* @__PURE__ */ jsxs("div", { className: "card-body", children: [
                  /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                    /* @__PURE__ */ jsx("label", { className: "form-label required", htmlFor: "reference_no", children: "เลขที่อ้างอิง" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        id: "reference_no",
                        type: "text",
                        className: `form-control ${errors.reference_no ? "is-invalid" : ""}`,
                        value: data.reference_no,
                        onChange: (e) => setData("reference_no", e.target.value),
                        readOnly: true
                      }
                    ),
                    errors.reference_no && /* @__PURE__ */ jsx("div", { className: "invalid-feedback", children: errors.reference_no })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                    /* @__PURE__ */ jsx("label", { className: "form-label required", htmlFor: "supplier_id", children: "ซัพพลายเออร์" }),
                    /* @__PURE__ */ jsxs(
                      "select",
                      {
                        id: "supplier_id",
                        className: `form-select ${errors.supplier_id ? "is-invalid" : ""}`,
                        value: data.supplier_id,
                        onChange: (e) => setData("supplier_id", e.target.value),
                        disabled: true,
                        children: [
                          /* @__PURE__ */ jsx("option", { value: "", children: "เลือกซัพพลายเออร์" }),
                          suppliers.map((supplier) => /* @__PURE__ */ jsx("option", { value: supplier.id, children: supplier.name }, supplier.id))
                        ]
                      }
                    ),
                    errors.supplier_id && /* @__PURE__ */ jsx("div", { className: "invalid-feedback", children: errors.supplier_id })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                    /* @__PURE__ */ jsx("label", { className: "form-label required", htmlFor: "purchase_date", children: "วันที่สั่งซื้อ" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        id: "purchase_date",
                        type: "date",
                        className: `form-control ${errors.purchase_date ? "is-invalid" : ""}`,
                        value: data.purchase_date,
                        onChange: (e) => setData("purchase_date", e.target.value)
                      }
                    ),
                    errors.purchase_date && /* @__PURE__ */ jsx("div", { className: "invalid-feedback", children: errors.purchase_date })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                    /* @__PURE__ */ jsx("label", { className: "form-label required", htmlFor: "purchase_status", children: "สถานะการสั่งซื้อ" }),
                    /* @__PURE__ */ jsxs(
                      "select",
                      {
                        id: "purchase_status",
                        className: `form-select ${errors.purchase_status ? "is-invalid" : ""}`,
                        value: data.purchase_status,
                        onChange: (e) => setData("purchase_status", e.target.value),
                        children: [
                          /* @__PURE__ */ jsx("option", { value: "0", children: "รออนุมัติ" }),
                          /* @__PURE__ */ jsx("option", { value: "1", children: "เสร็จสิ้น" })
                        ]
                      }
                    ),
                    errors.purchase_status && /* @__PURE__ */ jsx("div", { className: "invalid-feedback", children: errors.purchase_status })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                    /* @__PURE__ */ jsx("label", { className: "form-label", htmlFor: "payment_status", children: "สถานะการชำระเงิน" }),
                    /* @__PURE__ */ jsxs(
                      "select",
                      {
                        id: "payment_status",
                        className: `form-select ${errors.payment_status ? "is-invalid" : ""}`,
                        value: data.payment_status,
                        disabled: true,
                        children: [
                          /* @__PURE__ */ jsx("option", { value: "0", children: "ยังไม่ชำระ" }),
                          /* @__PURE__ */ jsx("option", { value: "1", children: "ชำระบางส่วน" }),
                          /* @__PURE__ */ jsx("option", { value: "2", children: "ชำระแล้ว" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsx("small", { className: "form-hint", children: "สถานะการชำระเงินจะเปลี่ยนแปลงอัตโนมัติตามยอดเงินที่ชำระ" }),
                    errors.payment_status && /* @__PURE__ */ jsx("div", { className: "invalid-feedback", children: errors.payment_status })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                    /* @__PURE__ */ jsx("label", { className: "form-label", htmlFor: "paid_amount", children: "ยอดเงินที่ชำระแล้ว" }),
                    /* @__PURE__ */ jsxs("div", { className: "input-group", children: [
                      /* @__PURE__ */ jsx("span", { className: "input-group-text", children: "฿" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          id: "paid_amount",
                          type: "number",
                          className: `form-control ${errors.paid_amount ? "is-invalid" : ""}`,
                          value: data.paid_amount,
                          onChange: (e) => setData("paid_amount", parseFloat(e.target.value) || 0),
                          min: "0",
                          max: totalAmount,
                          step: "0.01"
                        }
                      ),
                      errors.paid_amount && /* @__PURE__ */ jsx("div", { className: "invalid-feedback", children: errors.paid_amount })
                    ] }),
                    /* @__PURE__ */ jsxs("small", { className: "form-hint", children: [
                      "ยอดรวมทั้งสิ้น: ฿",
                      totalAmount.toLocaleString("th-TH", { minimumFractionDigits: 2 })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                    /* @__PURE__ */ jsx("label", { className: "form-label", htmlFor: "purchase_note", children: "หมายเหตุ" }),
                    /* @__PURE__ */ jsx(
                      "textarea",
                      {
                        id: "purchase_note",
                        className: `form-control ${errors.purchase_note ? "is-invalid" : ""}`,
                        value: data.purchase_note,
                        onChange: (e) => setData("purchase_note", e.target.value),
                        rows: 3
                      }
                    ),
                    errors.purchase_note && /* @__PURE__ */ jsx("div", { className: "invalid-feedback", children: errors.purchase_note })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "d-flex gap-3", children: [
                /* @__PURE__ */ jsx(Link, { href: route("purchases.show", purchase.id), className: "btn btn-outline-secondary w-100", children: "ยกเลิก" }),
                /* @__PURE__ */ jsx("button", { type: "submit", className: "btn btn-primary w-100", disabled: processing, children: processing ? "กำลังบันทึก..." : "บันทึกรายการ" })
              ] })
            ] })
          ] }) })
        ] }) })
      ]
    }
  );
}
export {
  Edit as default
};
