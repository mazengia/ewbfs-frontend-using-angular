import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../../services/product.service";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {NzDrawerRef} from "ng-zorro-antd/drawer";
import {finalize, first} from "rxjs/operators";
import {StatusService} from "../../../services/status.service";

@Component({
  selector: 'app-create-update-status',
  templateUrl: './create-update-status.component.html',
  styleUrls: ['./create-update-status.component.css']
})
export class CreateUpdateStatusComponent implements OnInit {

  productForm: FormGroup;
  isAddMode = true;
  loading = false;
  submitted = false;
  employees:any;
  // @ts-ignore
  @Input() value: number;

  constructor(
    private fb: FormBuilder,
    private statusService: StatusService,
    private notification: NzNotificationService,
    private drawerRef: NzDrawerRef<string>
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.isAddMode = !this.value;
    if (this.value) {
      this.loadProductById();
    }
  }

  loadProductById() {
    this.statusService
      .findStatusById(this.value)
      .pipe(first())
      .subscribe((res) => {
        if (!this.isAddMode) {
          this.productForm.patchValue(res);
        }
      });
  }
  get id() {
    return this.productForm.controls.id;
  }

  get f() {
    return this.productForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.productForm.invalid) {
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
    for (const key in this.productForm.controls) {
      if (this.productForm.controls.hasOwnProperty(key)) {
        this.productForm.controls[key].markAsDirty();
        this.productForm.controls[key].updateValueAndValidity();
      }
    }

    this.statusService.addStatus(this.productForm.value)
      .pipe(finalize(() => {
        this.drawerRef.close()
      }))
      .subscribe(
        (data) => {
          this.createNotification(
            'success',
            'Enat-product',
            'Enat-product Successfully Created'
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

    for (const key in this.productForm.controls) {
      if (this.productForm.controls.hasOwnProperty(key)) {
        this.productForm.controls[key].markAsDirty();
        this.productForm.controls[key].updateValueAndValidity();
      }
    }
    this.statusService
      .updateStatus(this.value, this.productForm.value)
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
