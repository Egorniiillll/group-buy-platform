import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrderPage } from './create-order-page';

describe('CreateOrderPage', () => {
  let component: CreateOrderPage;
  let fixture: ComponentFixture<CreateOrderPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateOrderPage],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateOrderPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
