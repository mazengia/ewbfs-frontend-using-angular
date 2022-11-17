import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Branch} from "../../../model/branch";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {UserService} from "../../../services/user.service";
import {NzDrawerRef} from "ng-zorro-antd/drawer";
import {finalize, first} from "rxjs/operators";
import {ProductService} from "../../../services/product.service";
import {BusinessTypeService} from "../../../services/businessType.service";
import {StatusService} from "../../../services/status.service";
import {RequestService} from "../../../services/request.service";

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  date: Date | undefined;
  // @ts-ignore
  requestForm: FormGroup;
  isAddMode = true;
  loading = false;
  submitted = false;
  product: any;
  businessType: any;
  status: any;
  customerId: any;
  userBranch?: Branch
  // @ts-ignore
  @Input() value: number;
  // @ts-ignore
  @Input() fullName: string;

  constructor(
    private fb: FormBuilder,
    private requestService: RequestService,
    private productService: ProductService,
    private statusService: StatusService,
    private businessTypeService: BusinessTypeService,
    private notification: NzNotificationService,
    private userService: UserService,
    private drawerRef: NzDrawerRef<string>
  ) {

  }

  ngOnInit(): void {
    this.isAddMode = !this.value;
    if (this.value) {
      this.requestForm = this.fb.group({
        customers: {id: this.value},
        products: this.fb.group({id: ['', [Validators.required]]}),
        businesses: this.fb.group({id: ['', [Validators.required]]}),
        status: this.fb.group({id: ['', [Validators.required]]}),
        requested_loan_amt: ['', Validators.required],
        no_of_year_in_business: ['', Validators.required],
        have_collateral: ['', Validators.required],
        fully_owned_by_business: ['', Validators.required],
        able_to_pay_5_present: ['', Validators.required]
      });
      // this.loadCustomersById();
      this.getUserBranch();
      this.loadProducts();
      this.loadBusinessType();
      this.loadStatus();
    }
  }

  onChange(birthDate: Date): void {
    this.date = birthDate;
  }

  loadProducts() {
    this.productService
      .getProduct()
      .pipe(first())
      .subscribe((res) => {
        this.product = res._embedded.productsDTOes;
      });
  }

  loadBusinessType() {
    this.businessTypeService
      .getBusinessType()
      .pipe(first())
      .subscribe((res) => {
        this.businessType = res._embedded.businessSectorDTOes;
      });
  }

  loadStatus() {
    this.statusService
      .getStatus()
      .pipe(first())
      .subscribe((res) => {
        this.status = res._embedded.statusDTOes;
      });
  }

  getUserBranch() {
    this.userService
      .getUserBranch(this.userService.getEmployeeId())
      .subscribe((data) => {
        this.userBranch = data.branch;
      });
  }

  get id() {
    return this.requestForm.controls.id;
  }

  get f() {
    return this.requestForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.requestForm.invalid) {
      return;
    }

    this.loading = true;
    this.createCustomers();

  }

  createCustomers(): void {
    for (const key in this.requestForm.controls) {
      if (this.requestForm.controls.hasOwnProperty(key)) {
        this.requestForm.controls[key].markAsDirty();
        this.requestForm.controls[key].updateValueAndValidity();
      }
    }
    console.log(this.requestForm.value);
    this.requestService.addRequest(this.requestForm.value)
      .pipe(finalize(() => {
        this.drawerRef.close()
      }))
      .subscribe(
        (data) => {
          this.createNotification(
            'success',
            'Request',
            'Request Successfully Created'
          );
        },
        (error) => {
          console.log('error = ', error)
          this.createNotification(
            'error',
            'Error',
            error.apierror.debugMessage);
        }
      );
  }

  updateCustomers(): void {

    for (const key in this.requestForm.controls) {
      if (this.requestForm.controls.hasOwnProperty(key)) {
        this.requestForm.controls[key].markAsDirty();
        this.requestForm.controls[key].updateValueAndValidity();
      }
    }
    this.requestService
      .updateRequest(this.value, this.requestForm.value)
      .pipe(finalize(() => {
        this.drawerRef.close()
      }))
      .subscribe(
        data => {
          this.createNotification(
            'success',
            'Request',
            'Request Successfully Updated'
          );
        },
        error => {
          this.createNotification(
            'error',
            'Error',
            error.apierror.debugMessage);
        }
      );
  }

  createNotification(type: string, title: string, message: string): void {
    this.notification.create(type, title, message);
  }
}
