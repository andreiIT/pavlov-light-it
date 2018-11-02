import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUserPostComponent } from './form-user-post.component';

describe('FormUserPostComponent', () => {
  let component: FormUserPostComponent;
  let fixture: ComponentFixture<FormUserPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormUserPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormUserPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
