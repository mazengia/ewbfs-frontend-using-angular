import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateCustomerRequestComponent } from './create-update-customer-request.component';

describe('CreateUpdateCustomerRequestComponent', () => {
  let component: CreateUpdateCustomerRequestComponent;
  let fixture: ComponentFixture<CreateUpdateCustomerRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateCustomerRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUpdateCustomerRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
