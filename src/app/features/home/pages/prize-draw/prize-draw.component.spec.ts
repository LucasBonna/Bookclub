import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrizeDrawComponent } from './prize-draw.component';

describe('PrizeDrawComponent', () => {
  let component: PrizeDrawComponent;
  let fixture: ComponentFixture<PrizeDrawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrizeDrawComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrizeDrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
