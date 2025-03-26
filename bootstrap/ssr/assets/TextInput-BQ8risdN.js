import { jsx, jsxs } from "react/jsx-runtime";
import { forwardRef } from "react";
function InputError({ message, className = "" }) {
  if (!message) {
    return null;
  }
  return /* @__PURE__ */ jsx("div", { className: `invalid-feedback ${className}`, children: message });
}
function InputLabel({ value, htmlFor, className = "", children, required = false }) {
  return /* @__PURE__ */ jsxs("label", { htmlFor, className: `form-label ${className}`, children: [
    value || children,
    required && /* @__PURE__ */ jsx("span", { className: "text-danger", children: "*" })
  ] });
}
const TextInput = forwardRef(
  ({ className = "", error, ...props }, ref) => /* @__PURE__ */ jsx(
    "input",
    {
      ...props,
      ref,
      className: `form-control ${error ? "is-invalid" : ""} ${className}`
    }
  )
);
TextInput.displayName = "TextInput";
export {
  InputLabel as I,
  TextInput as T,
  InputError as a
};
