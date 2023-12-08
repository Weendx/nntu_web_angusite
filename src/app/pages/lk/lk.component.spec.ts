import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LkComponent } from './lk.component';

describe('LkComponent', () => {
  let component: LkComponent;
  let fixture: ComponentFixture<LkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LkComponent]
    });
    fixture = TestBed.createComponent(LkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
