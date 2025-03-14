import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntelligenceBottomSheetComponent } from './intelligence-bottom-sheet.component';

describe('IntelligenceBottomSheetComponent', () => {
  let component: IntelligenceBottomSheetComponent;
  let fixture: ComponentFixture<IntelligenceBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntelligenceBottomSheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntelligenceBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
