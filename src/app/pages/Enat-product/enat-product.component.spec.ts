import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnatProductComponent } from './enat-product.component';

describe('EnatProductComponent', () => {
  let component: EnatProductComponent;
  let fixture: ComponentFixture<EnatProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnatProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnatProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
