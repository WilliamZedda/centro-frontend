import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertsPreviewComponent } from './alerts-preview.component';

describe('AlertsPreviewComponent', () => {
  let component: AlertsPreviewComponent;
  let fixture: ComponentFixture<AlertsPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertsPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertsPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
