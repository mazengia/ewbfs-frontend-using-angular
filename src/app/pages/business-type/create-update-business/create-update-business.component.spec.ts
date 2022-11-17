import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateBusinessComponent } from './create-update-business.component';

describe('CreateUpdateBusinessComponent', () => {
  let component: CreateUpdateBusinessComponent;
  let fixture: ComponentFixture<CreateUpdateBusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateBusinessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUpdateBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
