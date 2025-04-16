import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparePhonesDialogComponent } from './compare-phones-dialog.component';

describe('ComparePhonesDialogComponent', () => {
  let component: ComparePhonesDialogComponent;
  let fixture: ComponentFixture<ComparePhonesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComparePhonesDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComparePhonesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
