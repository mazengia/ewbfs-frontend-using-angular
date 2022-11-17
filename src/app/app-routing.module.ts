import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WelcomeComponent} from "./pages/welcome/welcome.component";
import {EnatProductComponent} from "./pages/Enat-product/enat-product.component";
import {StatusComponent} from "./pages/status/status.component";
import {CustomerRequestComponent} from "./pages/customer-request/customer-request.component";
import {BusinessTypeComponent} from "./pages/business-type/business-type.component";
import {RequestDetailComponent} from "./pages/customer-request/request-detail/request-detail.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'welcome', component: WelcomeComponent},
  { path: 'product', component: EnatProductComponent},
  { path: 'status', component: StatusComponent},
  { path: 'request', component: CustomerRequestComponent},
  { path: 'business-type', component: BusinessTypeComponent},
  { path: "request/:id", component: RequestDetailComponent},
  // { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
