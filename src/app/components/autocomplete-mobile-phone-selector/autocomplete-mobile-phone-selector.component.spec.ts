import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteMobilePhoneSelectorComponent } from './autocomplete-mobile-phone-selector.component';

describe('AutocompleteMobilePhoneSelectorComponent', () => {
  let component: AutocompleteMobilePhoneSelectorComponent;
  let fixture: ComponentFixture<AutocompleteMobilePhoneSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutocompleteMobilePhoneSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutocompleteMobilePhoneSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
