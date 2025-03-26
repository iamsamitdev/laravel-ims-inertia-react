import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useForm, router, Head, Link } from "@inertiajs/react";
import { A as Authenticated } from "./AuthenticatedLayout-CzjzYk7O.js";
import { B as Breadcrumbs } from "./Breadcrumbs-Cz6SsN78.js";
import { I as InputLabel, T as TextInput, a as InputError } from "./TextInput-BQ8risdN.js";
import { S as SelectInput, T as TextArea } from "./TextArea-hzbHuhkz.js";
function Edit({ auth, quotation, customers, products }) {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState(quotation.items || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [subtotal, setSubtotal] = useState(quotation.total_amount || 0);
  const [taxRate, setTaxRate] = useState(quotation.tax_rate || 7);
  const [taxAmount, setTaxAmount] = useState(quotation.tax_amount || 0);
  const [grandTotal, setGrandTotal] = useState(quotation.grand_total || 0);
  const { data, setData, put, processing, errors } = useForm({
    customer_id: quotation.customer_id.toString(),
    date: quotation.date,
    due_date: quotation.due_date,
    reference: quotation.reference,
    notes: quotation.notes || "",
    terms: quotation.terms || "ราคานี้มีผลเป็นเวลา 30 วันนับจากวันที่ในใบเสนอราคา",
    status: quotation.status.toString(),
    discount_type: quotation.discount_type || "fixed",
    discount_value: quotation.discount_value.toString() || "0",
    discount_amount: quotation.discount_amount.toString() || "0",
    tax_rate: quotation.tax_rate.toString() || "7",
    tax_amount: quotation.tax_amount.toString() || "0",
    total_amount: quotation.total_amount.toString() || "0",
    grand_total: quotation.grand_total.toString() || "0",
    items: JSON.stringify(items)
  });
  useEffect(() => {
    if (items.length > 0) {
      const calculatedSubtotal = items.reduce((sum, item) => sum + item.total_price, 0);
      setSubtotal(calculatedSubtotal);
      const discountAmount = parseFloat(data.discount_amount) || 0;
      const calculatedTaxAmount = (calculatedSubtotal - discountAmount) * taxRate / 100;
      setTaxAmount(calculatedTaxAmount);
      const calculatedGrandTotal = calculatedSubtotal - discountAmount + calculatedTaxAmount;
      setGrandTotal(calculatedGrandTotal);
      setData({
        ...data,
        total_amount: calculatedSubtotal.toString(),
        tax_amount: calculatedTaxAmount.toString(),
        grand_total: calculatedGrandTotal.toString(),
        items: JSON.stringify(items)
      });
    } else {
      setSubtotal(0);
      setTaxAmount(0);
      setGrandTotal(0);
      setData({
        ...data,
        total_amount: "0",
        tax_amount: "0",
        grand_total: "0",
        items: JSON.stringify([])
      });
    }
  }, [items, data.discount_amount, taxRate]);
  useEffect(() => {
    let discountAmount = 0;
    if (data.discount_type === "percentage") {
      discountAmount = subtotal * (parseFloat(data.discount_value) || 0) / 100;
    } else {
      discountAmount = parseFloat(data.discount_value) || 0;
    }
    setData("discount_amount", discountAmount.toString());
  }, [data.discount_type, data.discount_value, subtotal]);
  const handleSearchProducts = (term) => {
    setSearchTerm(term);
    if (term.length > 1) {
      const filtered = products.filter(
        (p) => p.name.toLowerCase().includes(term.toLowerCase()) || p.code.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(filtered.slice(0, 10));
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  };
  const handleAddProduct = (product) => {
    const existingItem = items.find((item) => item.product_id === product.id);
    if (existingItem) {
      const updatedItems = items.map((item) => {
        if (item.product_id === product.id) {
          const newQuantity = item.quantity + 1;
          return {
            ...item,
            quantity: newQuantity,
            total_price: newQuantity * item.unit_price
          };
        }
        return item;
      });
      setItems(updatedItems);
    } else {
      const newItem = {
        product_id: product.id,
        product_name: product.name,
        unit_price: product.price,
        quantity: 1,
        total_price: product.price
      };
      setItems([...items, newItem]);
    }
    setSearchTerm("");
    setShowSearchResults(false);
  };
  const handleQuantityChange = (index, value) => {
    if (value <= 0) return;
    const updatedItems = [...items];
    updatedItems[index].quantity = value;
    updatedItems[index].total_price = value * updatedItems[index].unit_price;
    setItems(updatedItems);
  };
  const handleUnitPriceChange = (index, value) => {
    if (value <= 0) return;
    const updatedItems = [...items];
    updatedItems[index].unit_price = value;
    updatedItems[index].total_price = value * updatedItems[index].quantity;
    setItems(updatedItems);
  };
  const handleRemoveItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (items.length === 0) {
      alert("กรุณาเพิ่มสินค้าอย่างน้อย 1 รายการ");
      return;
    }
    setLoading(true);
    put(route("quotations.update", quotation.id), {
      onSuccess: () => {
        setLoading(false);
      },
      onError: () => {
        setLoading(false);
      }
    });
  };
  const breadcrumbsItems = [
    { title: "หน้าหลัก", url: route("dashboard") },
    { title: "ใบเสนอราคา", url: route("quotations.index") },
    { title: "แก้ไข", url: void 0 }
  ];
  const canEdit = quotation.status !== 2 && quotation.status !== 3;
  if (!canEdit) {
    router.visit(route("quotations.show", quotation.id));
    return null;
  }
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("div", { className: "page-header d-print-none", children: /* @__PURE__ */ jsxs("div", { className: "container-xl", children: [
        /* @__PURE__ */ jsx("div", { className: "page-pretitle", children: "แก้ไข" }),
        /* @__PURE__ */ jsxs("h2", { className: "page-title", children: [
          "ใบเสนอราคา #",
          quotation.reference
        ] })
      ] }) }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: `แก้ไขใบเสนอราคา #${quotation.reference}` }),
        /* @__PURE__ */ jsx("div", { className: "page-body", children: /* @__PURE__ */ jsxs("div", { className: "container-xl", children: [
          /* @__PURE__ */ jsx(Breadcrumbs, { items: breadcrumbsItems }),
          /* @__PURE__ */ jsx("form", { onSubmit: handleSubmit, children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
            /* @__PURE__ */ jsx("div", { className: "col-md-8", children: /* @__PURE__ */ jsxs("div", { className: "card mb-3", children: [
              /* @__PURE__ */ jsx("div", { className: "card-header", children: /* @__PURE__ */ jsx("h3", { className: "card-title", children: "รายการสินค้า" }) }),
              /* @__PURE__ */ jsxs("div", { className: "card-body", children: [
                /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                  /* @__PURE__ */ jsx(InputLabel, { htmlFor: "product_search", value: "ค้นหาสินค้า" }),
                  /* @__PURE__ */ jsxs("div", { className: "position-relative", children: [
                    /* @__PURE__ */ jsx(
                      TextInput,
                      {
                        id: "product_search",
                        className: "block w-full mt-1",
                        value: searchTerm,
                        onChange: (e) => handleSearchProducts(e.target.value),
                        placeholder: "พิมพ์ชื่อหรือรหัสสินค้า",
                        autoComplete: "off"
                      }
                    ),
                    showSearchResults && searchResults.length > 0 && /* @__PURE__ */ jsx("div", { className: "position-absolute start-0 end-0 mt-1 bg-white border rounded-3 shadow-sm z-9999 search-results", children: /* @__PURE__ */ jsx("div", { className: "list-group list-group-flush", children: searchResults.map((product) => /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        className: "list-group-item list-group-item-action py-2",
                        onClick: () => handleAddProduct(product),
                        children: /* @__PURE__ */ jsxs("div", { className: "d-flex justify-content-between align-items-center", children: [
                          /* @__PURE__ */ jsxs("div", { children: [
                            /* @__PURE__ */ jsx("div", { className: "fw-bold", children: product.name }),
                            /* @__PURE__ */ jsxs("div", { className: "text-muted small", children: [
                              "รหัส: ",
                              product.code
                            ] })
                          ] }),
                          /* @__PURE__ */ jsxs("div", { className: "text-end", children: [
                            /* @__PURE__ */ jsxs("div", { children: [
                              "฿",
                              (product.price / 100).toLocaleString("th-TH")
                            ] }),
                            /* @__PURE__ */ jsxs("div", { className: "text-muted small", children: [
                              "คงเหลือ: ",
                              product.stock
                            ] })
                          ] })
                        ] })
                      },
                      product.id
                    )) }) })
                  ] }),
                  searchTerm && searchResults.length === 0 && showSearchResults && /* @__PURE__ */ jsx("div", { className: "text-danger mt-1", children: "ไม่พบสินค้าที่ค้นหา" })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "table-responsive", children: /* @__PURE__ */ jsxs("table", { className: "table table-vcenter", children: [
                  /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsx("th", { children: "สินค้า" }),
                    /* @__PURE__ */ jsx("th", { style: { width: "140px" }, children: "ราคา/หน่วย" }),
                    /* @__PURE__ */ jsx("th", { style: { width: "100px" }, children: "จำนวน" }),
                    /* @__PURE__ */ jsx("th", { style: { width: "140px" }, children: "ยอดรวม" }),
                    /* @__PURE__ */ jsx("th", { style: { width: "50px" } })
                  ] }) }),
                  /* @__PURE__ */ jsx("tbody", { children: items.length === 0 ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 5, className: "text-center py-3", children: "ยังไม่มีรายการสินค้า" }) }) : items.map((item, index) => /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsx("td", { children: item.product_name }),
                    /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
                      TextInput,
                      {
                        type: "number",
                        min: "0",
                        step: "0.01",
                        value: item.unit_price / 100,
                        onChange: (e) => handleUnitPriceChange(index, parseFloat(e.target.value) * 100)
                      }
                    ) }),
                    /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
                      TextInput,
                      {
                        type: "number",
                        min: "1",
                        value: item.quantity,
                        onChange: (e) => handleQuantityChange(index, parseInt(e.target.value))
                      }
                    ) }),
                    /* @__PURE__ */ jsxs("td", { className: "text-end", children: [
                      "฿",
                      (item.total_price / 100).toLocaleString("th-TH")
                    ] }),
                    /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        className: "btn btn-icon btn-sm btn-ghost-danger",
                        onClick: () => handleRemoveItem(index),
                        children: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "icon", width: "24", height: "24", viewBox: "0 0 24 24", strokeWidth: "2", stroke: "currentColor", fill: "none", strokeLinecap: "round", strokeLinejoin: "round", children: [
                          /* @__PURE__ */ jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
                          /* @__PURE__ */ jsx("path", { d: "M18 6l-12 12" }),
                          /* @__PURE__ */ jsx("path", { d: "M6 6l12 12" })
                        ] })
                      }
                    ) })
                  ] }, index)) })
                ] }) })
              ] })
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "col-md-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "card mb-3", children: [
                /* @__PURE__ */ jsx("div", { className: "card-header", children: /* @__PURE__ */ jsx("h3", { className: "card-title", children: "ข้อมูลใบเสนอราคา" }) }),
                /* @__PURE__ */ jsxs("div", { className: "card-body", children: [
                  /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                    /* @__PURE__ */ jsx(InputLabel, { htmlFor: "customer_id", value: "ลูกค้า", required: true }),
                    /* @__PURE__ */ jsxs(
                      SelectInput,
                      {
                        id: "customer_id",
                        className: "mt-1 block w-full",
                        value: data.customer_id,
                        onChange: (e) => setData("customer_id", e.target.value),
                        children: [
                          /* @__PURE__ */ jsx("option", { value: "", children: "-- เลือกลูกค้า --" }),
                          customers.map((customer) => /* @__PURE__ */ jsx("option", { value: customer.id, children: customer.name }, customer.id))
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsx(InputError, { message: errors.customer_id, className: "mt-2" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                    /* @__PURE__ */ jsx(InputLabel, { htmlFor: "reference", value: "เลขที่อ้างอิง", required: true }),
                    /* @__PURE__ */ jsx(
                      TextInput,
                      {
                        id: "reference",
                        value: data.reference,
                        className: "mt-1 block w-full",
                        onChange: (e) => setData("reference", e.target.value),
                        readOnly: true
                      }
                    ),
                    /* @__PURE__ */ jsx(InputError, { message: errors.reference, className: "mt-2" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "row", children: [
                    /* @__PURE__ */ jsx("div", { className: "col-md-6", children: /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                      /* @__PURE__ */ jsx(InputLabel, { htmlFor: "date", value: "วันที่", required: true }),
                      /* @__PURE__ */ jsx(
                        TextInput,
                        {
                          id: "date",
                          type: "date",
                          value: data.date,
                          className: "mt-1 block w-full",
                          onChange: (e) => setData("date", e.target.value)
                        }
                      ),
                      /* @__PURE__ */ jsx(InputError, { message: errors.date, className: "mt-2" })
                    ] }) }),
                    /* @__PURE__ */ jsx("div", { className: "col-md-6", children: /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                      /* @__PURE__ */ jsx(InputLabel, { htmlFor: "due_date", value: "วันที่หมดอายุ", required: true }),
                      /* @__PURE__ */ jsx(
                        TextInput,
                        {
                          id: "due_date",
                          type: "date",
                          value: data.due_date,
                          className: "mt-1 block w-full",
                          onChange: (e) => setData("due_date", e.target.value)
                        }
                      ),
                      /* @__PURE__ */ jsx(InputError, { message: errors.due_date, className: "mt-2" })
                    ] }) })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                    /* @__PURE__ */ jsx(InputLabel, { htmlFor: "status", value: "สถานะ", required: true }),
                    /* @__PURE__ */ jsxs(
                      SelectInput,
                      {
                        id: "status",
                        className: "mt-1 block w-full",
                        value: data.status,
                        onChange: (e) => setData("status", e.target.value),
                        children: [
                          /* @__PURE__ */ jsx("option", { value: "0", children: "ร่าง" }),
                          /* @__PURE__ */ jsx("option", { value: "1", children: "ส่งแล้ว" }),
                          /* @__PURE__ */ jsx("option", { value: "3", children: "ยกเลิก" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsx(InputError, { message: errors.status, className: "mt-2" })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "card mb-3", children: [
                /* @__PURE__ */ jsx("div", { className: "card-header", children: /* @__PURE__ */ jsx("h3", { className: "card-title", children: "ส่วนลดและภาษี" }) }),
                /* @__PURE__ */ jsxs("div", { className: "card-body", children: [
                  /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                    /* @__PURE__ */ jsx(InputLabel, { htmlFor: "discount_type", value: "ประเภทส่วนลด" }),
                    /* @__PURE__ */ jsxs(
                      SelectInput,
                      {
                        id: "discount_type",
                        className: "mt-1 block w-full",
                        value: data.discount_type,
                        onChange: (e) => setData("discount_type", e.target.value),
                        children: [
                          /* @__PURE__ */ jsx("option", { value: "fixed", children: "จำนวนเงิน" }),
                          /* @__PURE__ */ jsx("option", { value: "percentage", children: "เปอร์เซ็นต์" })
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                    /* @__PURE__ */ jsx(InputLabel, { htmlFor: "discount_value", value: `ส่วนลด ${data.discount_type === "percentage" ? "(%)" : "(฿)"}` }),
                    /* @__PURE__ */ jsx(
                      TextInput,
                      {
                        id: "discount_value",
                        type: "number",
                        min: "0",
                        step: data.discount_type === "percentage" ? "0.01" : "1",
                        value: data.discount_value,
                        className: "mt-1 block w-full",
                        onChange: (e) => setData("discount_value", e.target.value)
                      }
                    ),
                    /* @__PURE__ */ jsx(InputError, { message: errors.discount_value, className: "mt-2" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                    /* @__PURE__ */ jsx(InputLabel, { htmlFor: "tax_rate", value: "อัตราภาษีมูลค่าเพิ่ม (%)" }),
                    /* @__PURE__ */ jsx(
                      TextInput,
                      {
                        id: "tax_rate",
                        type: "number",
                        min: "0",
                        max: "100",
                        step: "0.01",
                        value: data.tax_rate,
                        className: "mt-1 block w-full",
                        onChange: (e) => {
                          const value = parseFloat(e.target.value) || 0;
                          setData("tax_rate", e.target.value);
                          setTaxRate(value);
                        }
                      }
                    ),
                    /* @__PURE__ */ jsx(InputError, { message: errors.tax_rate, className: "mt-2" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "py-2", children: [
                    /* @__PURE__ */ jsxs("div", { className: "d-flex justify-content-between mb-1", children: [
                      /* @__PURE__ */ jsx("span", { children: "ยอดรวม:" }),
                      /* @__PURE__ */ jsxs("span", { children: [
                        "฿",
                        (subtotal / 100).toLocaleString("th-TH")
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "d-flex justify-content-between mb-1", children: [
                      /* @__PURE__ */ jsx("span", { children: "ส่วนลด:" }),
                      /* @__PURE__ */ jsxs("span", { children: [
                        "-฿",
                        (parseFloat(data.discount_amount) / 100).toLocaleString("th-TH")
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "d-flex justify-content-between mb-1", children: [
                      /* @__PURE__ */ jsxs("span", { children: [
                        "ภาษีมูลค่าเพิ่ม (",
                        taxRate,
                        "%):"
                      ] }),
                      /* @__PURE__ */ jsxs("span", { children: [
                        "฿",
                        (taxAmount / 100).toLocaleString("th-TH")
                      ] })
                    ] }),
                    /* @__PURE__ */ jsx("hr", {}),
                    /* @__PURE__ */ jsxs("div", { className: "d-flex justify-content-between fw-bold", children: [
                      /* @__PURE__ */ jsx("span", { children: "ยอดรวมสุทธิ:" }),
                      /* @__PURE__ */ jsxs("span", { children: [
                        "฿",
                        (grandTotal / 100).toLocaleString("th-TH")
                      ] })
                    ] })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "card mb-3", children: [
                /* @__PURE__ */ jsx("div", { className: "card-header", children: /* @__PURE__ */ jsx("h3", { className: "card-title", children: "หมายเหตุและเงื่อนไข" }) }),
                /* @__PURE__ */ jsxs("div", { className: "card-body", children: [
                  /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                    /* @__PURE__ */ jsx(InputLabel, { htmlFor: "notes", value: "หมายเหตุ" }),
                    /* @__PURE__ */ jsx(
                      TextArea,
                      {
                        id: "notes",
                        className: "mt-1 block w-full",
                        value: data.notes,
                        onChange: (e) => setData("notes", e.target.value),
                        rows: 2
                      }
                    ),
                    /* @__PURE__ */ jsx(InputError, { message: errors.notes, className: "mt-2" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                    /* @__PURE__ */ jsx(InputLabel, { htmlFor: "terms", value: "เงื่อนไขและข้อตกลง" }),
                    /* @__PURE__ */ jsx(
                      TextArea,
                      {
                        id: "terms",
                        className: "mt-1 block w-full",
                        value: data.terms,
                        onChange: (e) => setData("terms", e.target.value),
                        rows: 3
                      }
                    ),
                    /* @__PURE__ */ jsx(InputError, { message: errors.terms, className: "mt-2" })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "d-flex justify-content-between", children: [
                /* @__PURE__ */ jsx(Link, { href: route("quotations.show", quotation.id), className: "btn btn-outline-primary", children: "ยกเลิก" }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "submit",
                    className: "btn btn-primary",
                    disabled: processing || loading,
                    children: processing || loading ? "กำลังบันทึก..." : "บันทึก"
                  }
                )
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
