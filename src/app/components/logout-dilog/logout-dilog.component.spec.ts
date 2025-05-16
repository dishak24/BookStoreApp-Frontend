import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutDilogComponent } from './logout-dilog.component';

describe('LogoutDilogComponent', () => {
  let component: LogoutDilogComponent;
  let fixture: ComponentFixture<LogoutDilogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogoutDilogComponent]
    });
    fixture = TestBed.createComponent(LogoutDilogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
