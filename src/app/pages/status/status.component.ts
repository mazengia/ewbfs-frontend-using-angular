import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NzDrawerRef, NzDrawerService} from "ng-zorro-antd/drawer";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {ProductService} from "../../services/product.service";
import {
  CreateUpdateEnatProductComponent
} from "../Enat-product/create-update-enat-product/create-update-enat-product.component";
import {StatusService} from "../../services/status.service";
import {CreateUpdateStatusComponent} from "./create-update-status/create-update-status.component";

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  @ViewChild(
    'drawerTemplate',
    {static: false})
  drawerTemplate?: TemplateRef<{
    $implicit: { value: string };
    drawerRef: NzDrawerRef<string>;
  }>;
  product: any;
  pageSize = 10;
  pageNumber = 1;
  totalElements = 0;

  constructor(
    private notification: NzNotificationService,
    private drawerService: NzDrawerService,
    private statusService: StatusService) {
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  deleteOperator(id: number) {
    this.statusService.deleteStatus(id).subscribe(
      (data) => {
        this.loadProducts();
        this.createNotification(
          'success',
          'Team',
          'Team Successfully Deleted'
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
    const drawerRef = this.drawerService.create<CreateUpdateStatusComponent,
      { id: number }>({
      nzTitle: `${id ? 'Update' : 'Create'} Enat-product-status`,
      nzWidth:450,
      nzContent: CreateUpdateStatusComponent,
      nzContentParams: {
        value: id,
      },
      nzClosable: true,
      nzKeyboard: true,
    });

    drawerRef.afterClose.subscribe(() => {
      this.loadProducts()
    })
  }

  cancel(): void {
    // this.nzMessageService.info('click cancel');
  }

  loadProducts(reset: boolean = false) {
    if (reset) {
      this.pageNumber = 1;
    }
    this.statusService.getStatus(this.pageNumber - 1, this.pageSize).subscribe(
      res => {
        this.product = res._embedded.statusDTOes;
        console.log(this.product)
        this.totalElements = res.page.totalElements;

      })
  }

  createNotification(type: string, title: string, message: string): void {
    this.notification.create(type, title, message);
  }
}



