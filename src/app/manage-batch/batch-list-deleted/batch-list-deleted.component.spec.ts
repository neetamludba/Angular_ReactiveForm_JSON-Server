import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchListDeletedComponent } from './batch-list-deleted.component';

describe('BatchListDeletedComponent', () => {
  let component: BatchListDeletedComponent;
  let fixture: ComponentFixture<BatchListDeletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchListDeletedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatchListDeletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
