import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChngpassFormComponent } from './chngpass-form.component';

describe('ChngpassFormComponent', () => {
  let component: ChngpassFormComponent;
  let fixture: ComponentFixture<ChngpassFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChngpassFormComponent]
    });
    fixture = TestBed.createComponent(ChngpassFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
