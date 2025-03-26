import { jsxs, jsx } from "react/jsx-runtime";
import { Head, Link } from "@inertiajs/react";
import { A as Authenticated } from "./AuthenticatedLayout-CzjzYk7O.js";
import { B as Breadcrumbs } from "./Breadcrumbs-Cz6SsN78.js";
import "react";
function Show({ auth, user }) {
  var _a;
  const breadcrumbsItems = [
    { title: "หน้าหลัก", url: route("dashboard") },
    { title: "ผู้ใช้งาน", url: route("users.index") },
    { title: user.name, url: void 0 }
  ];
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsxs("div", { className: "row g-2 align-items-center", children: [
        /* @__PURE__ */ jsx("div", { className: "col", children: /* @__PURE__ */ jsx("h2", { className: "page-title", children: "ข้อมูลผู้ใช้งาน" }) }),
        /* @__PURE__ */ jsx("div", { className: "col-auto ms-auto", children: /* @__PURE__ */ jsxs("div", { className: "btn-list", children: [
          /* @__PURE__ */ jsxs(
            Link,
            {
              href: route("users.edit", user.id),
              className: "btn btn-primary d-none d-sm-inline-block",
              children: [
                /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "icon icon-tabler icon-tabler-edit", width: "24", height: "24", viewBox: "0 0 24 24", strokeWidth: "2", stroke: "currentColor", fill: "none", strokeLinecap: "round", strokeLinejoin: "round", children: [
                  /* @__PURE__ */ jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
                  /* @__PURE__ */ jsx("path", { d: "M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" }),
                  /* @__PURE__ */ jsx("path", { d: "M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" }),
                  /* @__PURE__ */ jsx("path", { d: "M16 5l3 3" })
                ] }),
                "แก้ไขข้อมูล"
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            Link,
            {
              href: route("users.edit", user.id),
              className: "btn btn-primary d-sm-none btn-icon",
              children: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "icon icon-tabler icon-tabler-edit", width: "24", height: "24", viewBox: "0 0 24 24", strokeWidth: "2", stroke: "currentColor", fill: "none", strokeLinecap: "round", strokeLinejoin: "round", children: [
                /* @__PURE__ */ jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
                /* @__PURE__ */ jsx("path", { d: "M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" }),
                /* @__PURE__ */ jsx("path", { d: "M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" }),
                /* @__PURE__ */ jsx("path", { d: "M16 5l3 3" })
              ] })
            }
          )
        ] }) })
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: `ผู้ใช้งาน: ${user.name}` }),
        /* @__PURE__ */ jsx("div", { className: "page-body", children: /* @__PURE__ */ jsxs("div", { className: "container-xl", children: [
          /* @__PURE__ */ jsx(Breadcrumbs, { items: breadcrumbsItems }),
          /* @__PURE__ */ jsxs("div", { className: "row", children: [
            /* @__PURE__ */ jsx("div", { className: "col-md-4", children: /* @__PURE__ */ jsxs("div", { className: "card", children: [
              /* @__PURE__ */ jsxs("div", { className: "card-body text-center", children: [
                /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                  /* @__PURE__ */ jsx(
                    "img",
                    {
                      className: "avatar avatar-xl rounded-circle mb-3",
                      src: user.profile_image ? `/storage/profiles/${user.profile_image}` : "/assets/img/demo/user-placeholder.png",
                      alt: user.name
                    }
                  ),
                  /* @__PURE__ */ jsx("h3", { className: "m-0", children: user.name }),
                  /* @__PURE__ */ jsx("p", { className: "text-muted", children: ((_a = user.role) == null ? void 0 : _a.name) || "ผู้ใช้งานทั่วไป" })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "d-flex", children: /* @__PURE__ */ jsx("a", { href: `mailto:${user.email}`, className: "btn btn-primary w-100", children: "ส่งอีเมล" }) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "card-body", children: [
                /* @__PURE__ */ jsxs("div", { className: "mb-2", children: [
                  /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "icon me-2 text-muted", width: "24", height: "24", viewBox: "0 0 24 24", strokeWidth: "2", stroke: "currentColor", fill: "none", strokeLinecap: "round", strokeLinejoin: "round", children: [
                    /* @__PURE__ */ jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
                    /* @__PURE__ */ jsx("path", { d: "M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" }),
                    /* @__PURE__ */ jsx("path", { d: "M3 7l9 6l9 -6" })
                  ] }),
                  /* @__PURE__ */ jsx("strong", { className: "me-1", children: "อีเมล:" }),
                  user.email
                ] }),
                user.phone && /* @__PURE__ */ jsxs("div", { className: "mb-2", children: [
                  /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "icon me-2 text-muted", width: "24", height: "24", viewBox: "0 0 24 24", strokeWidth: "2", stroke: "currentColor", fill: "none", strokeLinecap: "round", strokeLinejoin: "round", children: [
                    /* @__PURE__ */ jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
                    /* @__PURE__ */ jsx("path", { d: "M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" })
                  ] }),
                  /* @__PURE__ */ jsx("strong", { className: "me-1", children: "เบอร์โทรศัพท์:" }),
                  user.phone
                ] }),
                user.address && /* @__PURE__ */ jsxs("div", { className: "mb-2", children: [
                  /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "icon me-2 text-muted", width: "24", height: "24", viewBox: "0 0 24 24", strokeWidth: "2", stroke: "currentColor", fill: "none", strokeLinecap: "round", strokeLinejoin: "round", children: [
                    /* @__PURE__ */ jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
                    /* @__PURE__ */ jsx("path", { d: "M3 7l6 -3l6 3l6 -3v13l-6 3l-6 -3l-6 3v-13" }),
                    /* @__PURE__ */ jsx("path", { d: "M9 4v13" }),
                    /* @__PURE__ */ jsx("path", { d: "M15 7v13" })
                  ] }),
                  /* @__PURE__ */ jsx("strong", { className: "me-1", children: "ที่อยู่:" }),
                  user.address
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mb-2", children: [
                  /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "icon me-2 text-muted", width: "24", height: "24", viewBox: "0 0 24 24", strokeWidth: "2", stroke: "currentColor", fill: "none", strokeLinecap: "round", strokeLinejoin: "round", children: [
                    /* @__PURE__ */ jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
                    /* @__PURE__ */ jsx("path", { d: "M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" }),
                    /* @__PURE__ */ jsx("path", { d: "M12 12l3 2" }),
                    /* @__PURE__ */ jsx("path", { d: "M12 7v5" })
                  ] }),
                  /* @__PURE__ */ jsx("strong", { className: "me-1", children: "สถานะอีเมล:" }),
                  user.email_verified_at ? /* @__PURE__ */ jsx("span", { className: "badge bg-success", children: "ยืนยันแล้ว" }) : /* @__PURE__ */ jsx("span", { className: "badge bg-danger", children: "ยังไม่ยืนยัน" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mb-2", children: [
                  /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "icon me-2 text-muted", width: "24", height: "24", viewBox: "0 0 24 24", strokeWidth: "2", stroke: "currentColor", fill: "none", strokeLinecap: "round", strokeLinejoin: "round", children: [
                    /* @__PURE__ */ jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
                    /* @__PURE__ */ jsx("path", { d: "M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" }),
                    /* @__PURE__ */ jsx("path", { d: "M12 12l3 2" }),
                    /* @__PURE__ */ jsx("path", { d: "M12 7v5" })
                  ] }),
                  /* @__PURE__ */ jsx("strong", { className: "me-1", children: "วันที่สร้าง:" }),
                  new Date(user.created_at).toLocaleDateString("th-TH")
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mb-2", children: [
                  /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "icon me-2 text-muted", width: "24", height: "24", viewBox: "0 0 24 24", strokeWidth: "2", stroke: "currentColor", fill: "none", strokeLinecap: "round", strokeLinejoin: "round", children: [
                    /* @__PURE__ */ jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
                    /* @__PURE__ */ jsx("path", { d: "M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" }),
                    /* @__PURE__ */ jsx("path", { d: "M12 12l3 2" }),
                    /* @__PURE__ */ jsx("path", { d: "M12 7v5" })
                  ] }),
                  /* @__PURE__ */ jsx("strong", { className: "me-1", children: "วันที่แก้ไขล่าสุด:" }),
                  new Date(user.updated_at).toLocaleDateString("th-TH")
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "col-md-8", children: user.bio && /* @__PURE__ */ jsxs("div", { className: "card", children: [
              /* @__PURE__ */ jsx("div", { className: "card-header", children: /* @__PURE__ */ jsx("h3", { className: "card-title", children: "ประวัติย่อ" }) }),
              /* @__PURE__ */ jsx("div", { className: "card-body", children: /* @__PURE__ */ jsx("p", { className: "text-muted", children: user.bio }) })
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
