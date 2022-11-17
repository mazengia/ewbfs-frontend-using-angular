import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../../services/product.service";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {NzDrawerRef} from "ng-zorro-antd/drawer";
import {finalize, first} from "rxjs/operators";
import {BusinessTypeService} from "../../../services/businessType.service";

@Component({
  selector: 'app-create-update-business',
  templateUrl: './create-update-business.component.html',
  styleUrls: ['./create-update-business.component.css']
})
export class CreateUpdateBusinessComponent implements OnInit {

  businessTypeForm: FormGroup;
  isAddMode = true;
  loading = false;
  submitted = false;
  employees:any;
  // @ts-ignore
  @Input() value: number;

  constructor(
    private fb: FormBuilder,
    private businessTypeService: BusinessTypeService,
    private notification: NzNotificationService,
    private drawerRef: NzDrawerRef<string>
  ) {
    this.businessTypeForm = this.fb.group({
      name: ['', [Validators.required]],
      description:  ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.isAddMode = !this.value;
    if (this.value) {
      this.loadProductById();
    }
  }

  loadProductById() {
    this.businessTypeService
      .findBusinessTypeById(this.value)
      .pipe(first())
      .subscribe((res) => {
        if (!this.isAddMode) {
          this.businessTypeForm.patchValue(res);
        }
      });
  }
  get id() {
    return this.businessTypeForm.controls.id;
  }

  get f() {
    return this.businessTypeForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.businessTypeForm.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.createProduct();
    } else {
      this.updateProduct();
    }
  }

  createProduct(): void {
    for (const key in this.businessTypeForm.controls) {
      if (this.businessTypeForm.controls.hasOwnProperty(key)) {
        this.businessTypeForm.controls[key].markAsDirty();
        this.businessTypeForm.controls[key].updateValueAndValidity();
      }
    }

    this.businessTypeService.addBusinessType(this.businessTypeForm.value)
      .pipe(finalize(() => {
        this.drawerRef.close()
      }))
      .subscribe(
        (data) => {
          this.createNotification(
            'success',
            'Business Type',
            'Business Type Successfully Created'
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

  updateProduct(): void {

    for (const key in this.businessTypeForm.controls) {
      if (this.businessTypeForm.controls.hasOwnProperty(key)) {
        this.businessTypeForm.controls[key].markAsDirty();
        this.businessTypeForm.controls[key].updateValueAndValidity();
      }
    }
    this.businessTypeService
      .updateBusinessType(this.value, this.businessTypeForm.value)
      .pipe(finalize(() => {
        this.drawerRef.close()
      }))
      .subscribe(
        data=> {
          this.createNotification(
            'success',
            'Enat-product',
            'Enat-product Successfully Updated'
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
