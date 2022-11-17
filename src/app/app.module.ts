import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import {OAuthModule} from "angular-oauth2-oidc";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {NzMessageService} from "ng-zorro-antd/message";
import {RequestInterceptorService} from "./services/request-interceptor.service";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzTagModule} from "ng-zorro-antd/tag";
import {
  CreateUpdateEnatProductComponent
} from "./pages/Enat-product/create-update-enat-product/create-update-enat-product.component";
import {EnatProductComponent} from "./pages/Enat-product/enat-product.component";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzPopconfirmModule} from "ng-zorro-antd/popconfirm";
import {NzToolTipModule} from "ng-zorro-antd/tooltip";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzInputModule} from "ng-zorro-antd/input";
import {WelcomeComponent} from "./pages/welcome/welcome.component";
import {NzDrawerService} from "ng-zorro-antd/drawer";
import {StatusComponent} from "./pages/status/status.component";
import {CreateUpdateStatusComponent} from "./pages/status/create-update-status/create-update-status.component";
import {CustomerRequestComponent} from "./pages/customer-request/customer-request.component";
import {
  CreateUpdateCustomerRequestComponent
} from "./pages/customer-request/create-update-customer-request/create-update-customer-request.component";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {RequestsComponent} from "./pages/customer-request/requests/requests.component";
import {BusinessTypeComponent} from "./pages/business-type/business-type.component";
import {
  CreateUpdateBusinessComponent
} from "./pages/business-type/create-update-business/create-update-business.component";
import {RequestDetailComponent} from "./pages/customer-request/request-detail/request-detail.component";
import {NzListModule} from "ng-zorro-antd/list";
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    CreateUpdateEnatProductComponent,
    EnatProductComponent,
    WelcomeComponent,
    StatusComponent,
    RequestsComponent,
    BusinessTypeComponent,
    CreateUpdateBusinessComponent,
    RequestDetailComponent,
    CreateUpdateStatusComponent,
    CustomerRequestComponent,
    CreateUpdateCustomerRequestComponent
  ],
    imports: [OAuthModule.forRoot(
        {
            resourceServer: {
                allowedUrls: ['http://api.enatbanksc.com/', 'http://localhost:4200/'],
                sendAccessToken: true
            }
        }
    ),
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        IconsProviderModule,
        NzLayoutModule,
        NzMenuModule, NzDropDownModule, NzTagModule, NzCardModule, NzTableModule, NzDividerModule, NzPopconfirmModule, NzToolTipModule, NzButtonModule, NzFormModule, ReactiveFormsModule, NzSelectModule, NzInputModule, NzDatePickerModule, NzCheckboxModule, NzListModule, NzBreadCrumbModule
    ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: RequestInterceptorService, multi: true},
    { provide: NZ_I18N, useValue: en_US },
    NzNotificationService,
    NzMessageService,
    NzDrawerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
