import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NzDrawerRef, NzDrawerService} from "ng-zorro-antd/drawer";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {ProductService} from "../../services/product.service";
import {
  CreateUpdateEnatProductComponent
} from "../Enat-product/create-update-enat-product/create-update-enat-product.component";
import {BusinessTypeService} from "../../services/businessType.service";
import {CreateUpdateBusinessComponent} from "./create-update-business/create-update-business.component";

@Component({
  selector: 'app-business-type',
  templateUrl: './business-type.component.html',
  styleUrls: ['./business-type.component.css']
})
export class BusinessTypeComponent implements OnInit {
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
    private businessTypeService: BusinessTypeService) {
  }

  ngOnInit(): void {
    this.loadBusinessType();
  }

  deleteBusinessType(id: number) {
    this.businessTypeService.deleteBusinessType(id).subscribe(
      (data) => {
        this.loadBusinessType();
        this.createNotification(
          'success',
          'Business Type',
          'Business Type Successfully Deleted'
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
    const drawerRef = this.drawerService.create<CreateUpdateBusinessComponent,
      { id: number }>({
      nzTitle: `${id ? 'Update' : 'Create'} Business Type`,
      nzWidth:450,
      nzContent: CreateUpdateBusinessComponent,
      nzContentParams: {
        value: id,
      },
      nzClosable: true,
      nzKeyboard: true,
    });

    drawerRef.afterClose.subscribe(() => {
      this.loadBusinessType()
    })
  }

  cancel(): void {
    // this.nzMessageService.info('click cancel');
  }

  loadBusinessType(reset: boolean = false) {
    if (reset) {
      this.pageNumber = 1;
    }
    this.businessTypeService.getBusinessType(this.pageNumber - 1, this.pageSize).subscribe(
      res => {
        console.log(res)
        this.product = res._embedded.businessSectorDTOes;
        console.log(this.product)
        this.totalElements = res.page.totalElements;

      })
  }

  createNotification(type: string, title: string, message: string): void {
    this.notification.create(type, title, message);
  }
}



