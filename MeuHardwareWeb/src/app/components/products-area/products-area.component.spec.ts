import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsAreaComponent } from './products-area.component';

describe('ProductsAreaComponent', () => {
  let component: ProductsAreaComponent;
  let fixture: ComponentFixture<ProductsAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
