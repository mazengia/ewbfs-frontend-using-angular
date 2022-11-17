import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NzDrawerRef, NzDrawerService} from "ng-zorro-antd/drawer";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {CustomerService} from "../../services/customer.service";
import {
  CreateUpdateCustomerRequestComponent
} from "./create-update-customer-request/create-update-customer-request.component";
import {RequestsComponent} from "./requests/requests.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-customer-request',
  templateUrl: './customer-request.component.html',
  styleUrls: ['./customer-request.component.css']
})
export class CustomerRequestComponent implements OnInit {
  @ViewChild(
    'drawerTemplate',
    {static: false})
  drawerTemplate?: TemplateRef<{
    $implicit: { value: string };
    drawerRef: NzDrawerRef<string>;
  }>;
  customer: any;
  pageSize = 10;
  pageNumber = 1;
  totalElements = 0;

  constructor(
    private notification: NzNotificationService,
    private drawerService: NzDrawerService,
    private router: Router,
    private customerService: CustomerService) {
  }

  ngOnInit(): void {
    this.loadCustomers();
  }

  deleteCustomer(id: number) {
    this.customerService.deleteCustomers(id).subscribe(
      (data) => {
        this.loadCustomers();
        this.createNotification(
          'success',
          'Customer',
          'Customer Successfully Deleted'
        );
      },
      (error) => {
        this.createNotification(
          'error',
          'Error',
          error.error.apierror.debugMessage
        );
      }
    )
  }

  openDrawer(id: any): void {
    const drawerRef = this.drawerService.create<CreateUpdateCustomerRequestComponent,
      { id: number }>({
      nzTitle: `${id ? 'Update' : 'Create'} Customer`,
      nzWidth:450,
      nzContent: CreateUpdateCustomerRequestComponent,
      nzContentParams: {
        value: id,
      },
      nzClosable: true,
      nzKeyboard: true,
    });

    drawerRef.afterClose.subscribe(() => {
      this.loadCustomers()
    })
  }
  addNewRequestDrawer(customerId: number, fullName:string): void {
    const drawerRef = this.drawerService.create<RequestsComponent,
      { customerId: number,fullName:string }>({
      nzTitle: `${customerId ?  fullName+' Create' : 'Update'} Request`,
      nzWidth:450,
      nzContent: RequestsComponent,
      nzContentParams: {
        customerId: customerId,
        fullName:fullName,
      },
      nzClosable: true,
      nzKeyboard: true,
    });

    drawerRef.afterClose.subscribe(() => {
      this.loadCustomers()
    })
  }

  cancel(): void {
    // this.nzMessageService.info('click cancel');
  }

  loadCustomers(reset: boolean = false) {
    if (reset) {
      this.pageNumber = 1;
    }
    this.customerService.getCustomers(this.pageNumber - 1, this.pageSize).subscribe(
      res => {
        console.log(res)
        this.customer = res._embedded.customersDTOes;
        this.totalElements = res.page.totalElements;

      })
  }

  createNotification(type: string, title: string, message: string): void {
    this.notification.create(type, title, message);
  }
  requestDetail(id:number)  {
    this.router.navigate(["request/" +id ]);
  }
}



