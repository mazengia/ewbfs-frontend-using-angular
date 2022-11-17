import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateEnatProductComponent } from './create-update-enat-product.component';

describe('CreateUpdateEnatProductComponent', () => {
  let component: CreateUpdateEnatProductComponent;
  let fixture: ComponentFixture<CreateUpdateEnatProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateEnatProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUpdateEnatProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
