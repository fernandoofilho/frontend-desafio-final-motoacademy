import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneOrWatchComponent } from './phone-or-watch.component';

describe('PhoneOrWatchComponent', () => {
  let component: PhoneOrWatchComponent;
  let fixture: ComponentFixture<PhoneOrWatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhoneOrWatchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhoneOrWatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
