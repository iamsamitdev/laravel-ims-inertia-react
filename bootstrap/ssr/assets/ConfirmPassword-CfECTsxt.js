import { jsxs, jsx } from "react/jsx-runtime";
import { useForm, Head } from "@inertiajs/react";
import { G as Guest } from "./GuestLayout-AYfqqRwm.js";
import { I as InputLabel, T as TextInput, a as InputError } from "./TextInput-BQ8risdN.js";
import "react";
function ConfirmPassword() {
  const { data, setData, post, processing, errors } = useForm({
    password: ""
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("password.confirm"));
  };
  return /* @__PURE__ */ jsxs(Guest, { children: [
    /* @__PURE__ */ jsx(Head, { title: "ยืนยันรหัสผ่าน" }),
    /* @__PURE__ */ jsxs("div", { className: "mb-4 text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-900 dark:text-gray-100", children: "ยืนยันรหัสผ่าน" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 dark:text-gray-400 mt-1", children: "เพื่อความปลอดภัย โปรดยืนยันรหัสผ่านของคุณก่อนดำเนินการต่อ" })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
      /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", value: "รหัสผ่าน" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password",
            type: "password",
            name: "password",
            value: data.password,
            className: "mt-1 block w-full",
            autoComplete: "current-password",
            onChange: (e) => setData("password", e.target.value),
            required: true,
            autoFocus: true
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center justify-end mt-4", children: /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          className: "inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150",
          disabled: processing,
          children: "ยืนยัน"
        }
      ) })
    ] })
  ] });
}
export {
  ConfirmPassword as default
};
