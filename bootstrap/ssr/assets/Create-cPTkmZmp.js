import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useForm, Head, Link, router } from "@inertiajs/react";
import { A as Authenticated } from "./AuthenticatedLayout-CzjzYk7O.js";
import { B as Breadcrumbs } from "./Breadcrumbs-Cz6SsN78.js";
function Create({ auth, suppliers, reference_no }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [purchaseItems, setPurchaseItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const { data, setData, post, errors, processing } = useForm({
    reference_no,
    supplier_id: "",
    purchase_date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    purchase_status: "0",
    // 0=รออนุมัติ, 1=เสร็จสิ้น
    payment_status: "0",
    // 0=ยังไม่ชำระ, 1=ชำระบางส่วน, 2=ชำระแล้ว
    paid_amount: 0,
    total_amount: 0,
    purchase_note: "",
    purchase_items: JSON.stringify([])
  });
  const breadcrumbsItems = [
    { title: "หน้าหลัก", url: route("dashboard") },
    { title: "รายการสั่งซื้อสินค้าเข้า", url: route("purchases.index") },
    { title: "เพิ่มรายการใหม่", url: void 0 }
  ];
  useEffect(() => {
    calculateTotal();
  }, [purchaseItems]);
  const searchProducts = () => {
    if (!searchTerm) return;
    setIsSearching(true);
    router.get(
      route("api.search.products"),
      { term: searchTerm },
      {
        preserveState: true,
        onSuccess: (page) => {
          const products = page.props.products || [];
          setSearchResults(products);
          setIsSearching(false);
        },
        onError: () => {
          setIsSearching(false);
        }
      }
    );
  };
  const addToCart = (product) => {
    const existingItemIndex = purchaseItems.findIndex((item) => item.product_id === product.id);
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
        unit_price: product.unit_price,
        sub_total: product.unit_price
      };
      setPurchaseItems([...purchaseItems, newItem]);
    }
    setSearchTerm("");
    setSearchResults([]);
  };
  const updateQuantity = (index, value) => {
    if (value < 1) value = 1;
    const updatedItems = [...purchaseItems];
    updatedItems[index].quantity = value;
    updatedItems[index].sub_total = value * updatedItems[index].unit_price;
    setPurchaseItems(updatedItems);
  };
  const updateUnitPrice = (index, value) => {
    if (value < 0) value = 0;
    const updatedItems = [...purchaseItems];
    updatedItems[index].unit_price = value;
    updatedItems[index].sub_total = updatedItems[index].quantity * value;
    setPurchaseItems(updatedItems);
  };
  const removeItem = (index) => {
    const updatedItems = [...purchaseItems];
    updatedItems.splice(index, 1);
    setPurchaseItems(updatedItems);
  };
  const calculateTotal = () => {
    const total = purchaseItems.reduce((sum, item) => sum + item.sub_total, 0);
    setTotalAmount(total);
    setData("total_amount", total);
    setData("purchase_items", JSON.stringify(purchaseItems));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (purchaseItems.length === 0) {
      alert("กรุณาเพิ่มสินค้าอย่างน้อย 1 รายการ");
      return;
    }
    setData("purchase_items", JSON.stringify(purchaseItems));
    post(route("purchases.store"));
  };
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("div", { className: "row g-2 align-items-center", children: /* @__PURE__ */ jsx("div", { className: "col", children: /* @__PURE__ */ jsx("h2", { className: "page-title", children: "เพิ่มรายการสั่งซื้อใหม่" }) }) }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "เพิ่มรายการสั่งซื้อใหม่" }),
        /* @__PURE__ */ jsx("div", { className: "page-body", children: /* @__PURE__ */ jsxs("div", { className: "container-xl", children: [
          /* @__PURE__ */ jsx(Breadcrumbs, { items: breadcrumbsItems }),
          /* @__PURE__ */ jsx("div", { className: "row", children: /* @__PURE__ */ jsx("div", { className: "col-12", children: /* @__PURE__ */ jsx("form", { onSubmit: handleSubmit, children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
            /* @__PURE__ */ jsx("div", { className: "col-md-4", children: /* @__PURE__ */ jsxs("div", { className: "card", children: [
              /* @__PURE__ */ jsx("div", { className: "card-header", children: /* @__PURE__ */ jsx("h3", { className: "card-title", children: "ข้อมูลการสั่งซื้อ" }) }),
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
                      required: true,
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
                      onChange: (e) => setData("purchase_date", e.target.value),
                      required: true
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
                      required: true,
                      children: [
                        /* @__PURE__ */ jsx("option", { value: "0", children: "รออนุมัติ" }),
                        /* @__PURE__ */ jsx("option", { value: "1", children: "เสร็จสิ้น" })
                      ]
                    }
                  ),
                  errors.purchase_status && /* @__PURE__ */ jsx("div", { className: "invalid-feedback", children: errors.purchase_status })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                  /* @__PURE__ */ jsx("label", { className: "form-label required", htmlFor: "payment_status", children: "สถานะการชำระเงิน" }),
                  /* @__PURE__ */ jsxs(
                    "select",
                    {
                      id: "payment_status",
                      className: `form-select ${errors.payment_status ? "is-invalid" : ""}`,
                      value: data.payment_status,
                      onChange: (e) => setData("payment_status", e.target.value),
                      required: true,
                      children: [
                        /* @__PURE__ */ jsx("option", { value: "0", children: "ยังไม่ชำระ" }),
                        /* @__PURE__ */ jsx("option", { value: "1", children: "ชำระบางส่วน" }),
                        /* @__PURE__ */ jsx("option", { value: "2", children: "ชำระแล้ว" })
                      ]
                    }
                  ),
                  errors.payment_status && /* @__PURE__ */ jsx("div", { className: "invalid-feedback", children: errors.payment_status })
                ] }),
                data.payment_status === "1" && /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                  /* @__PURE__ */ jsx("label", { className: "form-label required", htmlFor: "paid_amount", children: "จำนวนเงินที่ชำระแล้ว" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      id: "paid_amount",
                      type: "number",
                      className: `form-control ${errors.paid_amount ? "is-invalid" : ""}`,
                      value: data.paid_amount,
                      onChange: (e) => setData("paid_amount", parseFloat(e.target.value)),
                      required: true,
                      min: "0",
                      step: "0.01"
                    }
                  ),
                  errors.paid_amount && /* @__PURE__ */ jsx("div", { className: "invalid-feedback", children: errors.paid_amount })
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
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "col-md-8", children: [
              /* @__PURE__ */ jsxs("div", { className: "card mb-3", children: [
                /* @__PURE__ */ jsx("div", { className: "card-header", children: /* @__PURE__ */ jsx("h3", { className: "card-title", children: "ค้นหาสินค้า" }) }),
                /* @__PURE__ */ jsxs("div", { className: "card-body", children: [
                  /* @__PURE__ */ jsxs("div", { className: "row g-2", children: [
                    /* @__PURE__ */ jsx("div", { className: "col", children: /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        className: "form-control",
                        placeholder: "พิมพ์ชื่อหรือรหัสสินค้า",
                        value: searchTerm,
                        onChange: (e) => setSearchTerm(e.target.value),
                        onKeyPress: (e) => e.key === "Enter" && (e.preventDefault(), searchProducts())
                      }
                    ) }),
                    /* @__PURE__ */ jsx("div", { className: "col-auto", children: /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        className: "btn btn-primary",
                        onClick: searchProducts,
                        disabled: isSearching,
                        children: isSearching ? "กำลังค้นหา..." : "ค้นหา"
                      }
                    ) })
                  ] }),
                  searchResults.length > 0 && /* @__PURE__ */ jsx("div", { className: "table-responsive mt-3", children: /* @__PURE__ */ jsxs("table", { className: "table table-vcenter card-table", children: [
                    /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
                      /* @__PURE__ */ jsx("th", { children: "รหัส" }),
                      /* @__PURE__ */ jsx("th", { children: "ชื่อสินค้า" }),
                      /* @__PURE__ */ jsx("th", { children: "ราคา" }),
                      /* @__PURE__ */ jsx("th", { children: "จัดการ" })
                    ] }) }),
                    /* @__PURE__ */ jsx("tbody", { children: searchResults.map((product) => /* @__PURE__ */ jsxs("tr", { children: [
                      /* @__PURE__ */ jsx("td", { children: product.code }),
                      /* @__PURE__ */ jsx("td", { children: product.name }),
                      /* @__PURE__ */ jsxs("td", { children: [
                        "฿",
                        (product.unit_price / 100).toLocaleString("th-TH", { minimumFractionDigits: 2 })
                      ] }),
                      /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
                        "button",
                        {
                          type: "button",
                          className: "btn btn-sm btn-primary",
                          onClick: () => addToCart(product),
                          children: "เพิ่ม"
                        }
                      ) })
                    ] }, product.id)) })
                  ] }) })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "card", children: [
                /* @__PURE__ */ jsx("div", { className: "card-header", children: /* @__PURE__ */ jsx("h3", { className: "card-title", children: "รายการสินค้า" }) }),
                /* @__PURE__ */ jsx("div", { className: "card-body", children: /* @__PURE__ */ jsx("div", { className: "table-responsive", children: /* @__PURE__ */ jsxs("table", { className: "table table-vcenter card-table", children: [
                  /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsx("th", { children: "รหัส" }),
                    /* @__PURE__ */ jsx("th", { children: "ชื่อสินค้า" }),
                    /* @__PURE__ */ jsx("th", { className: "w-15", children: "จำนวน" }),
                    /* @__PURE__ */ jsx("th", { className: "w-20", children: "ราคาต่อหน่วย" }),
                    /* @__PURE__ */ jsx("th", { className: "w-20", children: "รวม" }),
                    /* @__PURE__ */ jsx("th", { className: "w-10", children: "จัดการ" })
                  ] }) }),
                  /* @__PURE__ */ jsx("tbody", { children: purchaseItems.length > 0 ? purchaseItems.map((item, index) => /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsx("td", { children: item.code }),
                    /* @__PURE__ */ jsx("td", { children: item.name }),
                    /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "number",
                        className: "form-control",
                        min: "1",
                        value: item.quantity,
                        onChange: (e) => updateQuantity(index, parseInt(e.target.value, 10))
                      }
                    ) }),
                    /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsxs("div", { className: "input-group", children: [
                      /* @__PURE__ */ jsx("span", { className: "input-group-text", children: "฿" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "number",
                          className: "form-control",
                          min: "0",
                          step: "0.01",
                          value: (item.unit_price / 100).toFixed(2),
                          onChange: (e) => updateUnitPrice(index, parseFloat(e.target.value) * 100)
                        }
                      )
                    ] }) }),
                    /* @__PURE__ */ jsxs("td", { children: [
                      "฿",
                      (item.sub_total / 100).toLocaleString("th-TH", { minimumFractionDigits: 2 })
                    ] }),
                    /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        className: "btn btn-sm btn-danger",
                        onClick: () => removeItem(index),
                        children: "ลบ"
                      }
                    ) })
                  ] }, index)) : /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 6, className: "text-center py-3", children: "ยังไม่มีรายการสินค้า" }) }) }),
                  /* @__PURE__ */ jsx("tfoot", { children: /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsx("th", { colSpan: 4, className: "text-end", children: "ยอดรวมทั้งสิ้น:" }),
                    /* @__PURE__ */ jsxs("th", { children: [
                      "฿",
                      (totalAmount / 100).toLocaleString("th-TH", { minimumFractionDigits: 2 })
                    ] }),
                    /* @__PURE__ */ jsx("th", {})
                  ] }) })
                ] }) }) }),
                /* @__PURE__ */ jsxs("div", { className: "card-footer text-end", children: [
                  /* @__PURE__ */ jsx(Link, { href: route("purchases.index"), className: "btn btn-outline-secondary me-2", children: "ยกเลิก" }),
                  /* @__PURE__ */ jsx("button", { type: "submit", className: "btn btn-primary", disabled: processing || purchaseItems.length === 0, children: processing ? "กำลังบันทึก..." : "บันทึกข้อมูล" })
                ] })
              ] })
            ] })
          ] }) }) }) })
        ] }) })
      ]
    }
  );
}
export {
  Create as default
};
