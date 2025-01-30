import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: "element-ref",
    loadComponent: () => import("./page/ng-view-demo/element-ref/element-ref.component"),
  },
  // {
  //   path: "view-ref",
  //   loadComponent: () => import("./features/view-ref/view-ref.component"),
  // },
  // {
  //   path: "template-ref",
  //   loadComponent: () =>
  //     import("./features/template-ref/template-ref.component"),
  // },
  // {
  //   path: "view-container-ref",
  //   loadChildren: () =>
  //     import("./features/view-container-ref/routes").then((mod) => mod.routes),
  // },
  {
    path: "",
    loadComponent: () => import("./page/ng-view-demo/welcome/welcome.component"),
  }
];
