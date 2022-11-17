import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NzDrawerRef, NzDrawerService} from "ng-zorro-antd/drawer";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {RequestsComponent} from "../requests/requests.component";
import {RequestService} from "../../../services/request.service";
import {ActivatedRoute} from "@angular/router";

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
    customer: any;
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

    deleteRequests(id: number) {
        this.requestService.deleteRequest(id).subscribe(
            (data) => {
                this.createNotification(
                    'success',
                    'Request',
                    'Request Successfully Deleted'
                );
                this.loadRequestByCustomerId(this.customerId);
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

    addNewRequestDrawer(customerId: number, fullName: string): void {
        const drawerRef = this.drawerService.create<RequestsComponent,
            { customerId: number, fullName: string }>({
            nzTitle: `${customerId ? fullName + ' Create' : ' Update'} Request`,
            nzWidth: 450,
            nzContent: RequestsComponent,
            nzContentParams: {
                customerId: customerId,
                fullName: fullName,
            },
            nzClosable: true,
            nzKeyboard: true,
        });

        drawerRef.afterClose.subscribe(() => {
            this.loadRequestByCustomerId(customerId)
        })
    }
    UpdateRequestsById(requestId: number) {
        const drawerRef = this.drawerService.create<RequestsComponent,
            { requestId: number }>({
            nzTitle: `${requestId ? 'Update' : 'Create'} Customer`,
            nzWidth: 450,
            nzContent: RequestsComponent,
            nzContentParams: {
                requestId: requestId,
            },
            nzClosable: true,
            nzKeyboard: true,
        });

        drawerRef.afterClose.subscribe(() => {
            this.loadRequestByCustomerId(this.customerId);
        })
    }
    cancel(): void {
        // this.nzMessageService.info('click cancel');
    }

    loadRequestByCustomerId(id: any) {
        this.requestService.getRequestByCustomerId(this.pageNumber - 1, this.pageSize, id).subscribe(
            res => {
                console.log("request", res)
                this.request = res._embedded.requestsDTOes;
                this.totalElements = res.page.totalElements;

            })
    }

    loadCustomerById(id: any) {
        this.customerService.findCustomersById(id).subscribe(
            res => {
                this.customer = res;

            })
    }

    createNotification(type: string, title: string, message: string): void {
        this.notification.create(type, title, message);
    }
}



