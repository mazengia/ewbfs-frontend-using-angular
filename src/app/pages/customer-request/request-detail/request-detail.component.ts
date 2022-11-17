import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NzDrawerRef, NzDrawerService} from "ng-zorro-antd/drawer";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {
  CreateUpdateCustomerRequestComponent
} from "../create-update-customer-request/create-update-customer-request.component";
import {RequestsComponent} from "../requests/requests.component";
import {RequestService} from "../../../services/request.service";
import {ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {EMPTY, mergeMap, Observable, of, take} from "rxjs";
import {CustomerService} from "../../../services/customer.service";

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css']
})
export class RequestDetailComponent implements OnInit {
  @ViewChild(
    'drawerTemplate',
    {static: false})
  drawerTemplate?: TemplateRef<{
    $implicit: { value: string };
    drawerRef: NzDrawerRef<string>;
  }>;
  request: any;
  customer:any;
  pageSize = 10;
  pageNumber = 1;
  totalElements = 0;
  customerId: any;

  constructor(
    private notification: NzNotificationService,
    private drawerService: NzDrawerService,
    private activatedRoute: ActivatedRoute,
    private requestService: RequestService,
    private customerService: CustomerService) {
  }

  ngOnInit(): void {
    this.customerId = this.activatedRoute.snapshot.paramMap.get('id');
    // console.log(this.customerId)
    this.loadRequestByCustomerId(this.customerId);
    this.loadCustomerById(this.customerId);
  }

  deleteOperator(id: number) {
    this.requestService.deleteRequest(id).subscribe(
      (data) => {
        this.createNotification(
          'success',
          'Request',
          'Request Successfully Deleted'
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
      nzTitle: `${id ? 'Update' : 'Create'} Request`,
      nzWidth: 450,
      nzContent: CreateUpdateCustomerRequestComponent,
      nzContentParams: {
        value: id,
      },
      nzClosable: true,
      nzKeyboard: true,
    });

    drawerRef.afterClose.subscribe(() => {
    })
  }

  cancel(): void {
    // this.nzMessageService.info('click cancel');
  }

  loadRequestByCustomerId(id: any) {
    this.requestService.getRequestByCustomerId(this.pageNumber - 1, this.pageSize, id).subscribe(
      res => {
        console.log("request",res)
        this.request = res._embedded.requestsDTOes;
        this.totalElements = res.page.totalElements;

      })
  }
  loadCustomerById(id: any) {
    this.customerService.findCustomersById(id).subscribe(
      res => {
        this.customer = res ;

      })
  }
  createNotification(type: string, title: string, message: string): void {
    this.notification.create(type, title, message);
  }
}



