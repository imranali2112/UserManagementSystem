import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadUserComponent } from './read-user.component';

describe('ReadUserComponent', () => {
  let component: ReadUserComponent;
  let fixture: ComponentFixture<ReadUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
