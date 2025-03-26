import { jsx } from "react/jsx-runtime";
import ReactDOMServer from "react-dom/server";
import { createInertiaApp } from "@inertiajs/react";
import createServer from "@inertiajs/react/server";
async function resolvePageComponent(path, pages) {
  for (const p of Array.isArray(path) ? path : [path]) {
    const page = pages[p];
    if (typeof page === "undefined") {
      continue;
    }
    return typeof page === "function" ? page() : page;
  }
  throw new Error(`Page not found: ${path}`);
}
const appName = "IMS-Thai";
createServer(
  (page) => createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, /* @__PURE__ */ Object.assign({ "./Pages/Auth/ConfirmPassword.tsx": () => import("./assets/ConfirmPassword-CfECTsxt.js"), "./Pages/Auth/ForgotPassword.tsx": () => import("./assets/ForgotPassword-BA6CnM6V.js"), "./Pages/Auth/Login.tsx": () => import("./assets/Login-BLADxD6N.js"), "./Pages/Auth/Register.tsx": () => import("./assets/Register-DAinpff0.js"), "./Pages/Auth/ResetPassword.tsx": () => import("./assets/ResetPassword-BItoKr_9.js"), "./Pages/Auth/VerifyEmail.tsx": () => import("./assets/VerifyEmail-BILBFanq.js"), "./Pages/Categories/Create.tsx": () => import("./assets/Create-CTLYNAf_.js"), "./Pages/Categories/Edit.tsx": () => import("./assets/Edit-Dd-bWurL.js"), "./Pages/Categories/Index.tsx": () => import("./assets/Index-2Xrj1Koe.js"), "./Pages/Categories/Show.tsx": () => import("./assets/Show-BLoLoObS.js"), "./Pages/Customers/Create.tsx": () => import("./assets/Create-CS4NQxBC.js"), "./Pages/Customers/Edit.tsx": () => import("./assets/Edit-IZNF9g__.js"), "./Pages/Customers/Index.tsx": () => import("./assets/Index-DGD_E48W.js"), "./Pages/Customers/Show.tsx": () => import("./assets/Show-kn7VbGH-.js"), "./Pages/Dashboard.tsx": () => import("./assets/Dashboard-Dn0QDz4U.js"), "./Pages/Due/Edit.tsx": () => import("./assets/Edit-DK3fAtrq.js"), "./Pages/Due/Index.tsx": () => import("./assets/Index-BMW2J6qh.js"), "./Pages/Due/Show.tsx": () => import("./assets/Show-BjYAUVBe.js"), "./Pages/Invoices/Index.tsx": () => import("./assets/Index-BC7abTEX.js"), "./Pages/Orders/Create.tsx": () => import("./assets/Create-Dx2XdmmR.js"), "./Pages/Orders/Edit.tsx": () => import("./assets/Edit-CRnAI9ZN.js"), "./Pages/Orders/Index.tsx": () => import("./assets/Index-Bb_tTyUg.js"), "./Pages/Orders/Show.tsx": () => import("./assets/Show-CRR8vAps.js"), "./Pages/Products/Create.tsx": () => import("./assets/Create-DJldOv2u.js"), "./Pages/Products/Edit.tsx": () => import("./assets/Edit-BqJOgzNg.js"), "./Pages/Products/Import.tsx": () => import("./assets/Import-BDLOd9Kq.js"), "./Pages/Products/Index.tsx": () => import("./assets/Index-DNIyK4fn.js"), "./Pages/Products/Show.tsx": () => import("./assets/Show-DRQb4tlJ.js"), "./Pages/Profile/Edit.tsx": () => import("./assets/Edit-B_rjXAOg.js"), "./Pages/Profile/Settings.tsx": () => import("./assets/Settings-D3MPDUqD.js"), "./Pages/Purchases/Approved.tsx": () => import("./assets/Approved-Co9Z2rYl.js"), "./Pages/Purchases/Create.tsx": () => import("./assets/Create-cPTkmZmp.js"), "./Pages/Purchases/DailyReport.tsx": () => import("./assets/DailyReport-DhNSpyKS.js"), "./Pages/Purchases/Edit.tsx": () => import("./assets/Edit-DHu-Ou62.js"), "./Pages/Purchases/Index.tsx": () => import("./assets/Index-CE1D9vQa.js"), "./Pages/Purchases/Print.tsx": () => import("./assets/Print-CkKPLvr0.js"), "./Pages/Purchases/Report.tsx": () => import("./assets/Report-Cya48a68.js"), "./Pages/Purchases/Show.tsx": () => import("./assets/Show-DTKvzWl6.js"), "./Pages/Quotations/Create.tsx": () => import("./assets/Create-Cl3Eosmz.js"), "./Pages/Quotations/Edit.tsx": () => import("./assets/Edit-DFf_b2xM.js"), "./Pages/Quotations/Index.tsx": () => import("./assets/Index-w-iy8EFr.js"), "./Pages/Quotations/Sales.tsx": () => import("./assets/Sales-DFRp2bgs.js"), "./Pages/Quotations/Show.tsx": () => import("./assets/Show-Bu2jRLTn.js"), "./Pages/Suppliers/Create.tsx": () => import("./assets/Create-_vah3bnW.js"), "./Pages/Suppliers/Edit.tsx": () => import("./assets/Edit-gQXhQaFq.js"), "./Pages/Suppliers/Index.tsx": () => import("./assets/Index-yVZPqeHO.js"), "./Pages/Suppliers/Show.tsx": () => import("./assets/Show-C7LUbzMM.js"), "./Pages/Units/Create.tsx": () => import("./assets/Create-CdWT-nDn.js"), "./Pages/Units/Edit.tsx": () => import("./assets/Edit-DHkZ-PE8.js"), "./Pages/Units/Index.tsx": () => import("./assets/Index-DHNL5EGM.js"), "./Pages/Units/Show.tsx": () => import("./assets/Show-BYaUE3BQ.js"), "./Pages/Users/Create.tsx": () => import("./assets/Create-BYyNUSSW.js"), "./Pages/Users/Edit.tsx": () => import("./assets/Edit-CrLD3c56.js"), "./Pages/Users/Index.tsx": () => import("./assets/Index-BEAjziQP.js"), "./Pages/Users/Show.tsx": () => import("./assets/Show-B5P_AMeQ.js"), "./Pages/Welcome.tsx": () => import("./assets/Welcome-mOL5ZMdx.js") })),
    setup: ({ App, props }) => {
      globalThis.route = (name, params, absolute) => {
        return name;
      };
      return /* @__PURE__ */ jsx(App, { ...props });
    }
  })
);
