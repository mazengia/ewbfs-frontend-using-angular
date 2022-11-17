import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {NzDrawerRef} from "ng-zorro-antd/drawer";
import {finalize, first} from "rxjs/operators";
import {Branch} from "../../../model/branch";
import {UserService} from "../../../services/user.service";
import {CustomerService} from "../../../services/customer.service";

@Component({
  selector: 'app-create-update-customer-request',
  templateUrl: './create-update-customer-request.component.html',
  styleUrls: ['./create-update-customer-request.component.css']
})
export class CreateUpdateCustomerRequestComponent implements OnInit {
  date: Date | undefined;
  customerForm: FormGroup;
  isAddMode = true;
  loading = false;
  submitted = false;
  userBranch?: Branch;
  valid_trade_license = true;
  // @ts-ignore
  @Input() value: number;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private notification: NzNotificationService,
    private userService: UserService,
    private drawerRef: NzDrawerRef<string>
  ) {
    this.customerForm = this.fb.group({
      full_name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      age: this.date,
      education: ['', [Validators.required]],
      nationality: ['', [Validators.required]],
      valid_trade_license: ['', [Validators.required]],
      branches: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.isAddMode = !this.value;
    if (this.value) {
      this.loadCustomersById();
    }
    this.getUserBranch();
  }

  onChange(birthDate: Date): void {
    this.date = birthDate;
  }

  getUserBranch() {
    this.userService
      .getUserBranch(this.userService.getEmployeeId())
      .subscribe((data) => {
        this.userBranch = data.branch;
      });
  }

  loadCustomersById() {
    this.customerService
      .findCustomersById(this.value)
      .pipe(first())
      .subscribe((res) => {
        if (!this.isAddMode) {
          this.customerForm.patchValue(res);
        }
      });
  }

  get id() {
    return this.customerForm.controls.id;
  }

  get f() {
    return this.customerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.customerForm.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.createCustomers();
    } else {
      this.updateCustomers();
    }
  }

  createCustomers(): void {
    for (const key in this.customerForm.controls) {
      if (this.customerForm.controls.hasOwnProperty(key)) {
        this.customerForm.controls[key].markAsDirty();
        this.customerForm.controls[key].updateValueAndValidity();
      }
    }
// console.log(this.customerForm.value);
    this.customerService.addCustomers(this.customerForm.value)
      .pipe(finalize(() => {
        this.drawerRef.close()
      }))
      .subscribe(
        (data) => {
          this.createNotification(
            'success',
            'Customer',
            'Customer Successfully Created'
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

    for (const key in this.customerForm.controls) {
      if (this.customerForm.controls.hasOwnProperty(key)) {
        this.customerForm.controls[key].markAsDirty();
        this.customerForm.controls[key].updateValueAndValidity();
      }
    }
    this.customerService
      .updateCustomers(this.value, this.customerForm.value)
      .pipe(finalize(() => {
        this.drawerRef.close()
      }))
      .subscribe(
        data => {
          this.createNotification(
            'success',
            'Customer',
            'Customer Successfully Updated'
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
